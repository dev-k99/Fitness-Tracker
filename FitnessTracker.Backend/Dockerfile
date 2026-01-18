# Stage 1: Build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["FitnessTracker.Backend.csproj", "."]
RUN dotnet restore "FitnessTracker.Backend.csproj"

# Copy everything else
COPY . .

# Build and publish
WORKDIR "/src"
RUN dotnet publish "FitnessTracker.Backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime image (smaller, production-ready)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080 

# Set environment
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

# Run the app
ENTRYPOINT ["dotnet", "FitnessTracker.Backend.dll"]