import { expect } from '@playwright/test';

export async function getInputField(page) {
  return await page.getByPlaceholder('Submit me');
}

export async function submitInput(page, text) {
  const inputField = await getInputField(page);
  await inputField.fill(text);
  await expect(inputField).toHaveValue(text);
  await inputField.press('Enter');
  return inputField;
}

export async function expectResultVisible(page, text) {
  await expect(page.getByPlaceholder('Submit me')).toHaveValue('');
  const resultTitle = page.getByText('Your input was:');
  await expect(resultTitle).toBeVisible();
  await expect(page.getByText(text)).toBeVisible();
}

export async function expectInvalidFeedback(page, message) {
  const feedback = await page.locator('.invalid-feedback');
  await expect(feedback).toBeVisible();
  await expect(feedback).toHaveText(message);
}

