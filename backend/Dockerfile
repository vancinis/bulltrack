# Base image
FROM node:24-alpine AS base

# Development stage
FROM base AS development

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set CI environment for pnpm
ENV CI=true

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "run", "start:dev"]
