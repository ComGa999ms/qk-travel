using System.Security.Claims;

namespace QkTravelApi.Services.Auth
{
    public interface ICurrentUserService
    {
        string? UserId { get; }
        string? Email { get; }
        bool IsAuthenticated { get; }
        ClaimsPrincipal? User { get; }
    }
}
