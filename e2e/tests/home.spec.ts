import { test, expect } from '@playwright/test';

test.describe('Page Home tests', {
  tag: '@page-home',
}, () => {
 
  test.beforeEach(async ({ page }) => {
      await page.goto('/');
  });

  test('Alpacamundo title is correct', 
  async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/Alpacamundo - Alpaca fokkerij/);
  }); 

  test('H1 header should be visible and have text Alpacamundo', async ({ page }) => {
    // Arrange 
    const h1Element = page.locator('h1');

    // Expect
    await expect(h1Element).toBeVisible();
    await expect(h1Element).toHaveText('Alpacamundo');
  });

  test('Link Over ons is working', async ({ page, baseURL  }) => {
    // Arrange
    const content = page.locator('#content-section');
    const overOns = content.getByRole('link', { name: 'Over ons' })
    const h1Element = page.locator('h1');

    // Act
    await overOns.click();

    // Assert
     await page.waitForURL(`${baseURL}/about`);
     await expect(h1Element).toHaveText('Over Ons');
  });
});

