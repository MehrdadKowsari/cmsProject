import { defineConfig } from "cypress";
import { loadEnvConfig } from '@next/env'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
});
