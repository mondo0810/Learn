# Sử dụng SDK của .NET 8 để build dự án
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Sao chép các file csproj và khôi phục các gói NuGet
COPY *.csproj ./
RUN dotnet restore

# Sao chép toàn bộ mã nguồn và build dự án
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "ASPAPI.dll"]
