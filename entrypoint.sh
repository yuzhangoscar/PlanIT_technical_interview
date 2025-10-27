#!/bin/bash
set -e

# Build cypress run command with environment variables
CYPRESS_CMD="npx cypress run --browser chromium --config chromeWebSecurity=false"

# Add tags if provided
if [ -n "$TAGS" ]; then
  CYPRESS_CMD="$CYPRESS_CMD --env tags=$TAGS"
fi

# Add test environment if provided
if [ -n "$TEST_ENV" ]; then
  CYPRESS_CMD="$CYPRESS_CMD,testEnv=$TEST_ENV"
fi

# Add test version if provided
if [ -n "$TEST_VER" ]; then
  CYPRESS_CMD="$CYPRESS_CMD,testVer=$TEST_VER"
fi

echo "Running Cypress with:"
echo "  TAGS: $TAGS"
echo "  TEST_ENV: $TEST_ENV"
echo "  TEST_VER: $TEST_VER"
eval "$CYPRESS_CMD"
