import { Page, expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class CheckoutFormPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
        await this.page.fill(LOCATORS.checkoutForm.firstNameInput, firstName);
        await this.page.fill(LOCATORS.checkoutForm.lastNameInput, lastName);
        await this.page.fill(LOCATORS.checkoutForm.zipCodeInput, zipCode);
        await this.page.click(LOCATORS.checkoutForm.continueButton);
    }

    async verifyValidationError() {
        await expect(this.page.locator(LOCATORS.checkoutForm.errorMessage)).toBeVisible();
    }
}
