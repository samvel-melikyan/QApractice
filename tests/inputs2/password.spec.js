import { test, expect } from '@playwright/test';
import { 
  getInputField, 
  submitInput,
  expectResultVisible, 
  expectInvalidFeedback 
} from '../utils/formUtils.js';

const passwordTestCases = [
  {
    title: 'Valid password - meets all criteria',
    password: 'Abc123!@#',
    negative: false,
  },
  {
    title: 'Too short - 6 characters',
    password: 'Ab1!a',
    negative: true,
    message: 'Low password complexity'
  },
  {
    title: 'Cyrillic characters - invalid',
    password: 'Пароль123!',
    negative: true,
    message: 'Low password complexity'
  },
  {
    title: 'No uppercase letters',
    password: 'abc123!@#',
    negative: true,
    message: 'Low password complexity'
  },
  {
    title: 'No lowercase letters',
    password: 'ABC123!@#',
    negative: true,
    message: 'Low password complexity'
  },
  {
    title: 'No digit',
    password: 'Abcdef!@#',
    negative: true,
    message: 'Low password complexity'
  },
  {
    title: 'No special character',
    password: 'Abcdef123',
    negative: true,
    message: 'Low password complexity'
  },
  {
    title: 'Only special characters - invalid',
    password: '!@#$%^&*()',
    negative: true,
    message: 'Low password complexity'
  },
  {
    title: 'Empty password - invalid',
    password: '',
    negative: true,
    isEmpty: true
  },
  {
    title: 'Spaces only - invalid',
    password: '     ',
    negative: true,
    message: 'This field is required.'
  },
  {
    title: 'Unusual length - 20 characters',
    password: 'Ab1#'.repeat(5),
    negative: false
  },
  {
    title: 'Unusual length - 255 characters',
    password: 'Ab1#'.repeat(63) + 'Ab1#',
    negative: false
  }
];

test.describe('Password field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/elements/input/passwd');
  });

  passwordTestCases.forEach(({ title, password, negative, message }) => {
    test(title, async ({ page }) => {
      await submitInput(page, password);
      if (negative) {
        await expectInvalidFeedback(page, message);
      } else {
        await expectResultVisible(page, password);
      }
    });
  });

  test('Input field has placeholder', async ({ page }) => {
    const inputField = await getInputField(page);
    const placeholder = await inputField.getAttribute('placeholder');
    expect(placeholder).toBe('Submit me');
  });

  test('Input field has password type', async ({ page }) => {
    const inputField = await getInputField(page);
    const type = await inputField.getAttribute('type');
    expect(type).toBe('password');
  });

  test('More than 20 characters should be trimmed', async ({ page }) => {
    const longPassword = 'Ab1#'.repeat(5) + 'a';
    const inputField = await getInputField(page);
    await inputField.fill(longPassword);
    await expect(inputField).toHaveValue(longPassword.slice(0, 20));
  });

  test('The Password text copy is not allowed', async ({ page }) => {
    const password = 'Abc123!@#';
    const inputField = await getInputField(page);
    await inputField.fill(password);
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.press('KeyC');
    await page.keyboard.up('Control');
    await page.goto('https://www.google.com');
    const googleInput = await page.locator('#APjFqb');
    await googleInput.click();
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyV');
    await page.keyboard.up('Control');
    await expect(googleInput).not.toHaveValue(password);
  });
});
