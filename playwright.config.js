// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  retries: 0,
  
  timeout: 30000,
 
  
  use: {
    baseURL: 'https://www.qa-practice.com',
  },

  
  projects: [
    {
      name: 'chromium',
      // use: { 
      //   ...devices['Desktop Chrome'],
      //   headless: false, // Run the browser in non-headless mode to see the actions
      // },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

   
  ],

 
});

