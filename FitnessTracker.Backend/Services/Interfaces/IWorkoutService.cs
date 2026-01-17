using FitnessTracker.Backend.DTOs.Workouts;

namespace FitnessTracker.Backend.Services.Interfaces
{
    public interface IWorkoutService
    {
        Task<WorkoutResponse> GetByIdAsync(int workoutId, int userId);
        Task<IEnumerable<WorkoutSummaryResponse>> GetAllByUserAsync(int userId);
        Task<WorkoutResponse> CreateAsync(CreateWorkoutRequest request, int userId);
        Task<WorkoutResponse> UpdateAsync(int workoutId, UpdateWorkoutRequest request, int userId);
        Task DeleteAsync(int workoutId, int userId);
    }
}