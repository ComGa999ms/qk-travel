using QkTravelApi.Entities;

namespace QkTravelApi.DTOs.Crawling
{
    public class CreateCrawlJobRequest
    {
        public string Source { get; set; } = "VietnamTravel";
        public string LocationName { get; set; } = string.Empty;
        public CrawledTravelItemType ItemType { get; set; } = CrawledTravelItemType.Destination;
        public int MaxItems { get; set; } = 20;
    }
}
