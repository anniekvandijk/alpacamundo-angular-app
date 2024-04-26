import { test, expect } from '@playwright/test';
import { environment } from 'src/environments/environment';

test.describe('Homepage', {
  tag: '@Homepage',
}, () => {
 
  test.beforeEach(async ({ page }) => {
    await page.goto(environment.baseUri);
  });

  test('Alpacamundo title is correct', 
  async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/Alpacamundo - Alpaca fokkerij/);
  }); 

  test('H1 visible and correct', async ({ page }) => {
    // Assert 
    const h1Element = await page.locator('h1');
    await expect(h1Element).toBeVisible();
    await expect(h1Element).toHaveText('Alpacamundo');
  });

  test('Link Over ons is working', async ({ page }) => {
    const content = await page.locator('#content-section');

    const overOns = await content.getByRole('link', { name: 'Over ons' })
    await overOns.click();
    expect(page.url()).toBe(`${environment.baseUri}/about`);
    const h1Element = await page.locator('h1');
    await expect(h1Element).toHaveText('Over Ons');

  });
});

