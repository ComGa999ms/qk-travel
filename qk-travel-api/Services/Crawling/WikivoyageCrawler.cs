using System.Text.Json;
using OpenQA.Selenium;
using QkTravelApi.Entities;

namespace QkTravelApi.Services.Crawling
{
    public class WikivoyageCrawler : SeleniumTravelCrawlerBase, ITravelCrawler
    {
        private const string BaseUrl = "https://en.wikivoyage.org";

        public string Source => "Wikivoyage";

        public async Task<TravelCrawlerResult> CrawlAsync(
            TravelCrawlerRequest request,
            Func<string, Task> logInfo,
            Func<string, Task> logWarning,
            CancellationToken cancellationToken = default)
        {
            var result = new TravelCrawlerResult();
            var titleSlug = Uri.EscapeDataString(request.LocationName.Trim().Replace(" ", "_"));
            var url = $"{BaseUrl}/wiki/{titleSlug}";

            await logInfo($"Opening Wikivoyage page: {url}");

            using var driver = CreateDriver();
            driver.Navigate().GoToUrl(url);
            WaitForBody(driver);
            await Task.Delay(1000, cancellationToken);

            var pageTitle = driver.FindElements(By.CssSelector("#firstHeading, h1")).FirstOrDefault()?.Text?.Trim();
            if (string.IsNullOrWhiteSpace(pageTitle))
            {
                await logWarning("Wikivoyage page did not load a valid title");
                return result;
            }

            // Wikivoyage renders POIs as `.vcard.listing` elements. Each carries a structured
            // name (.fn), address (.adr/.street-address), phone (.tel), price (.price) and a description.
            var listings = driver.FindElements(By.CssSelector("span.vcard.listing, .vcard.listing"));
            await logInfo($"Found {listings.Count} structured listings on Wikivoyage page");

            foreach (var listing in listings)
            {
                cancellationToken.ThrowIfCancellationRequested();

                try
                {
                    var draft = ParseListing(listing, request, url);
                    if (draft == null)
                        continue;

                    // All listings share the same page URL; the unique (SourceName, SourceUrl) index
                    // would collapse them into one. Anchor each listing by its title to keep them distinct.
                    draft.SourceUrl = $"{url}#{Uri.EscapeDataString(draft.Title)}";

                    result.Items.Add(draft);

                    if (result.Items.Count >= request.MaxItems)
                        break;
                }
                catch (Exception ex)
                {
                    await logWarning($"Skipped a listing: {ex.Message}");
                }
            }

            if (result.Items.Count == 0)
            {
                await logWarning("No structured listings parsed; falling back to page overview");
                var fallback = BuildOverviewItem(driver, request, url, pageTitle);
                if (fallback != null)
                    result.Items.Add(fallback);
                else
                    await logWarning("Wikivoyage page did not return enough content");
            }

            return result;
        }

        private CrawledTravelItemDraft? ParseListing(IWebElement listing, TravelCrawlerRequest request, string pageUrl)
        {
            var title = FirstChildText(listing, ".fn", ".listing-name", "b", "a");
            if (string.IsNullOrWhiteSpace(title))
                return null;

            var address = FirstChildText(listing, ".adr", ".street-address", ".listing-address");
            var phone = FirstChildText(listing, ".tel", ".listing-phone");
            var price = FirstChildText(listing, ".price", ".listing-price");
            var description = FirstChildText(listing, ".listing-content", ".description");

            // The listing's own text minus the name/address makes a reasonable description fallback.
            if (string.IsNullOrWhiteSpace(description))
                description = SafeText(listing);

            if (!string.IsNullOrWhiteSpace(description) && description.Length > 1000)
                description = description[..1000];

            var type = ResolveListingType(listing, request.ItemType);

            // If the admin asked for a specific type, drop listings from unrelated sections.
            if (request.ItemType != CrawledTravelItemType.Destination && type != request.ItemType)
                return null;

            var latitude = SafeAttribute(listing, "data-lat");
            var longitude = SafeAttribute(listing, "data-lon");

            var imageUrl = NormalizeWikiImage(
                listing.FindElements(By.CssSelector("img"))
                    .Select(img => img.GetAttribute("src")?.Trim())
                    .FirstOrDefault(src => !string.IsNullOrWhiteSpace(src)));

            return new CrawledTravelItemDraft
            {
                SourceName = "Wikivoyage",
                SourceUrl = pageUrl,
                Type = type,
                LocationName = request.LocationName,
                Title = title.Trim(),
                Description = string.IsNullOrWhiteSpace(description) ? null : description.Trim(),
                Address = string.IsNullOrWhiteSpace(address) ? null : address.Trim(),
                ImageUrl = imageUrl,
                PriceText = string.IsNullOrWhiteSpace(price) ? null : price.Trim(),
                RawJson = JsonSerializer.Serialize(new
                {
                    sourceLicense = "CC BY-SA",
                    phone,
                    latitude,
                    longitude,
                    scrapedAt = DateTime.UtcNow
                })
            };
        }

        private CrawledTravelItemDraft? BuildOverviewItem(
            IWebDriver driver, TravelCrawlerRequest request, string url, string pageTitle)
        {
            var paragraphs = driver.FindElements(By.CssSelector("#mw-content-text p"))
                .Select(p => p.Text?.Trim())
                .Where(t => !string.IsNullOrWhiteSpace(t) && t.Length > 60)
                .Take(3)
                .ToList();

            if (!paragraphs.Any())
                return null;

            var imageUrl = NormalizeWikiImage(
                driver.FindElements(By.CssSelector(".infobox img, .thumbimage, img"))
                    .Select(img => img.GetAttribute("src")?.Trim())
                    .FirstOrDefault(src => !string.IsNullOrWhiteSpace(src)));

            return new CrawledTravelItemDraft
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
            };
        }

        // Wikivoyage marks each listing with a class like "see", "do", "eat", "sleep", "buy", "drink".
        private static CrawledTravelItemType ResolveListingType(IWebElement listing, CrawledTravelItemType requested)
        {
            var classes = (listing.GetAttribute("class") ?? string.Empty).ToLowerInvariant();

            if (classes.Contains("eat") || classes.Contains("drink"))
                return CrawledTravelItemType.Restaurant;
            if (classes.Contains("sleep"))
                return CrawledTravelItemType.Hotel;
            if (classes.Contains("do"))
                return CrawledTravelItemType.Activity;
            if (classes.Contains("see"))
                return CrawledTravelItemType.Destination;
            if (classes.Contains("buy"))
                return CrawledTravelItemType.Activity;

            return requested;
        }

        private static string? NormalizeWikiImage(string? src)
        {
            if (string.IsNullOrWhiteSpace(src))
                return null;

            return src.StartsWith("//") ? "https:" + src : src;
        }

        private static string? FirstChildText(IWebElement parent, params string[] selectors)
        {
            foreach (var selector in selectors)
            {
                try
                {
                    var text = parent.FindElements(By.CssSelector(selector))
                        .Select(e => e.Text?.Trim())
                        .FirstOrDefault(t => !string.IsNullOrWhiteSpace(t));

                    if (!string.IsNullOrWhiteSpace(text))
                        return text;
                }
                catch
                {
                    // Selector not present in this listing; try the next.
                }
            }

            return null;
        }
    }
}
