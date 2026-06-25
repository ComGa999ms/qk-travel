using System.Text.Json;
using OpenQA.Selenium;
using QkTravelApi.Entities;

namespace QkTravelApi.Services.Crawling
{
    public class WikivoyageCrawler : SeleniumTravelCrawlerBase, ITravelCrawler
    {
        public string Source => "Wikivoyage";

        public async Task<TravelCrawlerResult> CrawlAsync(
            TravelCrawlerRequest request,
            Func<string, Task> logInfo,
            Func<string, Task> logWarning,
            CancellationToken cancellationToken = default)
        {
            var result = new TravelCrawlerResult();
            var title = Uri.EscapeDataString(request.LocationName.Replace(" ", "_"));
            var url = $"https://en.wikivoyage.org/wiki/{title}";

            await logInfo($"Opening Wikivoyage page: {url}");

            using var driver = CreateDriver();
            driver.Navigate().GoToUrl(url);
            WaitForBody(driver);
            await Task.Delay(1000, cancellationToken);

            var pageTitle = driver.FindElements(By.CssSelector("#firstHeading, h1")).FirstOrDefault()?.Text?.Trim();
            var paragraphs = driver.FindElements(By.CssSelector("#mw-content-text p"))
                .Select(p => p.Text?.Trim())
                .Where(t => !string.IsNullOrWhiteSpace(t) && t.Length > 60)
                .Take(3)
                .ToList();

            if (string.IsNullOrWhiteSpace(pageTitle) || !paragraphs.Any())
            {
                await logWarning("Wikivoyage page did not return enough content");
                return result;
            }

            var imageUrl = driver.FindElements(By.CssSelector(".infobox img, .thumbimage, img"))
                .Select(img => img.GetAttribute("src")?.Trim())
                .FirstOrDefault(src => !string.IsNullOrWhiteSpace(src));

            if (!string.IsNullOrWhiteSpace(imageUrl) && imageUrl.StartsWith("//"))
                imageUrl = "https:" + imageUrl;

            result.Items.Add(new CrawledTravelItemDraft
            {
                SourceName = "Wikivoyage",
                SourceUrl = url,
                Type = request.ItemType,
                LocationName = request.LocationName,
                Title = pageTitle,
                Description = string.Join("\n\n", paragraphs),
                ImageUrl = imageUrl,
                RawJson = JsonSerializer.Serialize(new
                {
                    sourceLicense = "CC BY-SA",
                    scrapedAt = DateTime.UtcNow
                })
            });

            return result;
        }
    }
}
