import { test, expect } from '@playwright/test';
import {LoginPage} from "../pages/LoginPage";
import * as dotenv from "dotenv";

dotenv.config();
test.describe.parallel('@performance Login Performance Test', () => {
    for (let i = 0; i < 100; i++) {
        test(`User ${i + 1} logs in`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);
            await expect(page).toHaveURL(/inventory.html/);
        });
    }
});
