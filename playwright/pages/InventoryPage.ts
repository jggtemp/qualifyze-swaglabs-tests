import { Page } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class InventoryPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addProductsToCart() {
        await this.page.click(LOCATORS.inventory.addToCartBackpack);
        await this.page.click(LOCATORS.inventory.addToCartBikeLight);
    }

    async removeOneProduct() {
        await this.page.click(LOCATORS.inventory.removeBikeLight);
    }

    async goToCart() {
        await this.page.click(LOCATORS.inventory.cartIcon);
    }
}
