using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessTracker.Backend.Models
{
    [Table("Exercises")]
    [Index(nameof(WorkoutId))]
    public class Exercise
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int WorkoutId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 100)]
        public int Sets { get; set; }

        [Range(1, 1000)]
        public int Reps { get; set; }

        [Range(0, 10000)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Weight { get; set; }

        [Range(0, 100)]
        public int Order { get; set; }

        // Navigation property
        [ForeignKey(nameof(WorkoutId))]
        public virtual Workout Workout { get; set; } = null!;
    }
}