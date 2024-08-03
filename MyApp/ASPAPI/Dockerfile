# Define the build stage using the .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the solution file and the .csproj file and restore packages
COPY *.sln .
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code and publish the application
COPY . ./
RUN dotnet publish -c Release -o out

# Define the runtime stage using the .NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "ASPAPI.dll"]


