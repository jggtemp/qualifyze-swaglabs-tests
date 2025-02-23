import { Page } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async proceedToCheckout() {
        await this.page.click(LOCATORS.cart.checkoutButton);
    }

    async getCartItemCount() {
        return await this.page.locator(LOCATORS.cart.cartItem).count();
    }
}
