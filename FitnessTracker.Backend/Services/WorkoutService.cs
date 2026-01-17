using FitnessTracker.Backend.DTOs.Workouts;
using FitnessTracker.Backend.Models;
using FitnessTracker.Backend.Repositories.Interfaces;
using FitnessTracker.Backend.Services.Interfaces;

namespace FitnessTracker.Backend.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;

        public WorkoutService(IWorkoutRepository workoutRepository)
        {
            _workoutRepository = workoutRepository;
        }

        public async Task<WorkoutResponse> GetByIdAsync(int workoutId, int userId)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            if (workout == null)
            {
                throw new KeyNotFoundException($"Workout with ID {workoutId} not found");
            }

            if (workout.UserId != userId)
            {
                throw new UnauthorizedAccessException("You don't have permission to access this workout");
            }

            return MapToWorkoutResponse(workout);
        }

        public async Task<IEnumerable<WorkoutSummaryResponse>> GetAllByUserAsync(int userId)
        {
            var workouts = await _workoutRepository.GetByUserIdAsync(userId);

            return workouts.Select(w => new WorkoutSummaryResponse
            {
                Id = w.Id,
                Name = w.Name,
                Date = w.Date,
                DurationMinutes = w.DurationMinutes,
                ExerciseCount = w.Exercises.Count,
                CreatedAt = w.CreatedAt
            });
        }

        public async Task<WorkoutResponse> CreateAsync(CreateWorkoutRequest request, int userId)
        {
            var workout = new Workout
            {
                UserId = userId,
                Name = request.Name,
                Date = request.Date,
                DurationMinutes = request.DurationMinutes,
                Notes = request.Notes,
                CreatedAt = DateTime.UtcNow,
                Exercises = request.Exercises.Select(e => new Exercise
                {
                    Name = e.Name,
                    Sets = e.Sets,
                    Reps = e.Reps,
                    Weight = e.Weight,
                    Order = e.Order
                }).ToList()
            };

            var createdWorkout = await _workoutRepository.CreateAsync(workout);
            return MapToWorkoutResponse(createdWorkout);
        }

        public async Task<WorkoutResponse> UpdateAsync(int workoutId, UpdateWorkoutRequest request, int userId)
        {
            // Check if workout exists and belongs to user
            if (!await _workoutRepository.BelongsToUserAsync(workoutId, userId))
            {
                throw new UnauthorizedAccessException("You don't have permission to update this workout");
            }

            var workout = new Workout
            {
                Id = workoutId,
                UserId = userId,
                Name = request.Name,
                Date = request.Date,
                DurationMinutes = request.DurationMinutes,
                Notes = request.Notes,
                UpdatedAt = DateTime.UtcNow,
                Exercises = request.Exercises.Select(e => new Exercise
                {
                    Name = e.Name,
                    Sets = e.Sets,
                    Reps = e.Reps,
                    Weight = e.Weight,
                    Order = e.Order
                }).ToList()
            };

            var updatedWorkout = await _workoutRepository.UpdateAsync(workout);

            if (updatedWorkout == null)
            {
                throw new KeyNotFoundException($"Workout with ID {workoutId} not found");
            }

            return MapToWorkoutResponse(updatedWorkout);
        }

        public async Task DeleteAsync(int workoutId, int userId)
        {
            // Check if workout belongs to user
            if (!await _workoutRepository.BelongsToUserAsync(workoutId, userId))
            {
                throw new UnauthorizedAccessException("You don't have permission to delete this workout");
            }

            var deleted = await _workoutRepository.DeleteAsync(workoutId);

            if (!deleted)
            {
                throw new KeyNotFoundException($"Workout with ID {workoutId} not found");
            }
        }

        private static WorkoutResponse MapToWorkoutResponse(Workout workout)
        {
            return new WorkoutResponse
            {
                Id = workout.Id,
                Name = workout.Name,
                Date = workout.Date,
                DurationMinutes = workout.DurationMinutes,
                Notes = workout.Notes,
                CreatedAt = workout.CreatedAt,
                UpdatedAt = workout.UpdatedAt,
                Exercises = workout.Exercises
                    .OrderBy(e => e.Order)
                    .Select(e => new ExerciseResponse
                    {
                        Id = e.Id,
                        Name = e.Name,
                        Sets = e.Sets,
                        Reps = e.Reps,
                        Weight = e.Weight,
                        Order = e.Order
                    }).ToList()
            };
        }
    }
}