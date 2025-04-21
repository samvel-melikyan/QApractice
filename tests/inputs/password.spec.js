import { test, expect } from '@playwright/test';
import { 
  getInputField, 
  submitInput,
  expectResultVisible, 
  expectInvalidFeedback 
} from '../utils/formUtils.js';

test.describe('Password field', () => {

    // ✅ POSITIVE CASE
    test('Valid password - meets all criteria', async ({ page }) => {
      const inputField = await input(page);
      const password = 'Abc123!@#'; 
  
      await inputField.fill(password);
      await inputField.press('Enter');
      await expect(inputField).toHaveValue('');
  
      const result = page.getByText('Your input was:');
      await expect(result).toBeVisible();
      await expect(result).toContainText(password);
    });
  
    // ❌ NEGATIVE CASES
  
    test('Too short - 6 characters', async ({ page }) => {
      const inputField = await input(page);
      const password = 'Ab1!a'; // Only 6 chars
  
      await inputField.fill(password);
      await inputField.press('Enter');
  
      const error = page.getByText('Password must be at least 8 characters');
      await expect(error).toBeVisible();
    });
  
    test('Cyrillic characters - invalid', async ({ page }) => {
      const inputField = await input(page);
      const password = 'Пароль123!';
  
      await inputField.fill(password);
      await inputField.press('Enter');
  
      const error = page.getByText('Password must contain only English letters');
      await expect(error).toBeVisible();
    });
  
    test('No uppercase letters', async ({ page }) => {
      const inputField = await input(page);
      const password = 'abc123!@#';
  
      await inputField.fill(password);
      await inputField.press('Enter');
  
      const error = page.getByText('Password must include at least one uppercase letter');
      await expect(error).toBeVisible();
    });
  
    test('No lowercase letters', async ({ page }) => {
      const inputField = await input(page);
      const password = 'ABC123!@#';
  
      await inputField.fill(password);
      await inputField.press('Enter');
  
      const error = page.getByText('Password must include at least one lowercase letter');
      await expect(error).toBeVisible();
    });
  
    test('No digit', async ({ page }) => {
      const inputField = await input(page);
      const password = 'Abcdef!@#';
  
      await inputField.fill(password);
      await inputField.press('Enter');
  
      const error = page.getByText('Password must include at least one digit');
      await expect(error).toBeVisible();
    });
  
    test('No special character', async ({ page }) => {
      const inputField = await input(page);
      const password = 'Abcdef123';
  
      await inputField.fill(password);
      await inputField.press('Enter');
  
      const error = page.getByText('Password must include at least one special character');
      await expect(error).toBeVisible();
    });
  
  });