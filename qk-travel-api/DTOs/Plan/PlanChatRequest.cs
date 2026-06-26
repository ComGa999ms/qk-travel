namespace QkTravelApi.DTOs.Plan
{
    public class PlanChatMessageDto
    {
        public string Role { get; set; } = "user";
        public string Content { get; set; } = string.Empty;
    }

    public class PlanChatRequest
    {
        public string Question { get; set; } = string.Empty;
        public List<PlanChatMessageDto> History { get; set; } = new();
    }

    public class PlanChatResponse
    {
        public string Answer { get; set; } = string.Empty;
    }
}
