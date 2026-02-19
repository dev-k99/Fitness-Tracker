# Fitness Workout Tracker

A production-ready full-stack fitness tracking application built with ASP.NET Core 8 and React TypeScript.

[Live Demo](https://fitness-tracker-frontend-woad-nu.vercel.app/)

## 🚀 Features

### User Management
- ✅ User registration with email validation
- ✅ Secure login with JWT authentication
- ✅ Password hashing with BCrypt
- ✅ Protected routes and API endpoints

### Workout Tracking
- ✅ Create workouts with multiple exercises
- ✅ View workout history and statistics
- ✅ Edit existing workouts
- ✅ Delete workouts
- ✅ Track exercises with sets, reps, and weight

### Technical Features
- ✅ RESTful API design
- ✅ Clean Architecture (Controllers → Services → Repositories)
- ✅ Entity Framework Core with Code-First migrations
- ✅ JWT-based stateless authentication
- ✅ Global error handling
- ✅ Swagger/OpenAPI documentation
- ✅ CORS configuration
- ✅ Responsive React UI
- ✅ TypeScript for type safety
- ✅ Docker support

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 8 Web API
- **Database**: SQL Server
- **ORM**: Entity Framework Core 8
- **Authentication**: JWT Bearer tokens
- **Password Hashing**: BCrypt
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS with modern design

### DevOps
- **Containerization**: Docker & Docker Compose
- **Cloud**: Render + Vercel
- **CI/CD**: GitHub Actions ready

## 📁 Project Structure

```
FitnessTracker/
├── FitnessTracker.Backend/
│   ├── Controllers/          # API endpoints
│   ├── Services/             # Business logic
│   ├── Repositories/         # Data access layer
│   ├── Models/               # Entity models
│   ├── DTOs/                 # Data transfer objects
│   ├── Data/                 # DbContext
│   ├── Helpers/              # JWT helper
│   ├── Middleware/           # Error handling
│   └── Program.cs            # App configuration
│
├── FitnessTracker.Frontend/
│   ├── src/
│   │   ├── api/              # API integration
│   │   ├── auth/             # Authentication context
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── types/            # TypeScript types
│   │   └── App.tsx           # Main app component
│   └── public/
│
└── docker-compose.yml        # Multi-container setup
```

##  Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- SQL Server / LocalDB
- Visual Studio 2022 (Backend)
- Visual Studio Code (Frontend)

### Quick Start

#### 1. Backend Setup
```bash
cd FitnessTracker.Backend
dotnet restore
dotnet ef database update
dotnet run
```

Backend runs at: `https://localhost:7123`

#### 2. Frontend Setup
```bash
cd FitnessTracker.Frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`


## 🔐 Security Features

- Password hashing with BCrypt (12 rounds)
- JWT authentication with configurable expiry
- HTTPS enforcement
- CORS configuration
- Input validation
- SQL injection protection (EF Core parameterization)
- XSS prevention

## 🎨 UI Features

- Modern gradient design
- Responsive layout (mobile-friendly)
- Loading states
- Error handling
- Protected routes
- Persistent authentication
- Clean dashboard with statistics
- Intuitive workout forms
