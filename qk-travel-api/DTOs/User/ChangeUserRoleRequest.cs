using System.ComponentModel.DataAnnotations;

namespace QkTravelApi.DTOs.User
{
    /// <summary>
    /// Request to change user role
    /// </summary>
    public class ChangeUserRoleRequest
    {
        [Required]
        public string Role { get; set; } = string.Empty;
    }
}
