import {test, expect} from '@playwright/test';

test.describe('Drag and Drop single', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/elements/dragndrop/boxes');  // https://www.qa-practice.com/elements/dragndrop/boxes
    });


    test('Drag and Drop simple', async ({ page }) => {
        const source = page.locator('#rect-draggable');
        const target = page.locator('#rect-droppable');
        await source.dragTo(target);
        const result = page.locator('#text-droppable');
        await expect(result).toHaveText('Dropped!');
    });

});