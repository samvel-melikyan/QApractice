import { test, expect } from '@playwright/test';
import { 
  getInputField, 
  submitInput,
  expectResultVisible, 
  expectInvalidFeedback 
} from '../utils/formUtils.js';

const testCaseData = [
  {
    title: 'Valid email - meets all criteria',
    text: 'user@example.com',
    negative: false
  },
  {
    title: 'LocalHost domain allowed',
    text: 'user@localhost',
    negative: false
  },
  {
    title: 'OtherHost domain - invalid',
    text: 'user@otherhost',
    negative: true
  },
  {
    title: 'Without domain address - invalid',
    text: 'user@',
    negative: true
  },
  {
    title: 'Without @ sign - invalid',
    text: 'user.com',
    negative: true
  },
  {
    title: 'Without Top Level Domain - invalid',
    text: 'user@example',
    negative: true
  },
  {
    title: 'With space between - invalid',
    text: 'user @example.com',
    negative: true
  },
  {
    title: 'With Cyrillic characters - invalid',
    text: 'Пользователь@пример.com',
    negative: true
  },
  {
    title: 'With special characters - invalid',
    text: 'user@exa!mple.com',
    negative: true
  },
  {
    title: 'Too short - invalid',
    text: 'a@b.c',
    negative: true
  },
  {
    title: 'Too long - invalid',
    text: 'a'.repeat(65) + '@' + 'b'.repeat(190) + '.com',
    negative: true
  },
  {
    title: 'Empty field - invalid',
    text: '',
    negative: true,
    required: true
  },
  {
    title: 'Spaces only - invalid',
    text: '     ',
    negative: true,
    required: true
  },
  {
    title: 'With dot before @ - invalid',
    text: 'user.@example.com',
    negative: true
  },
  {
    title: 'With dot before domain - invalid',
    text: 'user@example..com',
    negative: true
  },
  {
    title: 'With dot before TLD - invalid',
    text: 'user@example.c..om',
    negative: true
  },
  {
    title: 'With multiple @ - invalid',
    text: 'user@@example.com',
    negative: true
  },
  {
    title: 'Withot username - invalid',
    text: '@example.com',
    negative: true
  },
  {
    title: 'Uppercase letters allowed',
    text: 'User@example.com',
    negative: false
  }
];

test.describe('Email field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/elements/input/email');
  });

  test('Input field has placeholder', async ({ page }) => {
    const inputField = await getInputField(page);
    const placeholder = await inputField.getAttribute('placeholder');
    expect(placeholder).toBe('Submit me');
  });

  testCaseData.forEach(({ title, text, negative, required }) => {
    test(title, async ({ page }) => {
      await submitInput(page, text);
      if (required && text.trim() === '') {
        await expectInvalidFeedback(page, 'This field is required.');
      } else if (negative) {
        await expectInvalidFeedback(page, 'Enter a valid email address.');
      } else {
        await expectResultVisible(page, text);
      }
    });
  });
});
