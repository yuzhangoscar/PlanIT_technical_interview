.PHONY: help install test test-interactive lint lint-fix docker-test docker-build docker-clean clean

# Default target - show help
help:
	@echo "Local Commands:"
	@echo "  make install          - Install dependencies"
	@echo "  make lint             - Run ESLint to check code quality"
	@echo "  make lint-fix         - Run ESLint and auto-fix issues"
	@echo "  make test             - Run tests headlessly"
	@echo "  make test-interactive - Run tests interactively"
	@echo "  make clean            - Clean screenshots and videos"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make docker-build     - Build Docker image"
	@echo "  make docker-test      - Run tests in Docker"
	@echo "  make docker-clean     - Remove Docker resources"

# Install dependencies
install:
	npm install

# Run ESLint to check code quality
lint:
	npm run lint

# Run ESLint and auto-fix issues
lint-fix:
	npm run lint:fix

# Run Cypress tests headlessly
test:
	npx cypress run --browser chrome

# Open Cypress interactively
test-interactive:
	npm run cypress:open

# Clean up generated files
clean:
	rm -rf cypress/screenshots/* cypress/videos/*

# Build Docker image
docker-build:
	docker build -t planit-cypress:latest .

# Run tests in Docker
docker-test:
	@docker image inspect planit-cypress:latest >/dev/null 2>&1 || $(MAKE) docker-build
	docker run --rm \
		-v $(PWD)/cypress/screenshots:/app/cypress/screenshots \
		-v $(PWD)/cypress/videos:/app/cypress/videos \
		--ipc=host \
		planit-cypress:latest

# Clean Docker resources
docker-clean:
	docker rm -f planit-cypress 2>/dev/null || true
	docker rmi -f planit-cypress:latest 2>/dev/null || true
