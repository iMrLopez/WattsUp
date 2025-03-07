FROM node:18-alpine

# Install build tools and extra utilities required for building native modules
RUN apk add --no-cache build-base autoconf automake libtool

WORKDIR /app

# Copy dependency definitions and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Next.js default development port
EXPOSE 3000

# Start Next.js in development mode (with hot reloading)
CMD ["npm", "run", "dev"]
