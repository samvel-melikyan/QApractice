import {test, expect} from '@playwright/test';


test.describe.only('New Tab', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/elements/new_tab/link');  // https://www.qa-practice.com/elements/new_tab/link
    });
    

    test.skip('New tab link', async ({ page }) => {
        const [secondTab] = await Promise.all([
          page.context().waitForEvent('page'),     // Wait for the new tab
          page.click('#new-page-link')             // Trigger the new tab
        ]);
    
        await secondTab.waitForLoadState();
        await secondTab.bringToFront();
    
        await expect(secondTab).toHaveURL('https://www.qa-practice.com/elements/new_tab/new_page');
        await expect(secondTab.locator('#result-text')).toHaveText('I am a new page in a new tab');
    });



    test('New tab button', async ({ page }) => {
        const newTabButton = page.getByText('New tab button');
        await newTabButton.click();
        const button = page.locator('#new-page-button');  
        expect(button).toBeVisible();
        const [secondTab] = await Promise.all([
          page.context().waitForEvent('page'),     // Wait for the new tab
          button.click()                           // Trigger the new tab
        ]);
        await secondTab.waitForLoadState();
        await secondTab.bringToFront();
    
        await expect(secondTab).toHaveURL('https://www.qa-practice.com/elements/new_tab/new_page');
        await expect(secondTab.locator('#result-text')).toHaveText('I am a new page in a new tab');
    });
    
});