FROM node:latest

WORKDIR /app/client
# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Start the application
CMD npm run build && npm run start && npm run test