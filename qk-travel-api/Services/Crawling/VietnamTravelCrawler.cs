using System.Text.Json;
using OpenQA.Selenium;
using QkTravelApi.Entities;

namespace QkTravelApi.Services.Crawling
{
    public class VietnamTravelCrawler : SeleniumTravelCrawlerBase, ITravelCrawler
    {
        public string Source => "VietnamTravel";

        public async Task<TravelCrawlerResult> CrawlAsync(
            TravelCrawlerRequest request,
            Func<string, Task> logInfo,
            Func<string, Task> logWarning,
            CancellationToken cancellationToken = default)
        {
            var result = new TravelCrawlerResult();
            var keyword = Uri.EscapeDataString(request.LocationName);
            var searchUrl = $"https://www.vietnam.travel/search?keyword={keyword}";

            await logInfo($"Opening Vietnam Travel search page: {searchUrl}");

            using var driver = CreateDriver();
            driver.Navigate().GoToUrl(searchUrl);
            WaitForBody(driver);

            await Task.Delay(1500, cancellationToken);

            var anchors = driver.FindElements(By.CssSelector("a[href]"))
                .Select(anchor => new
                {
                    Element = anchor,
                    Href = SafeAttribute(anchor, "href") ?? string.Empty,
                    Text = SafeText(anchor) ?? string.Empty
                })
                .Where(x =>
                    !string.IsNullOrWhiteSpace(x.Href) &&
                    !string.IsNullOrWhiteSpace(x.Text) &&
                    x.Text.Length >= 6 &&
                    IsTravelLink(x.Href))
                .GroupBy(x => NormalizeTitle(x.Text))
                .Select(g => g.First())
                .Take(Math.Max(1, request.MaxItems))
                .ToList();

            await logInfo($"Found {anchors.Count} candidate links from Vietnam Travel");

            foreach (var candidate in anchors)
            {
                cancellationToken.ThrowIfCancellationRequested();

                try
                {
                    var itemUrl = MakeAbsoluteUrl("https://www.vietnam.travel", candidate.Href);
                    await logInfo($"Crawling detail: {candidate.Text}");

                    driver.Navigate().GoToUrl(itemUrl);
                    WaitForBody(driver);
                    await Task.Delay(800, cancellationToken);

                    var title = FirstText(driver, "h1", "h2") ?? candidate.Text;
                    var description = FirstText(driver, "meta[name='description']", ".description", ".summary", "p");
                    var imageUrl = FirstImage(driver, itemUrl);

                    result.Items.Add(new CrawledTravelItemDraft
                    {
                        SourceName = "Vietnam Travel",
                        SourceUrl = itemUrl,
                        Type = request.ItemType,
                        LocationName = request.LocationName,
                        Title = NormalizeTitle(title),
                        Description = description,
                        ImageUrl = imageUrl,
                        RawJson = JsonSerializer.Serialize(new
                        {
                            candidate.Text,
                            candidate.Href,
                            scrapedAt = DateTime.UtcNow
                        })
                    });
                }
                catch (Exception ex)
                {
                    await logWarning($"Skipped item '{candidate.Text}': {ex.Message}");
                }
            }

            return result;
        }

        private static bool IsTravelLink(string href)
        {
            return href.Contains("vietnam.travel", StringComparison.OrdinalIgnoreCase)
                && !href.Contains("/search", StringComparison.OrdinalIgnoreCase)
                && !href.Contains("#")
                && !href.Contains("mailto:", StringComparison.OrdinalIgnoreCase);
        }

        private static string NormalizeTitle(string text)
        {
            return string.Join(" ", text.Split(' ', StringSplitOptions.RemoveEmptyEntries)).Trim();
        }

        private static string? FirstText(IWebDriver driver, params string[] selectors)
        {
            foreach (var selector in selectors)
            {
                try
                {
                    if (selector.StartsWith("meta", StringComparison.OrdinalIgnoreCase))
                    {
                        var meta = driver.FindElements(By.CssSelector(selector)).FirstOrDefault();
                        var content = meta?.GetAttribute("content")?.Trim();
                        if (!string.IsNullOrWhiteSpace(content)) return content;
                        continue;
                    }

                    var text = driver.FindElements(By.CssSelector(selector))
                        .Select(e => e.Text?.Trim())
                        .FirstOrDefault(t => !string.IsNullOrWhiteSpace(t) && t.Length > 20);

                    if (!string.IsNullOrWhiteSpace(text)) return text;
                }
                catch
                {
                    // Try the next selector.
                }
            }

            return null;
        }

        private static string? FirstImage(IWebDriver driver, string pageUrl)
        {
            var ogImage = driver.FindElements(By.CssSelector("meta[property='og:image']")).FirstOrDefault();
            var ogContent = ogImage?.GetAttribute("content")?.Trim();
            if (!string.IsNullOrWhiteSpace(ogContent)) return MakeAbsoluteUrl(pageUrl, ogContent);

            var image = driver.FindElements(By.CssSelector("img[src]"))
                .Select(e => e.GetAttribute("src")?.Trim())
                .FirstOrDefault(src => !string.IsNullOrWhiteSpace(src) && !src.Contains("logo", StringComparison.OrdinalIgnoreCase));

            return string.IsNullOrWhiteSpace(image) ? null : MakeAbsoluteUrl(pageUrl, image);
        }
    }
}
