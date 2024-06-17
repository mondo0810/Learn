# Sử dụng Node.js 12 LTS (Long Term Support) làm base image
FROM node:12-alpine

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Copy mã nguồn vào container
COPY . .

# Cài đặt các dependencies và build ứng dụng
RUN npm install
RUN npm run build

# Mở cổng 3000 cho ứng dụng Express
EXPOSE 3000

# Command để khởi động ứng dụng khi container được chạy
CMD ["npm", "run", "start"]
