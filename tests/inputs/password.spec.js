import { test, expect } from '@playwright/test';
import { 
  getInputField, 
  submitInput,
  expectResultVisible, 
  expectInvalidFeedback 
} from '../utils/formUtils.js';

test.describe('Password field', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/elements/input/passwd');  // it is already a bug, should be /elements/input/password
    });

    test('Input field has placeholder', async ({ page }) => {
      const inputField = await getInputField(page);
      const placeholder = await inputField.getAttribute('placeholder');
      expect(placeholder).toBe('Submit me');
    });

    test('Valid password - meets all criteria', async ({ page }) => {
      const password = 'Abc123!@#'; 
      await submitInput(page, password);
      await expectResultVisible(page, password);
    });


    test('Input field has password type', async ({ page }) => {
      const inputField = await getInputField(page);
      const type = await inputField.getAttribute('type');
      expect(type).toBe('password');
    });

  
    test('Too short - 6 characters', async ({ page }) => {
      const password = 'Ab1!a'; 
      await submitInput(page, password);
      await expectInvalidFeedback(page, "Low password complexity");
    });
  
    test('Cyrillic characters - invalid', async ({ page }) => {
      const password = 'Пароль123!';
      await submitInput(page, password);
      await expectInvalidFeedback(page, "Low password complexity");
    });
  
    test('No uppercase letters', async ({ page }) => {
      const password = 'abc123!@#';
      await submitInput(page, password);
      await expectInvalidFeedback(page, "Low password complexity");
    });
  
    test('No lowercase letters', async ({ page }) => {
      const password = 'ABC123!@#';
      await submitInput(page, password);
      await expectInvalidFeedback(page, "Low password complexity");
    });
  
    test('No digit', async ({ page }) => {
      const password = 'Abcdef!@#';
      await submitInput(page, password);
      await expectInvalidFeedback(page, "Low password complexity");
    });
  
    test('No special character', async ({ page }) => {
      const password = 'Abcdef123';
      await submitInput(page, password);
      await expectInvalidFeedback(page, "Low password complexity");
    });


    test('Only special characters - invalid', async ({ page }) => {
      const password = '!@#$%^&*()';
      await submitInput(page, password);
      await expectInvalidFeedback(page, "Low password complexity");
    });


    test('Empty password - invalid', async ({ page }) => {
      const password = '';
      await submitInput(page, password);
      const result = page.getByText('Your input was:');
      await expect(result).not.toBeVisible();
    });


    test('Spaces only - invalid', async ({ page }) => {
      const password = '     ';
      await submitInput(page, password);
      await expectInvalidFeedback(page, "This field is required.");
    });


    test('Unusual length - 20 characters', async ({ page }) => {
      const password = 'Ab1#'.repeat(5);
      await submitInput(page, password);
      await expectResultVisible(page, password);
    });


    // Although the maximum length is not mantioned in the requirements, it can be 
    // assumed that the maximum length should be no more than 20 characters for password field.
    test('More than 20 characters', async ({ page }) => {
      const password = 'Ab1#'.repeat(5) + 'a';
      const inputField = await getInputField(page);
      await inputField.fill(text);
      await expect(inputField).toHaveValue(text.slice(0, 20));
    });


    // To check the maximum length, the password is filled with 255 characters
    // In case the password field is intended to have no length restrictions as per requirements.
    test('Unusual length - 255 characters', async ({ page }) => {
      const password = 'Ab1#'.repeat(63) + 'Ab1#';
      await submitInput(page, password);
      await expectResultVisible(page, password);
    });


    test('The Password text copy is not allowed', async ({ page }) => {
      const password = 'Abc123!@#';
      const inputField = await getInputField(page);
      await inputField.fill('Abc123!@#');
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.press('KeyC');
      await page.keyboard.up('Control');
      await page.goto('https://www.google.com');
      const googleInoput = await page.locator('#APjFqb');
      await googleInoput.click();
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyV');
      await page.keyboard.up('Control');
      await expect(googleInoput).not.toHaveValue(password);
    });

    // test('The Password text copy is not allowed', async ({ page }) => {
    //   const password = 'Abc123!@#';
    
    //   const inputField = await getInputField(page);
    //   await inputField.fill(password);
    
    //   await page.setContent(`
    //     <input id="password" type="password" value="${password}" />
    //     <input id="paste-target" />
    //   `);
    
    //   const passwordField = page.locator('#password');
    //   const pasteTarget = page.locator('#paste-target');
    
    //   await passwordField.click();
    //   await page.keyboard.down('Control');
    //   await page.keyboard.press('KeyA');
    //   await page.keyboard.press('KeyC');
    //   await page.keyboard.up('Control');
    
    //   await pasteTarget.click();
    //   await page.keyboard.down('Control');
    //   await page.keyboard.press('KeyV');
    //   await page.keyboard.up('Control');
    
    //   await expect(pasteTarget).toHaveValue('');
    // });
  
  });