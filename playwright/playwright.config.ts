import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 6000,
    use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'mobile-chrome',
            use: {
                ...devices['Pixel 5'],  // Android Pixel 5 emulation
                browserName: 'chromium',  // Mobile Chromium
            },
        },
    ],
    reporter: [['html', { outputFolder: 'playwright-report' }]],
});
