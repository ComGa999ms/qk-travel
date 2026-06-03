using QkTravelApi.Entities;

namespace QkTravelApi.Services.UserPlanSubscription
{
    public interface IUserPlanSubscriptionService
    {
        Task<SubscriptionPlan> GetCurrentPlanAsync(string userId);
        Task<string> GetCurrentPlanNameAsync(string userId);
        Task<bool> IsPlanLimitedAsync(string userId);

    }
}