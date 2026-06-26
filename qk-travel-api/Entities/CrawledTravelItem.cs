namespace QkTravelApi.Entities
{
    public class CrawledTravelItem
    {
        public int Id { get; set; }
        public int CrawlJobId { get; set; }
        public int? LocationId { get; set; }
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
        public bool IsApproved { get; set; } = false;
        public DateTime FetchedAt { get; set; } = DateTime.UtcNow;

        public CrawlJob CrawlJob { get; set; } = null!;
        public Location? Location { get; set; }
    }
}
