import { Page } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class CheckoutOverviewPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async completePurchase() {
        await this.page.click(LOCATORS.checkoutOverview.finishButton);
    }
}
