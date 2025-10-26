# Use Cypress base image with Node.js
FROM cypress/base:22.14.0

WORKDIR /app

# Install Chromium (ARM64 compatible) and dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    fonts-liberation \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Verify Cypress installation
RUN npx cypress verify

# Verify Chromium is installed and get its version
RUN chromium --version

# Verify browsers are available
RUN npx cypress info

# Set Chromium binary path for Cypress
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMIUM_BIN=/usr/bin/chromium

# Set environment variables
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

# Default command - run with Chromium browser explicitly
CMD ["npx", "cypress", "run", "--browser", "chromium", "--config", "chromeWebSecurity=false"]