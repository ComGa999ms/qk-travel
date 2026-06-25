using QkTravelApi.Entities;

namespace QkTravelApi.Services.Crawling
{
    public class CrawledTravelItemDraft
    {
        public string SourceName { get; set; } = string.Empty;
        public string SourceUrl { get; set; } = string.Empty;
        public CrawledTravelItemType Type { get; set; }
        public string LocationName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Address { get; set; }
        public string? ImageUrl { get; set; }
        public decimal? Rating { get; set; }
        public string? PriceText { get; set; }
        public string? RawJson { get; set; }
    }
}
