using AutoMapper;
using QkTravelApi.DTOs.WebsiteFeedback;
using QkTravelApi.Entities;

namespace QkTravelApi.Mapping;

public class WebsiteFeedbackProfile : Profile
{
    public WebsiteFeedbackProfile()
    {
        CreateMap<WebsiteFeedbackRequest, WebsiteFeedback>();
        CreateMap<WebsiteFeedback, WebsiteFeedbackResponse>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email ?? string.Empty));
    }
}