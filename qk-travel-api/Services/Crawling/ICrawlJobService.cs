using QkTravelApi.DTOs.Common;
using QkTravelApi.DTOs.Crawling;

namespace QkTravelApi.Services.Crawling
{
    public interface ICrawlJobService
    {
        Task<CrawlJobResponse> CreateJobAsync(CreateCrawlJobRequest request, string userId);
        Task<PagedResult<CrawlJobResponse>> GetJobsAsync(int page, int pageSize);
        Task<CrawlJobResponse?> GetJobByIdAsync(int id);
        Task<List<CrawlJobLogResponse>> GetJobLogsAsync(int jobId);
        Task<PagedResult<CrawledTravelItemResponse>> GetItemsAsync(int? jobId, string? locationName, string? type, bool? isApproved, int page, int pageSize);
        Task<CrawledTravelItemResponse?> UpdateItemApprovalAsync(int itemId, bool isApproved);
        Task DeleteItemAsync(int itemId);
    }
}
