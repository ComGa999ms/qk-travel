using System.ComponentModel.DataAnnotations;

namespace QkTravelApi.DTOs.Destination
{
    public class UpdateFAQRequest
    {
        [Required]
        public string Question { get; set; } = string.Empty;

        [Required]
        public string Answer { get; set; } = string.Empty;
    }
}
