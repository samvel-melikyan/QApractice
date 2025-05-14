// import {test, expect} from '@playwright/test';


// test.describe('Alert single', () => {
//     test.beforeEach(async ({page}) => {
//         await page.goto('/elements/alert/alert#');  // https://www.qa-practice.com/elements/alert/alert#
//     });

//     test('Alert simple', async ({ page }) => {

//         const alert = page.getByRole('link', { name: 'Click' })
//         await alert.click();
//         const dialog = await page.waitForEvent('dialog');
//         await dialog.accept();
//         const result = page.locator('#result-alert');
//         await expect(result).toHaveText('Alert clicked!');
//     });


// });