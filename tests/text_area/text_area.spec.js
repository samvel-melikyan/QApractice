import {test, expect} from '@playwright/test';

test.describe('Text Area single', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/elements/textarea/single');  // https://www.qa-practice.com/elements/textarea/single
    });


    test('Text area simple text', async ({ page }) => {
        const text = 'This is a test text area';
        const textArea = page.locator('#id_text_area');
        await textArea.fill(text);
        await expect(textArea).toHaveValue(text);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText(text);
    });


    test('Text area with special characters', async ({ page }) => {
        const text = 'This is a test text area with special characters: !@#$%^&*()_+{}:"<>?';
        const textArea = page.locator('#id_text_area');
        await textArea.fill(text);
        await expect(textArea).toHaveValue(text);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText(text);
    });


    test('Text area with new line', async ({ page }) => {
        const text = 'This is a test text area with new line\nThis is the second line';
        const textArea = page.locator('#id_text_area');
        await textArea.fill(text);
        await expect(textArea).toHaveValue(text);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText(text);
    });


    test('Text area with long text more that 2000 chars', async ({ page }) => {
        const text = '\nThis is the second line. '.repeat(100); 
        const textArea = page.locator('#id_text_area');
        await textArea.fill(text);
        await expect(textArea).toHaveValue(text);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText(text);
    });


    test('Text area with empty text', async ({ page }) => {
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
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


test.describe('Text Area multiple', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/elements/textarea/textareas');  // https://www.qa-practice.com/elements/textarea/textareas
    });


    test('Text area simple text', async ({ page }) => {
        const chapter1 = 'This is a test text area 1';
        const chapter2 = 'This is a test text area 2';
        const chapter3 = 'This is a test text area 3';
        const textArea1 = page.locator('#id_first_chapter');
        const textArea2 = page.locator('#id_second_chapter');
        const textArea3 = page.locator('#id_third_chapter');
        await textArea1.fill(chapter1);
        await textArea2.fill(chapter2);
        await textArea3.fill(chapter3);
        await expect(textArea1).toHaveValue(chapter1);
        await expect(textArea2).toHaveValue(chapter2);
        await expect(textArea3).toHaveValue(chapter3);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText(chapter1 + chapter2 + chapter3);
    });


    test('Text area with special characters', async ({ page }) => {
        const chapter1 = 'This is a test text area 1 !@#$%^&*()_+{}:"<>?';
        const chapter2 = 'This is a test text area 2 !@#$%^&*()_+{}:"<>?';
        const chapter3 = 'This is a test text area 3 !@#$%^&*()_+{}:"<>?';
        const textArea1 = page.locator('#id_first_chapter');
        const textArea2 = page.locator('#id_second_chapter');
        const textArea3 = page.locator('#id_third_chapter');
        await textArea1.fill(chapter1);
        await textArea2.fill(chapter2);
        await textArea3.fill(chapter3);
        await expect(textArea1).toHaveValue(chapter1);
        await expect(textArea2).toHaveValue(chapter2);
        await expect(textArea3).toHaveValue(chapter3);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText(chapter1 + chapter2 + chapter3);
    });

    
    test('Text area simple text - only first chapter', async ({ page }) => {
        const chapter1 = 'This is a test text area 1';
        const textArea1 = page.locator('#id_first_chapter');
        await textArea1.fill(chapter1);
        await expect(textArea1).toHaveValue(chapter1);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).toHaveText(chapter1);
    });


    test('Text area simple text - only second chapter', async ({ page }) => {
        const chapter2 = 'This is a test text area 2';
        const textArea2 = page.locator('#id_second_chapter');
        await textArea2.fill(chapter2);
        await expect(textArea2).toHaveValue(chapter2);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).not.toBeVisible();
    });


    test('Text area simple text - only third chapter', async ({ page }) => {
        const chapter3 = 'This is a test text area 3';
        const textArea3 = page.locator('#id_third_chapter');
        await textArea3.fill(chapter3);
        await expect(textArea3).toHaveValue(chapter3);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
        await expect(result).not.toBeVisible();
    });


    test('Text area simple text - only second and third chapter', async ({ page }) => {
        const chapter2 = 'This is a test text area 2';
        const chapter3 = 'This is a test text area 3';
        const textArea2 = page.locator('#id_second_chapter');
        const textArea3 = page.locator('#id_third_chapter');
        await textArea2.fill(chapter2);
        await textArea3.fill(chapter3);
        await expect(textArea2).toHaveValue(chapter2);
        await expect(textArea3).toHaveValue(chapter3);
        const submit = page.locator('#submit-id-submit');
        await submit.click();
        const result = page.locator('#result-text');
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
    });


});