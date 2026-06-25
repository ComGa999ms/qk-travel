namespace QkTravelApi.Entities
{
    public class CrawlJob
    {
        public int Id { get; set; }
        public string Source { get; set; } = string.Empty;
        public string LocationName { get; set; } = string.Empty;
        public CrawledTravelItemType ItemType { get; set; }
        public CrawlJobStatus Status { get; set; } = CrawlJobStatus.Pending;
        public int MaxItems { get; set; }
        public int TotalItems { get; set; }
        public int SuccessItems { get; set; }
        public int FailedItems { get; set; }
        public string? ErrorMessage { get; set; }
        public string? CreatedByUserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? StartedAt { get; set; }
        public DateTime? FinishedAt { get; set; }

        public ApplicationUser? CreatedByUser { get; set; }
        public List<CrawledTravelItem> Items { get; set; } = new();
        public List<CrawlJobLog> Logs { get; set; } = new();
    }
}
