import {test, expect} from '@playwright/test';
import { log } from 'console';

test.describe('Single select', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/elements/select/single_select');  
    });

    test('Single select has placeholder', async ({ page }) => {
        const dropdown = page.locator('#id_choose_language');
        await dropdown.click();
        const languages = await dropdown.locator('option').allTextContents();
        for (let language of languages){
            await dropdown.selectOption(language);
            const button = page.locator('#submit-id-submit');
            await button.click();
            const result = page.locator('#result-text');
            if (language === ''){
                await expect(result).not.toBeVisible();
            }else{
                await expect(result).toBeVisible();
                await expect(result).toHaveText(language);
            }
            await dropdown.click();
        }
        
    });

    test('toggle requariments opens and closes currectly', async ({page}) =>{
        const requariments = page.locator('#req_header');
        const requarimentsBlock = page.locator('#req_text');
        await expect(requarimentsBlock).toHaveAttribute('class', 'collapse');
        await requariments.click();
        await expect(requarimentsBlock).toHaveAttribute('class', 'collapse show');
        await requariments.click();
        await expect(requarimentsBlock).toHaveAttribute('class', 'collapse');
    })
});