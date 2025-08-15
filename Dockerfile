# Use Node.js 20 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve globally for production
RUN npm install -g serve

# Expose port
EXPOSE $PORT

# Start the server
CMD serve -s dist -l $PORT
