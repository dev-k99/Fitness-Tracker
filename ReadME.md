# 💪 Fitness Workout Tracker

A production-ready full-stack fitness tracking application built with ASP.NET Core 8 and React TypeScript.

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
- ✅ Azure deployment ready

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
- **Cloud**: Azure App Service + Azure SQL
- **CI/CD**: GitHub Actions ready

## 📁 Project Structure

```
FitnessTrackerProject/
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

## 🔧 Database Schema

### Users Table
- Id (PK)
- Email (Unique)
- PasswordHash
- FirstName
- LastName
- CreatedAt

### Workouts Table
- Id (PK)
- UserId (FK → Users)
- Name
- Date
- DurationMinutes
- Notes
- CreatedAt
- UpdatedAt

### Exercises Table
- Id (PK)
- WorkoutId (FK → Workouts)
- Name
- Sets
- Reps
- Weight
- Order

**Relationships**: User → Workouts (1:M), Workout → Exercises (1:M)

## 🚀 Getting Started

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

### Using Docker
```bash
# Create .env file
cp .env.example .env

# Start all services
docker-compose up --build

# Access
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

## 📖 API Documentation

Once the backend is running, visit:
```
https://localhost:7123/swagger
```

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Workouts (Requires Auth)
- `GET /api/workouts` - Get all user workouts
- `GET /api/workouts/{id}` - Get workout details
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/{id}` - Update workout
- `DELETE /api/workouts/{id}` - Delete workout

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

## 🚢 Deployment

### Azure Deployment

See `azure-deploy.md` for complete deployment guide.

**Quick Azure Deploy:**
```bash
# Backend
az webapp up --name fitness-tracker-api --resource-group FitnessTrackerRG

# Frontend
npm run build
az webapp up --name fitness-tracker-frontend --resource-group FitnessTrackerRG
```

### Environment Variables

**Backend (Azure App Service)**:
- `ConnectionStrings__DefaultConnection`
- `JwtSettings__SecretKey`
- `Cors__AllowedOrigins__0`

**Frontend (Static Web App)**:
- `REACT_APP_API_URL`

## 📊 Performance Considerations

- Async/await for all I/O operations
- EF Core query optimization with AsNoTracking
- Index on frequently queried fields
- JWT for stateless authentication (no session overhead)
- Docker multi-stage builds (small images)
- Nginx caching for static assets

## 🧪 Testing

### Manual Testing
1. Register new user
2. Login
3. Create workout with exercises
4. View dashboard statistics
5. Edit workout
6. Delete workout

### API Testing (Swagger)
All endpoints documented and testable via Swagger UI.

## 📈 Future Enhancements

- [ ] Exercise library/templates
- [ ] Progress photos
- [ ] Workout analytics and charts
- [ ] Social features (share workouts)
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Export workout data
- [ ] Integration with fitness APIs

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your own use.

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

Built following industry best practices and clean architecture principles.

---

**⭐ Star this repo if you find it helpful!**