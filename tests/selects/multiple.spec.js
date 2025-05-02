import { test, expect } from '@playwright/test';


test.describe('Multiple select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/elements/select/mult_select');  
  });

  test('Multiple select', async ({ page }) => {
    const whereToGo = page.locator('#id_choose_the_place_you_want_to_go');
    await whereToGo.click();
    const whereToGoOptions = await whereToGo.locator('option').allTextContents();

    const howToGo = page.locator('#id_choose_how_you_want_to_get_there');
    await howToGo.click();
    const howToGoOptions = await howToGo.locator('option').allTextContents();

    const whenToGo = page.locator('#id_choose_when_you_want_to_go');
    await whenToGo.click();
    const whenToGoOptions = await whenToGo.locator('option').allTextContents();
    const data = generateMinimalCoverage(whereToGoOptions, howToGoOptions, whenToGoOptions);
    
    for (let obj of data) {
        await whereToGo.selectOption(obj.place);
        await howToGo.selectOption(obj.how);
        await whenToGo.selectOption(obj.when);
        const button = page.locator('#submit-id-submit');
        await button.click();
        const result = page.locator('#result-text');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(`to go by ${obj.how} to the ${obj.place} ${obj.when}`.toLowerCase());
    }
   
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



function generateMinimalCoverage(placeOptions, howOptions, whenOptions) {
    const cleanedPlaces = placeOptions.filter(Boolean);
    const cleanedHows = howOptions.filter(Boolean);
    const cleanedWhens = whenOptions.filter(Boolean);
  
    const maxLength = Math.max(cleanedPlaces.length, cleanedHows.length, cleanedWhens.length);
    const result = [];
  
    for (let i = 0; i < maxLength; i++) {
      const place = cleanedPlaces[i % cleanedPlaces.length];
      const how = cleanedHows[i % cleanedHows.length];
      const when = cleanedWhens[i % cleanedWhens.length];
      result.push({ place, how, when });
    }
    return result;
  }
  
  
  
