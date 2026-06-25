using AutoMapper;
using QkTravelApi.DTOs.Crawling;
using QkTravelApi.Entities;

namespace QkTravelApi.Mapping
{
    public class CrawlingProfile : Profile
    {
        public CrawlingProfile()
        {
            CreateMap<CrawlJob, CrawlJobResponse>();
            CreateMap<CrawledTravelItem, CrawledTravelItemResponse>();
            CreateMap<CrawlJobLog, CrawlJobLogResponse>();
        }
    }
}
