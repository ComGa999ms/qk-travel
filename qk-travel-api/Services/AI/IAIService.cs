using QkTravelApi.DTOs.AI;

namespace QkTravelApi.Services.AI
{
    public interface IAIService
    {
        string GetModel();

        /// <summary>
        /// Legacy single-call generation (kept for backward compatibility)
        /// </summary>
        Task<string> GenerateTravelPlanAsync(
            string locationName,
            string? currentLocationName,
            int numberOfPeople,
            int duration,
            string priceRange,
            string notes,
            List<string> hobbies,
            List<string> destinationNames
        );

        /// <summary>
        /// Multi-step generation: Full plan with outline + daily details
        /// </summary>
        Task<AIFullPlanResponse> GenerateFullPlanAsync(AIGenerationContext context);

        /// <summary>
        /// Step 1: Generate plan outline (accommodations, transportations, daily overview)
        /// </summary>
        Task<AIPlanOutlineResponse> GeneratePlanOutlineAsync(AIGenerationContext context);

        /// <summary>
        /// Step 2: Generate detailed itinerary for a specific day
        /// </summary>
        Task<AIDailyDetailResponse> GenerateDailyDetailAsync(
            AIGenerationContext context,
            int dayNumber,
            string dayTheme,
            List<string> highlights);

        /// <summary>
        /// Answer a free-form user question about an already generated plan.
        /// planContext is the plan rendered as text; history is prior turns (oldest first).
        /// </summary>
        Task<string> ChatAboutPlanAsync(
            string planContext,
            List<(string Role, string Content)> history,
            string question);
    }
}
