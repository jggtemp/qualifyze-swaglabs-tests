import { Page, expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(process.env.BASE_URL as string);
    }

    async login(username: string, password: string) {
        await this.page.fill(LOCATORS.login.usernameInput, username);
        await this.page.fill(LOCATORS.login.passwordInput, password);
        await this.page.click(LOCATORS.login.loginButton);
    }

    async verifyLoginError() {
        await expect(this.page.locator(LOCATORS.login.errorMessage)).toBeVisible();
    }

    async logout() {
        await this.page.click(LOCATORS.logout.menuButton);
        await this.page.click(LOCATORS.logout.logoutButton);
    }

}
