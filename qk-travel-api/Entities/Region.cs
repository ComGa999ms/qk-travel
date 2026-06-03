using System.ComponentModel.DataAnnotations;

namespace QkTravelApi.Entities
{
    public class Region
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public virtual ICollection<Location> Locations { get; set; } = new List<Location>();
    }
}