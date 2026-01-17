using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FitnessTracker.Backend.DTOs.Workouts;
using FitnessTracker.Backend.Services.Interfaces;

namespace FitnessTracker.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    [Produces("application/json")]
    public class WorkoutsController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;
        private readonly ILogger<WorkoutsController> _logger;

        public WorkoutsController(IWorkoutService workoutService, ILogger<WorkoutsController> logger)
        {
            _workoutService = workoutService;
            _logger = logger;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                throw new UnauthorizedAccessException("Invalid user token");
            }
            return userId;
        }

        /// <summary>
        /// Get all workouts for the current user
        /// </summary>
        /// <returns>List of workout summaries</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<WorkoutSummaryResponse>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<WorkoutSummaryResponse>>> GetAll()
        {
            var userId = GetCurrentUserId();
            var workouts = await _workoutService.GetAllByUserAsync(userId);
            return Ok(workouts);
        }

        /// <summary>
        /// Get a specific workout by ID
        /// </summary>
        /// <param name="id">Workout ID</param>
        /// <returns>Detailed workout information</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(WorkoutResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<WorkoutResponse>> GetById(int id)
        {
            var userId = GetCurrentUserId();

            try
            {
                var workout = await _workoutService.GetByIdAsync(id, userId);
                return Ok(workout);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid();
            }
        }

        /// <summary>
        /// Create a new workout
        /// </summary>
        /// <param name="request">Workout details</param>
        /// <returns>Created workout</returns>
        [HttpPost]
        [ProducesResponseType(typeof(WorkoutResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<WorkoutResponse>> Create([FromBody] CreateWorkoutRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();
            var workout = await _workoutService.CreateAsync(request, userId);

            _logger.LogInformation("Workout created: {WorkoutId} by User: {UserId}", workout.Id, userId);

            return CreatedAtAction(nameof(GetById), new { id = workout.Id }, workout);
        }

        /// <summary>
        /// Update an existing workout
        /// </summary>
        /// <param name="id">Workout ID</param>
        /// <param name="request">Updated workout details</param>
        /// <returns>Updated workout</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(WorkoutResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<WorkoutResponse>> Update(int id, [FromBody] UpdateWorkoutRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();

            try
            {
                var workout = await _workoutService.UpdateAsync(id, request, userId);
                _logger.LogInformation("Workout updated: {WorkoutId} by User: {UserId}", id, userId);
                return Ok(workout);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid();
            }
        }

        /// <summary>
        /// Delete a workout
        /// </summary>
        /// <param name="id">Workout ID</param>
        /// <returns>No content</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetCurrentUserId();

            try
            {
                await _workoutService.DeleteAsync(id, userId);
                _logger.LogInformation("Workout deleted: {WorkoutId} by User: {UserId}", id, userId);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid();
            }
        }
    }
}