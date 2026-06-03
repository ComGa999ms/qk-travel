using AutoMapper;
using QkTravelApi.DTOs.BlogComment;

namespace QkTravelApi.Mapping
{
    public class BlogCommentProfile : Profile
    {
        public BlogCommentProfile()
        {
            CreateMap<Entities.BlogComment, BlogCommentResponse>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User != null ? $"{src.User.FirstName} {src.User.LastName}" : "Unknown"))
                .ForMember(dest => dest.UserAvatar, opt => opt.MapFrom(src => src.User != null ? src.User.AvatarUrl : null));
        }
    }
}
