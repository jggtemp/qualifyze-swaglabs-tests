import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutFormPage } from '../pages/CheckoutFormPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('@checkout @e2e', () => {
    test('@flow Complete a full checkout flow', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutFormPage = new CheckoutFormPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);

        await inventoryPage.addProductsToCart();
        await inventoryPage.removeOneProduct();
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutFormPage.fillCheckoutForm('John', 'Doe', '12345');

        await checkoutOverviewPage.completePurchase();
        await checkoutCompletePage.verifyOrderCompletion();
    });

    test('@validation Checkout form should validate empty inputs', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutFormPage = new CheckoutFormPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);

        await inventoryPage.addProductsToCart();
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutFormPage.fillCheckoutForm('', '', '');
        await checkoutFormPage.verifyValidationError();
    });
});
