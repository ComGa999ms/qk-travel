using System;

namespace QkTravelApi.DTOs.SpinPrize
{
    public class SpinPrizeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
