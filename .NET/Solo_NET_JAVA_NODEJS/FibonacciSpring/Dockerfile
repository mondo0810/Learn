# Sử dụng OpenJDK 22 làm base image
FROM openjdk:22-jdk

# Thiết lập thư mục làm việc
WORKDIR /edumall-app

# Sao chép tệp JAR đã được xây dựng từ bước trước vào thư mục /quizz-app trong container
COPY build/libs/*.jar app.jar

# Mở cổng 9192
EXPOSE 9000

# Lệnh chạy ứng dụng Spring Boot
CMD ["java", "-jar", "app.jar"]