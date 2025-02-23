import { test, expect } from '@playwright/test';

test.describe.parallel('@performance Login Performance Test', () => {
    for (let i = 0; i < 100; i++) {
        test(`User ${i + 1} logs in`, async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');
            await page.fill('[data-test="username"]', 'standard_user');
            await page.fill('[data-test="password"]', 'secret_sauce');
            await page.click('[data-test="login-button"]');
            await expect(page).toHaveURL(/inventory.html/);
        });
    }
});
