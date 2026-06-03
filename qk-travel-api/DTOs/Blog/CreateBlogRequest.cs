using System.ComponentModel.DataAnnotations;

namespace QkTravelApi.DTOs.Blog
{
    public class CreateBlogRequest
    {
        [Required]
        [MinLength(5)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public string? ThumbnailUrl { get; set; }

        public List<string> Tags { get; set; } = new List<string>();
    }
}
