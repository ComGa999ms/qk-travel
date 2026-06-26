using System.Text.Json;
using OpenQA.Selenium;
using QkTravelApi.Entities;

namespace QkTravelApi.Services.Crawling
{
    public class VnExpressTravelCrawler : SeleniumTravelCrawlerBase, ITravelCrawler
    {
        public string Source => "VnExpress";

        private const string BaseUrl = "https://vnexpress.net";

        public async Task<TravelCrawlerResult> CrawlAsync(
            TravelCrawlerRequest request,
            Func<string, Task> logInfo,
            Func<string, Task> logWarning,
            CancellationToken cancellationToken = default)
        {
            var result = new TravelCrawlerResult();
            var keyword = Uri.EscapeDataString(request.LocationName);
            var searchUrl = $"https://timkiem.vnexpress.net/?q={keyword}&media_type=text";

            await logInfo($"Opening VnExpress search page: {searchUrl}");

            using var driver = CreateDriver();
            driver.Navigate().GoToUrl(searchUrl);
            WaitForBody(driver);
            await Task.Delay(1200, cancellationToken);

            var articles = driver.FindElements(By.CssSelector("article.item-news, article.item-news-common"))
                .Select(article => new
                {
                    Title = ExtractTitle(article, out var href),
                    Href = href,
                    Description = ExtractDescription(article),
                    ImageUrl = ExtractImage(article)
                })
                .Where(x =>
                    !string.IsNullOrWhiteSpace(x.Title) &&
                    !string.IsNullOrWhiteSpace(x.Href) &&
                    IsRelevant(x.Title, x.Description, request.LocationName))
                .GroupBy(x => x.Href)
                .Select(g => g.First())
                .Take(request.MaxItems)
                .ToList();

            await logInfo($"Found {articles.Count} candidate articles from VnExpress");

            foreach (var article in articles)
            {
                cancellationToken.ThrowIfCancellationRequested();

                result.Items.Add(new CrawledTravelItemDraft
                {
                    SourceName = "VnExpress",
                    SourceUrl = MakeAbsoluteUrl(BaseUrl, article.Href!),
                    Type = request.ItemType,
                    LocationName = request.LocationName,
                    Title = article.Title!,
                    Description = article.Description,
                    ImageUrl = article.ImageUrl,
                    RawJson = JsonSerializer.Serialize(new
                    {
                        source = "VnExpress",
                        article.Href,
                        scrapedAt = DateTime.UtcNow
                    })
                });
            }

            if (result.Items.Count == 0)
                await logWarning("VnExpress search did not return relevant articles");

            return result;
        }

        private static string? ExtractTitle(IWebElement article, out string? href)
        {
            href = null;
            var titleLink = article.FindElements(By.CssSelector("h3.title-news a, h2.title-news a, .title-news a"))
                .FirstOrDefault();

            if (titleLink == null)
                return null;

            href = SafeAttribute(titleLink, "href");
            var title = SafeText(titleLink) ?? SafeAttribute(titleLink, "title");
            return title;
        }

        private static string? ExtractDescription(IWebElement article)
        {
            var desc = article.FindElements(By.CssSelector(".description, p.description, .description a"))
                .Select(e => e.Text?.Trim())
                .FirstOrDefault(t => !string.IsNullOrWhiteSpace(t));

            return string.IsNullOrWhiteSpace(desc) ? null : desc;
        }

        private static string? ExtractImage(IWebElement article)
        {
            var img = article.FindElements(By.CssSelector("img")).FirstOrDefault();
            if (img == null) return null;

            // VnExpress lazy-loads images via data-src/data-original.
            var src = SafeAttribute(img, "data-src")
                ?? SafeAttribute(img, "data-original")
                ?? SafeAttribute(img, "src");

            if (string.IsNullOrWhiteSpace(src) || src.StartsWith("data:"))
                return null;

            return src;
        }

        private static bool IsRelevant(string title, string? description, string locationName)
        {
            if (string.IsNullOrWhiteSpace(locationName))
                return true;

            var haystack = $"{title} {description}".ToLowerInvariant();
            var location = locationName.ToLowerInvariant();

            return haystack.Contains(location, StringComparison.OrdinalIgnoreCase);
        }
    }
}
