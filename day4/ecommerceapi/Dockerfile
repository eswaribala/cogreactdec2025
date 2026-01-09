# --- Build/runtime image ---
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# If your server listens on 4000 (change if needed)
EXPOSE 4000

# Run the API (server.js)
CMD ["node", "server.js"]
