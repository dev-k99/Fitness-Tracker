using FitnessTracker.Backend.Models;

namespace FitnessTracker.Backend.Repositories.Interfaces
{
    public interface IWorkoutRepository
    {
        Task<Workout?> GetByIdAsync(int id);
        Task<IEnumerable<Workout>> GetByUserIdAsync(int userId);
        Task<Workout> CreateAsync(Workout workout);
        Task<Workout?> UpdateAsync(Workout workout);
        Task<bool> DeleteAsync(int id);
        Task<bool> BelongsToUserAsync(int workoutId, int userId);
    }
}