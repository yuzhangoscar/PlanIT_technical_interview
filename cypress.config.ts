// cypress.config.ts
import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  e2e: {
    specPattern: 'tests/E2E/Cypress/cypress/e2e/**/*.feature',
    supportFile: 'tests/E2E/Cypress/cypress/support/e2e.ts',
    async setupNodeEvents(on, config) {
      // Enable Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // ESBuild for TypeScript
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  }
});
