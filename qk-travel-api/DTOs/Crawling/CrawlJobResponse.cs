using QkTravelApi.Entities;

namespace QkTravelApi.DTOs.Crawling
{
    public class CrawlJobResponse
    {
        public int Id { get; set; }
        public string Source { get; set; } = string.Empty;
        public int? LocationId { get; set; }
        public string LocationName { get; set; } = string.Empty;
        public CrawledTravelItemType ItemType { get; set; }
        public CrawlJobStatus Status { get; set; }
        public int MaxItems { get; set; }
        public int TotalItems { get; set; }
        public int SuccessItems { get; set; }
        public int FailedItems { get; set; }
        public string? ErrorMessage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? FinishedAt { get; set; }
    }
}
