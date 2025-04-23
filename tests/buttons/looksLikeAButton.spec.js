import { test, expect } from '@playwright/test';

test.describe('Button but under link tag', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/elements/button/like_a_button');
    });

    test('Looks like a button click', async ({ page }) => {
        const button = page.locator('.a-button');
        await button.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText('Submitted');
    });


});