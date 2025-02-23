import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutFormPage } from '../pages/CheckoutFormPage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('@regression', () => {
    test('@bug @validation BUG-004: Checkout form should not accept invalid inputs (But It Does)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutFormPage = new CheckoutFormPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);

        await inventoryPage.addProductsToCart();
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutFormPage.fillCheckoutForm(' ', ' ', ' ');
        await checkoutFormPage.verifyValidationError();
    });

    test('@bug @security BUG-004: Checkout form should reject SQL injection (But It Does Not)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutFormPage = new CheckoutFormPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);

        await inventoryPage.addProductsToCart();
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutFormPage.fillCheckoutForm("'; DROP TABLE users; --", "Test", "00000");
        await checkoutFormPage.verifyValidationError();
    });

    test('@bug @data-integrity BUG-001: Cart items should not be shared between users', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        // First user logs in and adds an item
        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);
        await inventoryPage.addProductsToCart();
        await inventoryPage.goToCart();
        await expect(await cartPage.getCartItemCount()).toBe(2);

        await loginPage.logout();

        // Second user logs in
        await loginPage.goto();
        await loginPage.login(process.env.USER_PROBLEM as string, process.env.PASSWORD as string);
        await inventoryPage.goToCart();
        await expect(await cartPage.getCartItemCount()).toBe(0);
    });
});
