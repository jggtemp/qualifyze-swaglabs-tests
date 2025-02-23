import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('@login', () => {
    const users = [
        { name: 'Standard User', username: process.env.USER_STANDARD, shouldLogin: true },
        { name: 'Locked Out User', username: process.env.USER_LOCKED, shouldLogin: false },
        { name: 'Problem User', username: process.env.USER_PROBLEM, shouldLogin: true },
        { name: 'Performance Glitch User', username: process.env.USER_PERFORMANCE, shouldLogin: true },
        { name: 'Error User', username: process.env.USER_ERROR, shouldLogin: true },
        { name: 'Visual User', username: process.env.USER_VISUAL, shouldLogin: true },
    ];

    users.forEach(user => {
        test(`${user.name} should ${user.shouldLogin ? 'log in successfully' : 'see an error'}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.goto();
            await loginPage.login(user.username as string, process.env.PASSWORD as string);

            if (user.shouldLogin) {
                await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);
            } else {
                await loginPage.verifyLoginError();
            }
        });
    });

    test('User should see an error with incorrect credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('invalid_user', 'wrong_password');

        await loginPage.verifyLoginError();
    });

    test('User should see an error when trying to log in without entering credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('', '');

        await loginPage.verifyLoginError();
    });
});
