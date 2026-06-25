using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QkTravelApi.Common.Exceptions;
using QkTravelApi.Data;
using QkTravelApi.DTOs.Common;
using QkTravelApi.DTOs.Crawling;
using QkTravelApi.Entities;

namespace QkTravelApi.Services.Crawling
{
    public class CrawlJobService : ICrawlJobService
    {
        private readonly ApplicationDbContext _context;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IEnumerable<ITravelCrawler> _crawlers;
        private readonly IMapper _mapper;
        private readonly ILogger<CrawlJobService> _logger;

        public CrawlJobService(
            ApplicationDbContext context,
            IServiceScopeFactory scopeFactory,
            IEnumerable<ITravelCrawler> crawlers,
            IMapper mapper,
            ILogger<CrawlJobService> logger)
        {
            _context = context;
            _scopeFactory = scopeFactory;
            _crawlers = crawlers;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<CrawlJobResponse> CreateJobAsync(CreateCrawlJobRequest request, string userId)
        {
            if (string.IsNullOrWhiteSpace(request.LocationName))
                throw new BadRequestException("Location name is required");

            if (request.MaxItems < 1) request.MaxItems = 10;
            if (request.MaxItems > 50) request.MaxItems = 50;

            var crawler = ResolveCrawler(request.Source);
            if (crawler == null)
                throw new BadRequestException($"Crawler source '{request.Source}' is not supported");

            var job = new CrawlJob
            {
                Source = crawler.Source,
                LocationName = request.LocationName.Trim(),
                ItemType = request.ItemType,
                MaxItems = request.MaxItems,
                Status = CrawlJobStatus.Pending,
                CreatedByUserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.CrawlJobs.Add(job);
            await _context.SaveChangesAsync();

            _ = Task.Run(() => ProcessJobAsync(job.Id));

            return _mapper.Map<CrawlJobResponse>(job);
        }

        public async Task<PagedResult<CrawlJobResponse>> GetJobsAsync(int page, int pageSize)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 50) pageSize = 50;

            var query = _context.CrawlJobs
                .OrderByDescending(j => j.CreatedAt)
                .AsQueryable();

            var total = await query.CountAsync();
            var jobs = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return PagedResult<CrawlJobResponse>.Create(_mapper.Map<List<CrawlJobResponse>>(jobs), total, page, pageSize);
        }

        public async Task<CrawlJobResponse?> GetJobByIdAsync(int id)
        {
            var job = await _context.CrawlJobs.FindAsync(id);
            return job == null ? null : _mapper.Map<CrawlJobResponse>(job);
        }

        public async Task<List<CrawlJobLogResponse>> GetJobLogsAsync(int jobId)
        {
            var logs = await _context.CrawlJobLogs
                .Where(l => l.CrawlJobId == jobId)
                .OrderBy(l => l.CreatedAt)
                .ToListAsync();

            return _mapper.Map<List<CrawlJobLogResponse>>(logs);
        }

        public async Task<PagedResult<CrawledTravelItemResponse>> GetItemsAsync(
            int? jobId,
            string? locationName,
            string? type,
            bool? isApproved,
            int page,
            int pageSize)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 100) pageSize = 100;

            var query = _context.CrawledTravelItems
                .OrderByDescending(i => i.FetchedAt)
                .AsQueryable();

            if (jobId.HasValue)
                query = query.Where(i => i.CrawlJobId == jobId.Value);

            if (!string.IsNullOrWhiteSpace(locationName))
                query = query.Where(i => EF.Functions.ILike(i.LocationName, $"%{locationName.Trim()}%"));

            if (!string.IsNullOrWhiteSpace(type) && Enum.TryParse<CrawledTravelItemType>(type, true, out var parsedType))
                query = query.Where(i => i.Type == parsedType);

