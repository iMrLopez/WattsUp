FROM node:18-slim

# Install required build tools (especially if you need to build native modules)
RUN apt-get update && apt-get install -y \
  build-essential autoconf automake libtool \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package.json and package-lock.json from the build context into /app
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
