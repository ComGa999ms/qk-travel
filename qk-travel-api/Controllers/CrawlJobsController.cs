using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using QkTravelApi.Common.Constants;
using QkTravelApi.Common.Extensions;
using QkTravelApi.DTOs.Crawling;
using QkTravelApi.Services.Crawling;

namespace QkTravelApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = AppRoles.Admin)]
    public class CrawlJobsController : ControllerBase
    {
        private readonly ICrawlJobService _crawlJobService;

        public CrawlJobsController(ICrawlJobService crawlJobService)
        {
            _crawlJobService = crawlJobService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateJob([FromBody] CreateCrawlJobRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return this.Unauthorized("User not authenticated");

            var job = await _crawlJobService.CreateJobAsync(request, userId);
            return this.Created(job, "Crawl job created successfully");
        }

        [HttpGet]
        public async Task<IActionResult> GetJobs([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var jobs = await _crawlJobService.GetJobsAsync(page, pageSize);
            return this.Success(jobs, "Crawl jobs retrieved successfully");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJob(int id)
        {
            var job = await _crawlJobService.GetJobByIdAsync(id);
            return job == null
                ? this.NotFound("Crawl job not found")
                : this.Success(job, "Crawl job retrieved successfully");
        }

        [HttpGet("{id}/logs")]
        public async Task<IActionResult> GetLogs(int id)
        {
            var logs = await _crawlJobService.GetJobLogsAsync(id);
            return this.Success(logs, "Crawl job logs retrieved successfully");
        }

        [HttpGet("items")]
        public async Task<IActionResult> GetItems(
            [FromQuery] int? jobId = null,
            [FromQuery] string? locationName = null,
            [FromQuery] string? type = null,
            [FromQuery] bool? isApproved = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var items = await _crawlJobService.GetItemsAsync(jobId, locationName, type, isApproved, page, pageSize);
            return this.Success(items, "Crawled travel items retrieved successfully");
        }

        [HttpPatch("items/{id}/approval")]
        public async Task<IActionResult> UpdateApproval(int id, [FromBody] UpdateCrawledTravelItemApprovalRequest request)
        {
            var item = await _crawlJobService.UpdateItemApprovalAsync(id, request.IsApproved);
            return item == null
                ? this.NotFound("Crawled travel item not found")
                : this.Success(item, "Item approval updated successfully");
        }

        [HttpDelete("items/{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            await _crawlJobService.DeleteItemAsync(id);
            return this.Success("Crawled travel item deleted successfully");
        }
    }
}
