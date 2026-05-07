import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  globalSetup: "./tests/global-setup.ts",
  globalTeardown: "./tests/global-teardown.ts",

  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },

  webServer: {
    command: "bun dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
});