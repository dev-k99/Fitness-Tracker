using Microsoft.EntityFrameworkCore;
using FitnessTracker.Backend.Data;
using FitnessTracker.Backend.Models;
using FitnessTracker.Backend.Repositories.Interfaces;

namespace FitnessTracker.Backend.Repositories
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly ApplicationDbContext _context;

        public WorkoutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Workout?> GetByIdAsync(int id)
        {
            return await _context.Workouts
                .Include(w => w.Exercises.OrderBy(e => e.Order))
                .AsNoTracking()
                .FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<IEnumerable<Workout>> GetByUserIdAsync(int userId)
        {
            return await _context.Workouts
                .Include(w => w.Exercises)
                .Where(w => w.UserId == userId)
                .OrderByDescending(w => w.Date)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Workout> CreateAsync(Workout workout)
        {
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();

            // Reload with exercises
            return await GetByIdAsync(workout.Id) ?? workout;
        }

        public async Task<Workout?> UpdateAsync(Workout workout)
        {
            var existingWorkout = await _context.Workouts
                .Include(w => w.Exercises)
                .FirstOrDefaultAsync(w => w.Id == workout.Id);

            if (existingWorkout == null)
                return null;

            // Update workout properties
            existingWorkout.Name = workout.Name;
            existingWorkout.Date = workout.Date;
            existingWorkout.DurationMinutes = workout.DurationMinutes;
            existingWorkout.Notes = workout.Notes;
            existingWorkout.UpdatedAt = DateTime.UtcNow;

            // Remove old exercises
            _context.Exercises.RemoveRange(existingWorkout.Exercises);

            // Add new exercises
            existingWorkout.Exercises = workout.Exercises;

            await _context.SaveChangesAsync();

            return await GetByIdAsync(workout.Id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
                return false;

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> BelongsToUserAsync(int workoutId, int userId)
        {
            return await _context.Workouts
                .AnyAsync(w => w.Id == workoutId && w.UserId == userId);
        }
    }
}