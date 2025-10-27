# PlanIT Technical Interview - Cypress E2E Tests

[![Cypress E2E Tests](https://github.com/yuzhangoscar/PlanIT_technical_interview/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/yuzhangoscar/PlanIT_technical_interview/actions/workflows/cypress-tests.yml)
![Cypress](https://img.shields.io/badge/Cypress-15.5.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen)
![Docker](https://img.shields.io/badge/Docker-20+-blue)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

This project contains automated end-to-end tests for the PlanIT web application using Cypress with Cucumber BDD. It runs on github actions every 30 mins; it can also be cloned and run locally via Docker containers.

## Table of Contents

- [🚀 Quick Start](#quick-start)
- [📋 Project Overview](#project-overview)
- [📁 Project Structure](#project-structure)
- [📋 Prerequisites](#prerequisites)
- [⚙️ Installation](#installation)
- [🧪 Running Tests](#running-tests)
  - [💻 Local Execution](#local-execution)
  - [🐳 Docker Execution](#docker-execution)
  - [⚡ GitHub Actions Execution](#github-actions-execution)
  - [⚠️ Parameter Status](#️-important-parameter-status)
- [✅ Test Scenarios](#test-scenarios)
  - [📝 Contact Form Validation](#contact-form-validation)
  - [🛒 Shopping Cart Validation](#shopping-cart-validation)
- [🛠️ Technology Stack](#technology-stack)
- [📝 Notes](#notes)

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

# Run tests with specific tags
make docker-test TAGS="@happy-path"
make docker-test TAGS="@contact"
make docker-test TAGS="@smoke @contact"  # Multiple tags with AND logic
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

### GitHub Actions Execution

Tests run automatically on every push to `main` and `develop` branches every 30 minutes. You can also trigger manual test runs with custom parameters:

**Trigger Manual Test Run:**
1. Go to the **Actions** tab on GitHub
2. Click **Cypress E2E Tests (Docker)** workflow
3. Click **Run workflow**
4. Fill in the optional parameters:
   - **Tags**: Cucumber tags to run (e.g., `@smoke`, `@contact`, `@happy-path`, or `@smoke @contact`)
   - **Environment**: Target environment (e.g., `staging`, `production`, `dev`)
   - **Version**: Application version being tested (e.g., `1.0.0`, `2.3.1`)
5. Click **Run workflow**

**Available Tags:**
- `@smoke` - Smoke/basic tests (default)
- `@contact` - Contact form validation tests
- `@happy-path` - Happy path scenario tests
- Combine multiple tags with spaces: `@smoke @contact`

**Example Workflows:**
```bash
# Run only contact form tests
Tags: @contact

# Run multiple test suites
Tags: @smoke @contact

# Run happy path tests in production
Tags: @happy-path
Environment: production
Version: 2.0.0
```

**⚠️ Important: Parameter Status**

Currently, only the **TAGS** parameter is fully functional:

| Parameter | Status | Functionality |
|-----------|--------|---------------|
| **TAGS** | ✅ Active | Filters which Cucumber scenarios run based on test tags |
| **ENV** | ⏳ Placeholder | Does not currently affect test execution. All tests run against the default endpoint |
| **VER** | ⏳ Placeholder | Does not currently affect test execution. Can be set for future use |

**What Works Now:**
- Use `TAGS` to run specific test suites (e.g., `@contact`, `@happy-path`, `@smoke`)
- Multiple tags can be combined with spaces: `@smoke @contact`

**Future Enhancements:**
- `ENV` will be used to switch between different test environments (staging, production, etc.)
- `VER` will be used to track which application version is being tested

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
