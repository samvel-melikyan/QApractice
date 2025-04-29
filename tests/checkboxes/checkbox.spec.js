import { test, expect } from '@playwright/test';


test.describe('Single checkbox', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/elements/checkbox/single_checkbox');
    });

    test('Check the checkbox and submit', async ({ page }) => {
        const checkbox = page.locator('#id_checkbox_0');
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText('select me or not');
    });


    test('Submit without checking checkbox', async ({ page }) => {
        const checkbox = page.locator('#id_checkbox_0');
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
        }
        await expect(checkbox).not.toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).not.toBeVisible();
    });


    test('Check the checkbox and uncheck it', async ({ page }) => {
        const checkbox = page.locator('#id_checkbox_0');
        await checkbox.check();
        await expect (checkbox).toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText('select me or not');
        await checkbox.uncheck();
        await expect (checkbox).not.toBeChecked();
        await submit.click();
        await expect(result).not.toBeVisible();
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


test.describe('Checkboxes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/elements/checkbox/mult_checkbox');
    });


    test('Check all checkboxes and submit', async ({ page }) => {
        const checkboxes = await page.locator('.form-check-input').all();
        for (const checkbox of checkboxes) {
            await checkbox.check();
        }   
        let text = [];       
        for(const checkbox of checkboxes) {
            await expect(checkbox).toBeChecked();
            const value = await checkbox.getAttribute('value');
            text.push(value);
        }        
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(text.join(', ').toLowerCase());
    });


    test('Uncheck all checkboxes and submit', async ({ page }) => {
        const checkboxes = await page.locator('.form-check-input').all();
        for (const checkbox of checkboxes) {
            if (await checkbox.isChecked()) {
                await checkbox.uncheck();
            }
        }         
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).not.toBeVisible();
    });


    test('Check checkbox one and submit', async ({ page }) => {
        const one = page.locator('#id_checkboxes_1');
        const text = await one.getAttribute('value');
        await one.check();
        await expect(one).toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(text.toLowerCase());
    });


    test('Check checkbox two and submit', async ({ page }) => {
        const two = page.locator('#id_checkboxes_1');
        const text = await two.getAttribute('value');
        await two.check();
        await expect(two).toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(text.toLowerCase());
    });


    test('Check checkbox three and submit', async ({ page }) => {
        const three = page.locator('#id_checkboxes_1');
        const text = await three.getAttribute('value');
        await three.check();
        await expect(three).toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(text.toLowerCase());
    });


    test('Check one and two checkboxes and submit', async ({ page }) => {
        const one = page.locator('#id_checkboxes_0');
        const two = page.locator('#id_checkboxes_1');
        const text = await one.getAttribute('value')
            + ', ' + await two.getAttribute('value');
        await one.check();
        await two.check();
        await expect(one).toBeChecked();
        await expect(two).toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(text.toLowerCase());
    });


    test('Check two and three checkboxes and submit', async ({ page }) => {
        const two = page.locator('#id_checkboxes_1');
        const three = page.locator('#id_checkboxes_2');
        const text = await two.getAttribute('value')
        + ', ' + await three.getAttribute('value');
        await two.check();
        await three.check();
        await expect(two).toBeChecked();
        await expect(three).toBeChecked();
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(text.toLowerCase());
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