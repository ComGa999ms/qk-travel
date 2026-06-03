using Microsoft.AspNetCore.Mvc;
using QkTravelApi.Common.Extensions;
using QkTravelApi.DTOs.Destination;
using QkTravelApi.Services.Destination;

namespace QkTravelApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TravelHobbiesController : ControllerBase
{
    private readonly ITravelHobbyService _travelHobbyService;
    private readonly ILogger<TravelHobbiesController> _logger;

    public TravelHobbiesController(ITravelHobbyService travelHobbyService, ILogger<TravelHobbiesController> logger)
    {
        _travelHobbyService = travelHobbyService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var travelHobbies = await _travelHobbyService.GetAllAsync();
        return this.Success(travelHobbies, "Travel hobbies retrieved successfully");
    }

    [HttpPost]
    public async Task<IActionResult> Update(TravelHobbyDto travelHobbyDto)
    {
        var isUpdated = await _travelHobbyService.UpdateAsync(travelHobbyDto);
        if (!isUpdated)
        {
            return this.Failed("Travel hobby updated failed");
        }

        return this.Success("Travel hobby updated successfully");
    }
}

