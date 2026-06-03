using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace QkTravelApi.DTOs.Profile
{
    public class UpdateProfileRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        [Phone]
        public string? PhoneNumber { get; set; }
        public QkTravelApi.Entities.Gender? Gender { get; set; }
        public DateTime? Dob { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
