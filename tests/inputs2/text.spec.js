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

  test('Input field contains value after blur', async ({ page }) => {
    const inputField = await getInputField(page);
    const text = 'John Doe';
    await inputField.fill(text);
    await inputField.evaluate(el => el.dispatchEvent(new Event('blur')));
    await expect(inputField).toHaveValue(text);
  });

  const cases = [
    {
      title: 'Valid: specific symbols with spaces',
      text: 'John-Doe-1967 _777_',
    },
    {
      title: 'Valid: specific symbols without spaces',
      text: 'John-Doe-1967_777_',
    },
    {
      title: 'Valid: 25 characters',
      text: 'a'.repeat(25),
    },
    {
      title: 'Valid: numbers only',
      text: '1234567890',
    },
    {
      title: 'Valid: 2 characters',
      text: 'aa',
    },
    {
      title: 'Invalid: only special characters',
      text: '!@#$%^&*()_+',
      errorMessage: 'Enter a valid string consisting of letters, numbers, underscores or hyphens.',
    },
    {
      title: 'Invalid: empty input',
      text: '',
      customCheck: async (page) => {
        const result = page.getByText('Your input was:');
        await expect(result).not.toBeVisible();
      },
    },
    {
      title: 'Invalid: only spaces',
      text: ' ',
      errorMessage: 'This field is required.',
    },
    {
      title: 'Invalid: Cyrillic',
      text: 'Привет мир',
      errorMessage: 'Enter a valid string consisting of letters, numbers, underscores or hyphens.',
    },
    {
      title: 'Invalid: English + Cyrillic',
      text: 'Hello мир',
      errorMessage: 'Enter a valid string consisting of letters, numbers, underscores or hyphens.',
    },
    {
      title: 'Invalid: Cyrillic + English',
      text: 'мир Hello',
      errorMessage: 'Enter a valid string consisting of letters, numbers, underscores or hyphens.',
    },
    {
      title: 'Invalid: 1 character',
      text: 'a',
      errorMessage: 'Please enter 2 or more characters',
    },
    {
      title: 'Invalid: 26 characters',
      text: 'a'.repeat(26),
      errorMessage: 'Please enter no more than 25 characters',
    },
  ];

  for (const { title, text, errorMessage, customCheck } of cases) {
    test(title, async ({ page }) => {
      await submitInput(page, text);

      if (customCheck) {
        await customCheck(page);
      } else if (errorMessage) {
        await expectInvalidFeedback(page, errorMessage);
      } else {
        await expectResultVisible(page, text);
      }
    });
  }
});
