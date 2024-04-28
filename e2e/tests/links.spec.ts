import { test, expect } from '@playwright/test';

test.describe('Links tests', {
  tag: '@links-tests @mocked',
}, () => {
 
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR ('./../hars/links/links.zip', {
        url: '*/**/api/links',
        update: true,
    });
    await page.goto('/links');
  });

  test('Links are visible', async ({ page }) => {
    // Assert
    await expect(page.locator('h1')).toHaveText('Links');
  });
});