            if (isApproved.HasValue)
                query = query.Where(i => i.IsApproved == isApproved.Value);

            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return PagedResult<CrawledTravelItemResponse>.Create(_mapper.Map<List<CrawledTravelItemResponse>>(items), total, page, pageSize);
        }

        public async Task<CrawledTravelItemResponse?> UpdateItemApprovalAsync(int itemId, bool isApproved)
        {
            var item = await _context.CrawledTravelItems.FindAsync(itemId);
            if (item == null) return null;

            item.IsApproved = isApproved;
            await _context.SaveChangesAsync();

            return _mapper.Map<CrawledTravelItemResponse>(item);
        }

        public async Task DeleteItemAsync(int itemId)
        {
            var item = await _context.CrawledTravelItems.FindAsync(itemId);
            if (item == null) return;

            _context.CrawledTravelItems.Remove(item);
            await _context.SaveChangesAsync();
        }

        private ITravelCrawler? ResolveCrawler(string source)
        {
            return _crawlers.FirstOrDefault(c => c.Source.Equals(source, StringComparison.OrdinalIgnoreCase));
        }

        private async Task ProcessJobAsync(int jobId)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var crawlers = scope.ServiceProvider.GetRequiredService<IEnumerable<ITravelCrawler>>();

                var job = await db.CrawlJobs.FirstOrDefaultAsync(j => j.Id == jobId);
                if (job == null) return;

                var crawler = crawlers.FirstOrDefault(c => c.Source.Equals(job.Source, StringComparison.OrdinalIgnoreCase));
                if (crawler == null)
                {
                    await MarkFailed(db, job, $"Crawler source '{job.Source}' is not registered");
                    return;
                }

                job.Status = CrawlJobStatus.Running;
                job.StartedAt = DateTime.UtcNow;
                await db.SaveChangesAsync();
                await AddLog(db, job.Id, CrawlLogLevel.Info, $"Job started for {job.Source} - {job.LocationName}");

                var request = new TravelCrawlerRequest
                {
                    Source = job.Source,
                    LocationName = job.LocationName,
                    ItemType = job.ItemType,
                    MaxItems = job.MaxItems
                };

                var result = await crawler.CrawlAsync(
                    request,
                    message => AddLog(db, job.Id, CrawlLogLevel.Info, message),
                    message => AddLog(db, job.Id, CrawlLogLevel.Warning, message));

                job.TotalItems = result.Items.Count;

                foreach (var draft in result.Items)
                {
                    var exists = await db.CrawledTravelItems
                        .AnyAsync(i => i.SourceName == draft.SourceName && i.SourceUrl == draft.SourceUrl);

                    if (exists)
                    {
                        job.FailedItems++;
                        await AddLog(db, job.Id, CrawlLogLevel.Warning, $"Skipped duplicate item: {draft.Title}");
                        continue;
                    }

                    db.CrawledTravelItems.Add(new CrawledTravelItem
                    {
                        CrawlJobId = job.Id,
                        SourceName = draft.SourceName,
                        SourceUrl = draft.SourceUrl,
                        Type = draft.Type,
                        LocationName = draft.LocationName,
                        Title = draft.Title,
                        Description = draft.Description,
                        Address = draft.Address,
                        ImageUrl = draft.ImageUrl,
                        Rating = draft.Rating,
                        PriceText = draft.PriceText,
                        RawJson = draft.RawJson,
                        IsApproved = true,
                        FetchedAt = DateTime.UtcNow
                    });

                    job.SuccessItems++;
                    await AddLog(db, job.Id, CrawlLogLevel.Info, $"Saved item: {draft.Title}");
                }

                job.Status = job.SuccessItems > 0 && job.FailedItems > 0
                    ? CrawlJobStatus.PartialSuccess
                    : job.SuccessItems > 0
                        ? CrawlJobStatus.Success
                        : CrawlJobStatus.Failed;

                if (job.SuccessItems == 0)
                    job.ErrorMessage = "Crawler finished but did not save any item";

                job.FinishedAt = DateTime.UtcNow;
                await db.SaveChangesAsync();
                await AddLog(db, job.Id, CrawlLogLevel.Info, $"Job completed: {job.SuccessItems}/{job.TotalItems} items saved");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Crawl job {JobId} failed", jobId);

                using var scope = _scopeFactory.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var job = await db.CrawlJobs.FirstOrDefaultAsync(j => j.Id == jobId);
                if (job != null)
                    await MarkFailed(db, job, ex.Message);
            }
        }

        private static async Task AddLog(ApplicationDbContext db, int jobId, CrawlLogLevel level, string message)
        {
            db.CrawlJobLogs.Add(new CrawlJobLog
            {
                CrawlJobId = jobId,
                Level = level,
                Message = message,
                CreatedAt = DateTime.UtcNow
            });

            await db.SaveChangesAsync();
        }

        private static async Task MarkFailed(ApplicationDbContext db, CrawlJob job, string message)
        {
            job.Status = CrawlJobStatus.Failed;
            job.ErrorMessage = message.Length > 1000 ? message[..1000] : message;
            job.FinishedAt = DateTime.UtcNow;
            await AddLog(db, job.Id, CrawlLogLevel.Error, job.ErrorMessage);
            await db.SaveChangesAsync();
        }
    }
}
