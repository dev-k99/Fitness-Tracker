using FitnessTracker.Backend.DTOs.Auth;

namespace FitnessTracker.Backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
    }
}