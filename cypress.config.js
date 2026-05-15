import { defineConfig } from "cypress";

export default defineConfig({

  component: {
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",

    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173/add',

    setupNodeEvents(on, config) {
    },
  },

});