import { test, expect } from '@playwright/test';
import { 
  getInputField, 
  submitInput,
  expectResultVisible, 
  expectInvalidFeedback 
} from '../utils/formUtils.js';


test.describe('Inputs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/elements/input/simple');
  });

  
  test('Input field has placeholder', async ({ page }) => {
    const inputField = await getInputField(page);
    const placeholder = await inputField.getAttribute('placeholder');
    expect(placeholder).toBe('Submit me');
  });
  

  test('Input field contains value', async ({ page }) => {
    const inputField = await getInputField(page);
    const text = 'John Doe';
    await inputField.fill(text);
    await inputField.evaluate(el => el.dispatchEvent(new Event('blur')));
    await expect(inputField).toHaveValue(text);
  });

  
  test('Specific symbols and numbers space between', async ({ page }) => {
    const text = 'John-Doe-1967 _777_';
    await submitInput(page, text);
    await expectResultVisible(page, text);
  });


  test('Specific symbols and number', async ({ page }) => {
    const text = 'John-Doe-1967_777_';
    await submitInput(page, text);
    await expectResultVisible(page, text);
  });


  test('25 characters allowed', async ({ page }) => {
    const text = 'a'.repeat(25);
    await submitInput(page, text);
    await expectResultVisible(page, text);
  });


  test('Numbers allowed', async ({ page }) => {
    const text = '1234567890';
    await submitInput(page, text);
    await expectResultVisible(page, text);
  });


  test('Only special characters is not allowed', async ({ page }) => {
    const text = '!@#$%^&*()_+';
    await submitInput(page, text);
    await expectInvalidFeedback(page, 'Enter a valid string consisting of letters, numbers, underscores or hyphens.');
  });


  test('Empty would not move on', async ({ page }) => {
    const text = '';
    await submitInput(page, text);
    const result = page.getByText('Your input was:');
    await expect(result).not.toBeVisible();
  });


  test('Only spaces is not allowed', async ({ page }) => {
    const text = ' ';
    await submitInput(page, text);
    await expectInvalidFeedback(page, 'This field is required.');
  });


  test('Cirilic text is not allowed', async ({ page }) => {
    const text = 'Привет мир';
    await submitInput(page, text);
    await expectInvalidFeedback(page, 'Enter a valid string consisting of letters, numbers, underscores or hyphens.');
  });


  test('English first then Cirilic is not allowed', async ({ page }) => {
    const text = 'Hello мир';
    await submitInput(page, text);
    await expectInvalidFeedback(page, 'Enter a valid string consisting of letters, numbers, underscores or hyphens.');
  });


  test('Cirilic first then English is not allowed', async ({ page }) => {
    const text = 'мир Hello';
    await submitInput(page, text);
    await expectInvalidFeedback(page, 'Enter a valid string consisting of letters, numbers, underscores or hyphens.');
  });


  test('1 character is not allowed', async ({ page }) => {
    const text = 'a';
    await submitInput(page, text);
    await expectInvalidFeedback(page, 'Please enter 2 or more characters');
  });


  test('26 characters is not allowed', async ({ page }) => {
    const text = 'a'.repeat(26);
    await submitInput(page, text);
    await expectInvalidFeedback(page, 'Please enter no more than 25 characters');
  });


  test('2 characters is allowed', async ({ page }) => {
    const text = 'aa';
    await submitInput(page, text);
    await expectResultVisible(page, text);
  });

});
