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
  const resultTitle = page.getByText('Your input was:');
  await expect(resultTitle).toBeVisible();
  await expect(page.getByText(text)).toBeVisible();
}

export async function expectInvalidFeedback(page, message) {
  const feedback = await page.locator('.invalid-feedback');
  await expect(feedback).toBeVisible();
  await expect(feedback).toHaveText(message);
}


  
  async function submitPassword(page, text) {
    const passwordField = await getPasswordField(page);
    await passwordField.fill(text);
    await passwordField.press('Enter');
    return passwordField;
  }
  
  async function expectResultVisible(page, text) {
    const resultTitle = page.getByText('Your input was:');
    await expect(resultTitle).toBeVisible();
    await expect(page.getByText(text)).toBeVisible();
  }
  
  async function expectInvalidFeedback(page, message) {
    const feedback = await page.locator('.invalid-feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveText(message);
  }
  
module.exports = {
    getInputField,
    submitInput,
    expectResultVisible,
    submitPassword,
    expectResultVisible,
    expectInvalidFeedback
  };