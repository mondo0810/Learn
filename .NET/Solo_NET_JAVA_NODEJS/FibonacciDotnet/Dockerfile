# Sử dụng .NET Core SDK 3.1 làm base image để build ứng dụng
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy mã nguồn vào container
COPY . .

# Restore dependencies và build ứng dụng
RUN dotnet restore
RUN dotnet build -c Release -o out

# Publish ứng dụng
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "FibonacciDotnet.dll"]
