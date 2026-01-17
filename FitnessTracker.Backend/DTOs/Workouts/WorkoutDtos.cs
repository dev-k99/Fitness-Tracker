using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.Backend.DTOs.Workouts
{
    public class CreateWorkoutRequest
    {
        [Required(ErrorMessage = "Workout name is required")]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Date is required")]
        public DateTime Date { get; set; }

        [Range(0, 1440, ErrorMessage = "Duration must be between 0 and 1440 minutes")]
        public int DurationMinutes { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public List<CreateExerciseRequest> Exercises { get; set; } = new();
    }

    public class UpdateWorkoutRequest
    {
        [Required(ErrorMessage = "Workout name is required")]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Date is required")]
        public DateTime Date { get; set; }

        [Range(0, 1440, ErrorMessage = "Duration must be between 0 and 1440 minutes")]
        public int DurationMinutes { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public List<CreateExerciseRequest> Exercises { get; set; } = new();
    }

    public class CreateExerciseRequest
    {
        [Required(ErrorMessage = "Exercise name is required")]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 100, ErrorMessage = "Sets must be between 1 and 100")]
        public int Sets { get; set; }

        [Range(1, 1000, ErrorMessage = "Reps must be between 1 and 1000")]
        public int Reps { get; set; }

        [Range(0, 10000, ErrorMessage = "Weight must be between 0 and 10000")]
        public decimal Weight { get; set; }

        [Range(0, 100)]
        public int Order { get; set; }
    }

    public class WorkoutResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int DurationMinutes { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<ExerciseResponse> Exercises { get; set; } = new();
    }

    public class ExerciseResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Sets { get; set; }
        public int Reps { get; set; }
        public decimal Weight { get; set; }
        public int Order { get; set; }
    }

    public class WorkoutSummaryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int DurationMinutes { get; set; }
        public int ExerciseCount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}