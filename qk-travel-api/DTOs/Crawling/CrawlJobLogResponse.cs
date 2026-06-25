using QkTravelApi.Entities;

namespace QkTravelApi.DTOs.Crawling
{
    public class CrawlJobLogResponse
    {
        public int Id { get; set; }
        public int CrawlJobId { get; set; }
        public CrawlLogLevel Level { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
