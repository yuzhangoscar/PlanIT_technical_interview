# PlanIT Technical Interview - Cypress E2E Tests

[![Cypress E2E Tests](https://github.com/brucechang/PlanIT_technical_interview/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/brucechang/PlanIT_technical_interview/actions/workflows/cypress-tests.yml)
[![Lint Check](https://github.com/brucechang/PlanIT_technical_interview/actions/workflows/lint.yml/badge.svg)](https://github.com/brucechang/PlanIT_technical_interview/actions/workflows/lint.yml)
[![Create Release](https://github.com/brucechang/PlanIT_technical_interview/actions/workflows/create-release.yml/badge.svg)](https://github.com/brucechang/PlanIT_technical_interview/actions/workflows/create-release.yml)

This project contains automated end-to-end tests for the PlanIT web application using Cypress with Cucumber BDD. It runs on github actions every 30 mins; it can also be cloned and run locally via Docker containers.

## Quick Start

**Clone and run tests in 3 commands:**

git clone <repository-url>
cd PlanIT_technical_interview
make docker-test

**Requirements:** Docker only. No local Node.js or npm installation needed.

## Project Overview

Automated E2E test suite validating the [PlanIT Testing application](https://jupiter.cloud.planittesting.com) using:
- Cypress 15.5.0 with TypeScript
- Cucumber BDD for human-readable test scenarios
- Page Object Model design pattern
- Docker containerization for cross-platform compatibility

**Test Coverage:**
- Contact form validation (mandatory fields, error messages)
- Shopping cart functionality (price calculations, item quantities)

## Project Structure

```
.
├── tests/E2E/Cypress/
│   └── cypress/
│       ├── e2e/              # Feature files (Cucumber BDD)
│       ├── pages/            # Page Object Models
│       ├── step-definitions/ # Cucumber step definitions
│       ├── helpers/          # Constants and selectors
│       └── support/          # Cypress support files
├── cypress.config.ts         # Cypress configuration
├── Dockerfile                # Docker image with all dependencies
├── docker-compose.yml        # Docker Compose configuration
├── Makefile                  # Build and test commands
└── package.json              # Node.js dependencies
```

## Prerequisites

### Local Development
- Node.js (v18 or higher)
- npm

### Docker Deployment
- Docker (v20 or higher)
- Docker Compose (v2 or higher)

## Installation

### Local Setup
```bash
make install
# or
npm install
```

### Docker Setup
```bash
make docker-build
```

## Running Tests

### Local Execution

**Headless Mode (CI/CD):**
```bash
make test
# or
make cypress-run
# or
npm run cypress:run
```

**Interactive Mode (Development):**
```bash
make test-interactive
# or
make cypress-open
# or
npm run cypress:open
```

### Docker Execution

**Using Docker directly:**
```bash
# Build the image (first time only)
make docker-build

# Run tests in Docker container
make docker-test
```

**Using Docker Compose:**
```bash
# Build and run tests
make docker-compose-up

# Stop and clean up
make docker-compose-down
```

**Debug in Docker:**
```bash
# Open interactive shell in container
make docker-shell

# Then run tests manually inside container
npm run cypress:run
```

## Test Scenarios

### Contact Form Validation
- **Feature**: Contact form mandatory field validation
- **Scenarios**:
  - Submit empty form and verify error messages
  - Fill mandatory fields and verify errors disappear (5 iterations)

### Shopping Cart Validation
- **Feature**: Shopping cart price verification
- **Scenarios**:
  - Add multiple items to cart and verify price calculations
  - Verify subtotals and total prices

## Technology Stack

- **Test Framework**: Cypress v15.5.0
- **BDD Framework**: Cucumber (@badeball/cypress-cucumber-preprocessor)
- **Language**: TypeScript v5.9.3
- **Bundler**: ESBuild
- **Pattern**: Page Object Model

## Notes

- All npm modules are baked into the Docker image for faster test execution
- The Docker image size is optimized using multi-stage builds and `.dockerignore`
- Test results (screenshots/videos) are automatically saved to the host machine
- The `--ipc=host` flag is used to prevent Chrome crashes in Docker
