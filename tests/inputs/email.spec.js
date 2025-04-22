import { test, expect } from '@playwright/test';
import { 
  getInputField, 
  submitInput,
  expectResultVisible, 
  expectInvalidFeedback 
} from '../utils/formUtils.js';

test.describe('Email field', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/elements/input/email');
    });

    test('Input field has placeholder', async ({ page }) => {
        const inputField = await getInputField(page);
        const placeholder = await inputField.getAttribute('placeholder');
        expect(placeholder).toBe('Submit me');
    });
    
    
    test('Valid email - meets all criteria', async ({ page }) => {
        const email = 'user@example.com'; 
        await submitInput(page, email);
        await expectResultVisible(page, email);
    });




    test('LocalHost domain allowed', async ({ page }) => {
        const email = 'user@localhost'; 
        await submitInput(page, email);
        await expectResultVisible(page, email);
    });


    test('OtherHost domain - invalid', async ({ page }) => {
        const email = 'user@otherhost'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Without domain address - invalid', async ({page}) => {
        const email = 'user@'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Without @ sign - invalid', async ({page}) => {
        const email = 'user.com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Without Top Level Domain - invalid', async ({ page }) => {
        const email = 'user@example'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('With space between - invalid', async ({page}) => {
        const email = 'user @example.com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('With Cyrillic characters - invalid', async ({ page }) => {
        const email = 'Пользователь@пример.com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('With special characters - invalid', async ({ page }) => {
        const email = 'user@exa!mple.com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Too short - invalid', async ({ page }) => {
        const email = 'a@b.c';
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Too long - invalid', async ({page}) => {
        const email = 'a'.repeat(65) + '@' + 'b'.repeat(190) + '.com';
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Empty field - invalid', async ({page}) => {
        const email = '';
        await submitInput(page, email);
        const result = page.getByText('Your input was:');
        await expect(result).not.toBeVisible();
    });


    test('Spaces only - invalid', async ({page}) => {
        const email = '     ';
        await submitInput(page, email);
        await expectInvalidFeedback(page, "This field is required.");
    });


    test('Spaces before and after', async ({page}) => {
        const email = 'user@example.com'; 
        await submitInput(page, email);
        await expectResultVisible(page, email);
    });


    test('With dot before @ - invalid', async ({page}) => {
        const email = 'user.@example.com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('With dot before domain - invalid', async ({page}) => {
        const email = 'user@example..com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('With dot before TLD - invalid', async ({page}) => {
        const email = 'user@example.c..om'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('With multiple @ - invalid', async ({page}) => {
        const email = 'user@@example.com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Withot username - invalid', async ({page}) => {
        const email = '@example.com'; 
        await submitInput(page, email);
        await expectInvalidFeedback(page, "Enter a valid email address."); 
    });


    test('Uppercase letters allowed', async ({ page }) => {
        const email = 'User@example.com'; 
        await submitInput(page, email);
        await expectResultVisible(page, email);
    });

});