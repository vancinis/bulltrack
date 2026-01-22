# Base image
FROM node:20-alpine AS base

# Development stage
FROM base AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Set environment variable for Next.js to listen on all interfaces
ENV HOSTNAME=0.0.0.0

# Start development server
CMD ["npm", "run", "dev", "--", "--port", "3001"]
