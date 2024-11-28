import { defineConfig } from "cypress";
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      username: "adminTest",
      password: "aA123456",
    },
    setupNodeEvents(on, config) {},
  },
});
