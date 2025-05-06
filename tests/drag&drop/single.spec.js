import {test, expect} from '@playwright/test';

test.describe('Drag and Drop single', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/elements/drag_and_drop/single');  // https://www.qa-practice.com/elements/drag_and_drop/single
    });


    test('Drag and Drop simple', async ({ page }) => {
        const source = page.locator('#id_source');
        const target = page.locator('#id_target');
        await source.dragTo(target);
        const result = page.locator('#result-text');
        await expect(result).toHaveText('Dropped!');
    });


    test('Drag and Drop with special characters', async ({ page }) => {
        const source = page.locator('#id_source_special_characters');
        const target = page.locator('#id_target_special_characters');
        await source.dragTo(target);
        const result = page.locator('#result-text-special-characters');
        await expect(result).toHaveText('Dropped!');
    });

});