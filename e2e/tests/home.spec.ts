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
    const link = content.getByRole('link', { name: 'Over ons' })
    const h1Element = page.locator('h1');

    // Act
    await link.click();

    // Assert
     await page.waitForURL(`${baseURL}/about`);
     await expect(h1Element).toHaveText('Over ons');
  });

  test('Link Onze alpaca\'s is working', async ({ page, baseURL  }) => {
    // Arrange
    const content = page.locator('#content-section');
    const link = content.getByRole('link', { name: 'Onze alpaca\'s' })
    const h1Element = page.locator('h1');

    // Act
    await link.click();

    // Assert
     await page.waitForURL(`${baseURL}/alpacas`);
     await expect(h1Element).toHaveText('Onze alpaca\'s');
  });

  test('Link fotoalbum is working', async ({ page }) => {
    // Arrange
    const content = page.locator('#content-section');
    const link = content.getByRole('link', { name: 'fotoalbum' })
    const tab2 = page.waitForEvent('popup');
    
    // Act
    await link.click();
    const page2 = await tab2;

    // Assert
    await expect(page2.getByRole('main')).toContainText('Alpaca\'s van Alpacamundo');

  });

  test('Link Over alpaca\'s is working', async ({ page, baseURL  }) => {
    // Arrange
    const content = page.locator('#content-section');
    const link = content.getByRole('link', { name: 'Over alpaca\'s' })
    const h1Element = page.locator('h1');

    // Act
    await link.click();

    // Assert
     await page.waitForURL(`${baseURL}/info`);
     await expect(h1Element).toHaveText('Over alpaca\'s');
  });

  test('Link verkoop is working', async ({ page, baseURL  }) => {
    // Arrange
    const content = page.locator('#content-section');
    const link = content.getByRole('link', { name: 'verkoop' })
    const h1Element = page.locator('h1');

    // Act
    await link.click();

    // Assert
     await page.waitForURL(`${baseURL}/alpacas/forsale`);
     await expect(h1Element).toHaveText('Alpaca\'s te koop');
  });

  test('Link contact is working', async ({ page, baseURL  }) => {
    // Arrange
    const content = page.locator('#content-section');
    const link = content.getByRole('link', { name: 'contact' })
    const h1Element = page.locator('h1');

    // Act
    await link.click();

    // Assert
     await page.waitForURL(`${baseURL}/contact`);
     await expect(h1Element).toHaveText('Contactgegevens');
  });

  test('Link School- en studieopdrachten is working', async ({ page, baseURL  }) => {
    // Arrange
    const content = page.locator('#content-section');
    const link = content.getByRole('link', { name: 'School- en studieopdrachten' })
    const h1Element = page.locator('h1');

    // Act
    await link.click();

    // Assert
     await page.waitForURL(`${baseURL}/students`);
     await expect(h1Element).toHaveText('School- en studieopdrachten');
  });

});

