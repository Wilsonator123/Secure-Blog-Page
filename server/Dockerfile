# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# Use Node.js LTS version as base image
FROM node:14-alpine

# Set working directory
WORKDIR /app/server

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npm install -g nodemon

# Copy the rest of the application
COPY . .

# Expose port 8000
EXPOSE 8000

# Start the application using nodemon
CMD ["npm", "run", "dev"]
