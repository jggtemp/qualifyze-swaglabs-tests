import { Page, expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class CheckoutCompletePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyOrderCompletion() {
        await expect(this.page.locator(LOCATORS.checkoutComplete.completeHeader)).toHaveText('Thank you for your order!');
    }
}
