namespace QkTravelApi.Services.Crawling
{
    public interface ITravelCrawler
    {
        string Source { get; }
        Task<TravelCrawlerResult> CrawlAsync(
            TravelCrawlerRequest request,
            Func<string, Task> logInfo,
            Func<string, Task> logWarning,
            CancellationToken cancellationToken = default);
    }
}
