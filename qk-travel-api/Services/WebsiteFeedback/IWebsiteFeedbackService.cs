using QkTravelApi.DTOs.WebsiteFeedback;

namespace QkTravelApi.Services.WebsiteFeedback;

public interface IWebsiteFeedbackService
{
    Task<bool> CreateFeedbackAsync(WebsiteFeedbackRequest request, string userId);
    Task<List<WebsiteFeedbackResponse>> GetAllFeedbacksAsync();
}
