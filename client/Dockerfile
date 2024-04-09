# Use Node.js LTS version as base image
FROM node:latest

WORKDIR /app/client
# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Start the application
CMD npm run dev
