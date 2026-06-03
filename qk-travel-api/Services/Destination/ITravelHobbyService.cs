using QkTravelApi.DTOs.Destination;

namespace QkTravelApi.Services.Destination;

public interface ITravelHobbyService
{
    Task<List<TravelHobbyDto>> GetAllAsync();
    Task<bool> UpdateAsync(TravelHobbyDto travelHobbyDto);
}