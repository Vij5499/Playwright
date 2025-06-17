import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'tests',                  // one root for UI + API
  testIgnore: ['tests/contracts/**'],
  timeout: 30 * 1000,                // 30-sec hard stop per test
  retries: process.env.CI ? 2 : 0,   // auto-retry only in CI
  
  reporter: [
    ['html', { open: 'never' }],     // local report == localhost:9323
    ['list']                         // concise CLI output
  ],
  
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  // ---- Cross-browser projects ----
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ]
};

export default config;
