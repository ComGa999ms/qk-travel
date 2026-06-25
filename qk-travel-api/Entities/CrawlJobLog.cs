namespace QkTravelApi.Entities
{
    public class CrawlJobLog
    {
        public int Id { get; set; }
        public int CrawlJobId { get; set; }
        public CrawlLogLevel Level { get; set; } = CrawlLogLevel.Info;
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public CrawlJob CrawlJob { get; set; } = null!;
    }
}
