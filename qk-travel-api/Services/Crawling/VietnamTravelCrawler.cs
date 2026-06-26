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
            var keyword = Uri.EscapeDataString(BuildSearchKeyword(request));
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
                    IsTravelLink(x.Href, x.Text, request.ItemType))
                .GroupBy(x => NormalizeTitle(x.Text))
                .Select(g => g.First())
                .Take(Math.Max(1, request.MaxItems * 2))
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
                    var normalizedTitle = NormalizeTitle(title);

                    if (!IsDetailRelevant(request.ItemType, normalizedTitle, description, itemUrl))
                    {
                        await logWarning($"Skipped item '{candidate.Text}': content is not relevant to {request.ItemType}");
                        continue;
                    }

                    result.Items.Add(new CrawledTravelItemDraft
                    {
                        SourceName = "Vietnam Travel",
                        SourceUrl = itemUrl,
                        Type = request.ItemType,
                        LocationName = request.LocationName,
                        Title = normalizedTitle,
                        Description = description,
                        ImageUrl = imageUrl,
                        RawJson = JsonSerializer.Serialize(new
                        {
                            candidate.Text,
                            candidate.Href,
                            scrapedAt = DateTime.UtcNow
                        })
                    });

                    if (result.Items.Count >= request.MaxItems)
                        break;
                }
                catch (Exception ex)
                {
                    await logWarning($"Skipped item '{candidate.Text}': {ex.Message}");
                }
            }

            return result;
        }

        private static string BuildSearchKeyword(TravelCrawlerRequest request)
        {
            var typeKeyword = request.ItemType switch
            {
                CrawledTravelItemType.Restaurant => "food cuisine dishes restaurants eating",
                CrawledTravelItemType.Hotel => "hotel resort accommodation stay",
                CrawledTravelItemType.Activity => "things to do experiences activities",
                CrawledTravelItemType.Tour => "tour itinerary cruise trip",
                _ => "attractions places travel guide"
            };

            return $"{request.LocationName} {typeKeyword}";
        }

        private static bool IsTravelLink(string href, string text, CrawledTravelItemType itemType)
        {
            if (!Uri.TryCreate(href, UriKind.Absolute, out var uri))
                uri = new Uri(new Uri("https://www.vietnam.travel"), href);

            if (!uri.Host.Contains("vietnam.travel", StringComparison.OrdinalIgnoreCase))
                return false;

            var path = uri.AbsolutePath.Trim('/').ToLowerInvariant();
            var normalizedText = NormalizeTitle(text).ToLowerInvariant();

            if (string.IsNullOrWhiteSpace(path))
                return false;

            if (path.Contains("search", StringComparison.OrdinalIgnoreCase)
                || path.Contains("mailto:", StringComparison.OrdinalIgnoreCase)
                || uri.Fragment.Length > 0)
            {
                return false;
            }

            if (IsGenericNavigationPath(path) || IsGenericNavigationTitle(normalizedText))
                return false;

            // Cua 1 chi loc link dieu huong generic. Khong ep keyword o day vi
            // link ket qua that (vd /vi/diem-den/ha-noi) thuong khong chua tu khoa loai.
            // De cua 2 (IsDetailRelevant, da vao trang chi tiet) lam bo loc chinh.
            return true;
        }

        private static bool IsDetailRelevant(CrawledTravelItemType itemType, string title, string? description, string url)
        {
            var haystack = $"{title} {description} {url}".ToLowerInvariant();
            return HasTypeSignal(itemType, haystack, strict: false);
        }

        private static bool IsGenericNavigationPath(string path)
        {
            var genericPaths = new HashSet<string>
            {
                "plan-your-trip",
                "things-to-do",
                "places-to-go",
                "travel-offers",
                "media-industry",
                "about-vietnam",
                "user",
                "search"
            };

            return genericPaths.Contains(path);
        }

        private static bool IsGenericNavigationTitle(string title)
        {
            var genericTitles = new HashSet<string>
            {
                "live fully in vietnam",
                "places to go",
                "things to do",
                "plan your trip",
                "travel offers",
                "festivals and special events",
                "what are the vietnamese like?"
            };

            return genericTitles.Contains(title);
        }

        private static bool HasTypeSignal(CrawledTravelItemType itemType, string haystack, bool strict)
        {
            var keywords = itemType switch
            {
                CrawledTravelItemType.Restaurant => new[]
                {
                    "food", "cuisine", "dish", "dishes", "eat", "eating", "restaurant",
                    "dining", "culinary", "street-food", "street food", "coffee", "cafe",
                    "pho", "banh", "bun", "local dishes", "what to eat", "where to eat"
                },
                CrawledTravelItemType.Hotel => new[]
                {
                    "hotel", "resort", "homestay", "accommodation", "stay", "room", "cruise"
                },
                CrawledTravelItemType.Activity => new[]
                {
                    "things-to-do", "experience", "experiences", "activity", "activities",
                    "festival", "museum", "beach", "market", "temple", "pagoda"
                },
                CrawledTravelItemType.Tour => new[]
                {
                    "tour", "itinerary", "cruise", "trip", "journey", "excursion"
                },
                _ => Array.Empty<string>()
            };

            if (keywords.Length == 0)
                return true;

            if (keywords.Any(keyword => haystack.Contains(keyword, StringComparison.OrdinalIgnoreCase)))
                return true;

            return !strict && itemType == CrawledTravelItemType.Destination;
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
