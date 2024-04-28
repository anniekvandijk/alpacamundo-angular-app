import { test, expect } from '@playwright/test';

test.describe('General tests', {
  tag: '@general-tests',
}, () => {
 
  test.beforeEach(async ({ page }) => {
      await page.goto('/');
  });

  test('Alpacamundo title is correct', 
  async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/Alpacamundo - Alpaca fokkerij/);
  });

});