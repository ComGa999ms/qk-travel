using AutoMapper;
using QkTravelApi.DTOs.SpinPrize;
using QkTravelApi.Entities;

namespace QkTravelApi.Mapping
{
    public class SpinPrizeMappingProfile : Profile
    {
        public SpinPrizeMappingProfile()
        {
            CreateMap<SpinPrize, SpinPrizeDto>();
            CreateMap<CreateSpinPrizeDto, SpinPrize>();
            CreateMap<UpdateSpinPrizeDto, SpinPrize>();
        }
    }
}
