using QkTravelApi.Entities;

namespace QkTravelApi.Services.Crawling
{
    public class TravelCrawlerRequest
    {
        public string Source { get; set; } = string.Empty;
        public int? LocationId { get; set; }
        public string LocationName { get; set; } = string.Empty;
        public CrawledTravelItemType ItemType { get; set; }
        public int MaxItems { get; set; }
    }
}
