using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using QkTravelApi.DTOs.SpinPrize;

namespace QkTravelApi.Services.SpinPrize
{
    public interface ISpinPrizeService
    {
        Task<IEnumerable<SpinPrizeDto>> GetAllAdminAsync();
        Task<IEnumerable<SpinPrizeDto>> GetAllPublicAsync();
        Task<SpinPrizeDto> GetByIdAsync(Guid id);
        Task<bool> CreateAsync(CreateSpinPrizeDto createDto);
        Task<bool> UpdateAsync(Guid id, UpdateSpinPrizeDto updateDto);
        Task<bool> DeleteAsync(Guid id);

        // Config from Redis
        Task<SpinPrizeConfigDto> GetConfigAsync();
        Task<bool> SaveConfigAsync(SpinPrizeConfigDto configDto);
        Task<bool> ClearConfigAsync();
    }
}
