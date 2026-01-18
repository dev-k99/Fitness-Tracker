using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using FitnessTracker.Backend.Data;
using FitnessTracker.Backend.Helpers;
using FitnessTracker.Backend.Middleware;
using FitnessTracker.Backend.Repositories;
using FitnessTracker.Backend.Repositories.Interfaces;
using FitnessTracker.Backend.Services;
using FitnessTracker.Backend.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger with JWT support
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Fitness Tracker API",
        Version = "v1",
        Description = "A production-ready fitness workout tracker API with JWT authentication",
        Contact = new OpenApiContact
        {
            Name = "Kwanele Ntshangase",
            Email = "kwanelerh069@gmail.com"
        }
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Database (PostgreSQL for Render)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey not configured");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

// CORS - IMPORTANT: Make it flexible for Vercel
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // For testing: Allow any origin temporarily (tighten later)
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();

        // After Vercel deploy, replace with:
        // policy.WithOrigins("https://your-vercel-app-name.vercel.app")
        //       .AllowAnyMethod()
        //       .AllowAnyHeader()
        //       .AllowCredentials();
    });
});

// Register services
builder.Services.AddScoped<JwtHelper>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IWorkoutRepository, WorkoutRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IWorkoutService, WorkoutService>();

var app = builder.Build();

// HTTP pipeline
// Enable Swagger in ALL environments (dev + prod) - very useful for testing
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Fitness Tracker API v1");
    options.RoutePrefix = string.Empty; // Makes Swagger appear at root: https://your-api.onrender.com/
});

// Global error handling
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");  // Apply the policy

app.UseAuthentication();
app.UseAuthorization();

// Simple health check at root (helps Render verify the service is healthy)
app.MapGet("/", () => "Fitness Tracker API is running!");

// Auto-migrate on startup (safe in production too, but only if needed)
// WARNING: In production, consider running migrations manually or via CI/CD
// For now, keep it but add try-catch
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        dbContext.Database.Migrate();
        Console.WriteLine("Database migration completed successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database migration failed: {ex.Message}");
        // Optional: log to file or service, but don't crash the app
    }
}

app.MapControllers();

app.Run();