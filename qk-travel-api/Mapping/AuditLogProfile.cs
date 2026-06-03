using AutoMapper;
using QkTravelApi.DTOs.Audit;
using QkTravelApi.Entities;

namespace QkTravelApi.Mapping
{
    public class AuditLogProfile : Profile
    {
        public AuditLogProfile()
        {
            CreateMap<AuditLog, AuditLogResponse>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User != null ? src.User.Email : "System/Anonymous"));
        }
    }
}
