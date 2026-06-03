using QkTravelApi.DTOs.Destination;

namespace QkTravelApi.Services.Destination;

public interface IPriceSettingService
{
    Task<List<PriceSettingDto>> GetPriceSettingsAsync();
    Task<bool> UpdatePriceSettingsAsync(PriceSettingDto priceSettingsDto);
}