import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { compareScreenshots } from '../utils/compareScreenshots';
import {LoginPage} from "../pages/LoginPage";

dotenv.config();

test.describe('@visual', () => {
    test('Compare inventory page between standard_user and visual_user (should fail)', async ({ page }, testInfo) => {
        test.setTimeout(15000);
        const screenshotDir = path.join(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir);
        }

        const standardScreenshot = path.join(screenshotDir, `inventory-standard-${testInfo.title}.png`);
        const visualScreenshot = path.join(screenshotDir, `inventory-visual-${testInfo.title}.png`);
        const diffScreenshot = path.join(screenshotDir, `inventory-diff-${testInfo.title}.png`);

        // 1. Login as standard_user
        await page.goto(process.env.BASE_URL as string);
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);

        // 2. Take HD screenshot
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.screenshot({ path: standardScreenshot, fullPage: true });

        // 3. Log out
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await page.waitForTimeout(1000);

        // 4. Login as visual_user
        await page.goto(process.env.BASE_URL as string);
        await loginPage.goto();
        await loginPage.login(process.env.USER_VISUAL as string, process.env.PASSWORD as string);

        // 5. Take HD screenshot
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.screenshot({ path: visualScreenshot, fullPage: true });

        // 6. Compare screenshots using Pixelmatch
        const mismatch = await compareScreenshots(standardScreenshot, visualScreenshot, diffScreenshot, 0.1);

        // 7. Attach images as artifacts if test fails
        if (mismatch > 0) {
            testInfo.attach('Standard Screenshot', { path: standardScreenshot, contentType: 'image/png' });
            testInfo.attach('Visual Screenshot', { path: visualScreenshot, contentType: 'image/png' });
            testInfo.attach('Diff Screenshot', { path: diffScreenshot, contentType: 'image/png' });
        }

        // 8. Assert no visual differences
        expect(mismatch, `Found ${mismatch} pixel differences! Check ${diffScreenshot} for details.`).toBe(0);
    });

    test('Compare inventory page between standard_user and standard_user (should be ok!)', async ({ page }) => {
        test.setTimeout(15000);
        const screenshotDir = path.join(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir);
        }

        const standardScreenshot = path.join(screenshotDir, 'inventory-standard.png');
        const visualScreenshot = path.join(screenshotDir, 'inventory-visual.png');
        const diffScreenshot = path.join(screenshotDir, 'inventory-diff.png');

        // 1. Login as standard_user
        await page.goto(process.env.BASE_URL as string);
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);

        // 2. Take HD screenshot
        await page.waitForTimeout(1000);
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.screenshot({ path: standardScreenshot, fullPage: true });

        // 3. Log out
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await page.waitForTimeout(1000);

        // 4. Login as visual_user
        await page.goto(process.env.BASE_URL as string);
        await loginPage.goto();
        await loginPage.login(process.env.USER_STANDARD as string, process.env.PASSWORD as string);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);

        // 5. Take HD screenshot
        await page.waitForTimeout(1000);
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.screenshot({ path: visualScreenshot, fullPage: true });

        // 6. Compare screenshots using Pixelmatch
        const mismatch = await compareScreenshots(standardScreenshot, visualScreenshot, diffScreenshot, 0.1);

        // 7. Assert that there are no visual differences
        expect(mismatch, `Found ${mismatch} pixel differences! Check ${diffScreenshot} for details.`).toBe(0);
    });
});
