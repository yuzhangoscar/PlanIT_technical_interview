.PHONY: help test test-headless test-interactive cypress-open cypress-run clean install \
        docker-build docker-test docker-clean docker-shell docker-compose-up docker-compose-down

# Default target - show help
help:
	@echo "Available commands:"
	@echo ""
	@echo "Local Commands:"
	@echo "  make install          - Install dependencies"
	@echo "  make test             - Run Cypress tests in headless mode (default)"
	@echo "  make test-headless    - Run Cypress tests in headless mode"
	@echo "  make test-interactive - Open Cypress in interactive mode"
	@echo "  make cypress-open     - Alias for test-interactive"
	@echo "  make cypress-run      - Alias for test-headless"
	@echo "  make clean            - Clean up screenshots and videos"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make docker-build     - Build Docker image with all dependencies"
	@echo "  make docker-test      - Run Cypress tests in Docker container"
	@echo "  make docker-shell     - Open interactive shell in Docker container"
	@echo "  make docker-clean     - Remove Docker image and containers"
	@echo "  make docker-compose-up   - Run tests using docker-compose"
	@echo "  make docker-compose-down - Stop and remove docker-compose containers"
	@echo ""
	@echo "Examples:"
	@echo "  make test                    # Run all tests headlessly (local)"
	@echo "  make test-interactive        # Open Cypress UI (local)"
	@echo "  make docker-build            # Build Docker image"
	@echo "  make docker-test             # Run tests in Docker"
	@echo "  make docker-compose-up       # Run tests with docker-compose"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Run Cypress tests in headless mode (default)
test: test-headless

# Run Cypress tests in headless mode
test-headless:
	@echo "Running Cypress tests in headless mode with Chrome..."
	npx cypress run --browser chrome

# Alias for headless mode
cypress-run: test-headless

# Open Cypress in interactive mode
test-interactive:
	@echo "Opening Cypress in interactive mode..."
	npm run cypress:open

# Alias for interactive mode
cypress-open: test-interactive

# Clean up generated files
clean:
	@echo "Cleaning up screenshots and videos..."
	rm -rf cypress/screenshots/*
	rm -rf cypress/videos/*
	@echo "Clean complete!"

# ===== Docker Commands =====

# Build Docker image with all dependencies baked in
docker-build:
	@echo "Building Docker image with Cypress and all dependencies..."
	docker build -t planit-cypress:latest .
	@echo "Docker image built successfully!"

# Run Cypress tests in Docker container
docker-test:
	@echo "Checking if Docker image exists..."
	@docker image inspect planit-cypress:latest >/dev/null 2>&1 || \
		(echo "Docker image not found. Building it now..." && $(MAKE) docker-build)
	@echo "Running Cypress tests in Docker container with Chrome..."
	docker run --rm \
		-v $(PWD)/cypress/screenshots:/app/cypress/screenshots \
		-v $(PWD)/cypress/videos:/app/cypress/videos \
		--ipc=host \
		planit-cypress:latest

# Open interactive shell in Docker container (for debugging)
docker-shell:
	@echo "Opening interactive shell in Docker container..."
	docker run --rm -it \
		-v $(PWD)/cypress/screenshots:/app/cypress/screenshots \
		-v $(PWD)/cypress/videos:/app/cypress/videos \
		--ipc=host \
		--entrypoint /bin/bash \
		planit-cypress:latest

# Clean up Docker resources
docker-clean:
	@echo "Removing Docker containers and images..."
	docker rm -f planit-cypress 2>/dev/null || true
	docker rmi -f planit-cypress:latest 2>/dev/null || true
	@echo "Docker cleanup complete!"

# Run tests using docker-compose
docker-compose-up:
	@echo "Running tests with docker-compose..."
	docker-compose up --build --abort-on-container-exit
	docker-compose down

# Stop and remove docker-compose containers
docker-compose-down:
	@echo "Stopping docker-compose containers..."
	docker-compose down -v
	@echo "Containers stopped and removed!"
