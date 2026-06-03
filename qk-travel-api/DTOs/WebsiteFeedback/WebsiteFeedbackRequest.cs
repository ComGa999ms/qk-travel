using System.ComponentModel.DataAnnotations;
using QkTravelApi.Entities;

namespace QkTravelApi.DTOs.WebsiteFeedback;

public class WebsiteFeedbackRequest
{
    [Range(1, 5)]
    public int Rating { get; set; }
    public AiPlannerUsefulness AiTripPlannerUsefulness { get; set; }
    public string Content { get; set; } = string.Empty;
    public bool WouldRecommend { get; set; }
}

