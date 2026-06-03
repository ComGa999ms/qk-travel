using AutoMapper;
using QkTravelApi.DTOs.Giftcode;
using QkTravelApi.Entities;

namespace QkTravelApi.Mapping
{
    public class GiftcodeProfile : Profile
    {
        public GiftcodeProfile()
        {
            CreateMap<Giftcode, GiftcodeResponse>();
            CreateMap<CreateGiftcodeRequest, Giftcode>();
            CreateMap<UpdateGiftcodeRequest, Giftcode>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
