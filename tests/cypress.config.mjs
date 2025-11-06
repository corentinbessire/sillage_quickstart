import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: 'http://sillage.ddev.site',
    env: {
      screens: {
        sm: 420,
        md: 710,
        lg: 1080,
        xl: 1650,
      },
    },
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
  },
})
