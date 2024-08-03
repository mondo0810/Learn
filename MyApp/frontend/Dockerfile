# Use a specific node version based on Alpine for a smaller base image
FROM node:20-alpine

# Install any necessary dependencies
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app

# Install dependencies in a separate layer to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm install --production

# Copy only the necessary files for the build
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
