import { test, expect } from '@playwright/test';

test.describe.only('Drag and Drop single', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/elements/dragndrop/images');  // https://www.qa-practice.com/elements/dragndrop/images
  });

  test('Drag and Drop simple', async ({ page }) => {
    const source = page.locator('#rect-droppable1');
    await expect (source.locator('img')).toBeVisible();

    const target = page.locator('#rect-droppable2');
    await source.dragTo(target);
    await expect (source.locator('img')).not.toBeVisible();

    const result = target.locator('.text-droppable');
    await expect (target.locator('img')).toBeVisible();
    await expect (result).toHaveText('Dropped!');
  });
});
