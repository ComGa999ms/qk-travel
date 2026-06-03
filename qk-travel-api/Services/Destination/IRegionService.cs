using QkTravelApi.DTOs.Destination;

namespace QkTravelApi.Services.Destination
{
    /// <summary>
    /// Service for Region operations
    /// </summary>
    public interface IRegionService
    {
        Task<IEnumerable<RegionDto>> GetAllRegionsAsync();
    }
}
