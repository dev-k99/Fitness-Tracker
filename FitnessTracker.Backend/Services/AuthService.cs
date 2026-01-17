using FitnessTracker.Backend.DTOs.Auth;
using FitnessTracker.Backend.Helpers;
using FitnessTracker.Backend.Models;
using FitnessTracker.Backend.Repositories.Interfaces;
using FitnessTracker.Backend.Services.Interfaces;
using BCrypt.Net;

namespace FitnessTracker.Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtHelper _jwtHelper;

        public AuthService(IUserRepository userRepository, JwtHelper jwtHelper)
        {
            _userRepository = userRepository;
            _jwtHelper = jwtHelper;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            // Check if user already exists
            if (await _userRepository.ExistsAsync(request.Email))
            {
                throw new InvalidOperationException("User with this email already exists");
            }

            // Hash password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Create user
            var user = new User
            {
                Email = request.Email.ToLower(),
                PasswordHash = passwordHash,
                FirstName = request.FirstName,
                LastName = request.LastName,
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userRepository.CreateAsync(user);

            // Generate JWT token
            var token = _jwtHelper.GenerateToken(createdUser);
            var expiresAt = _jwtHelper.GetTokenExpiry();

            return new AuthResponse
            {
                UserId = createdUser.Id,
                Email = createdUser.Email,
                FirstName = createdUser.FirstName,
                LastName = createdUser.LastName,
                Token = token,
                ExpiresAt = expiresAt
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            // Find user by email
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            // Verify password
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            // Generate JWT token
            var token = _jwtHelper.GenerateToken(user);
            var expiresAt = _jwtHelper.GetTokenExpiry();

            return new AuthResponse
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = token,
                ExpiresAt = expiresAt
            };
        }
    }
}