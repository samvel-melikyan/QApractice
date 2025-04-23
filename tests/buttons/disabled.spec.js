import { test, expect } from '@playwright/test';

test.describe('Button but under link tag', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/elements/button/disabled');
    });

    test('Looks like a button click', async ({ page }) => {
        const button = page.locator('#submit-id-submit');
        await expect(button).toBeDisabled();
        const deopdown = page.locator('#id_select_state');
        await deopdown.selectOption('Enabled');
        await expect(button).not.toBeDisabled();
        await button.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText('Submitted');
        await deopdown.selectOption('Disabled');
        await expect(button).toBeDisabled();
    });


});