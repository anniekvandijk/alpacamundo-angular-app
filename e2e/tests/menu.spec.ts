import { test, expect } from '@playwright/test';

test.describe('Menu navigation tests', {
  tag: '@menu-tests',
}, () => {
 
  test.beforeEach(async ({ page }) => {
      await page.goto('/');
  });

  test('Menu link Over ons is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Over ons' })
    const submenulink = page.getByRole('menuitem', { name: 'Over ons' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/about`);
     await expect(h1Element).toHaveText('Over ons');
  });

  test('Menu link School- en studieopdrachten is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Over ons' })
    const submenulink = page.getByRole('menuitem', { name: 'School- en studie opdrachten' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/students`);
     await expect(h1Element).toHaveText('School- en studieopdrachten');
  });

  test('Menu link Onze alpaca\'s is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Onze alpaca\'s' })
    const submenulink = page.getByRole('menuitem', { name: 'Onze alpaca\'s' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/alpacas`);
     await expect(h1Element).toHaveText('Onze alpaca\'s');
  });

  test('Menu link Onze cria\'s is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Onze alpaca\'s' })
    const submenulink = page.getByRole('menuitem', { name: 'Onze cria\'s (veulens)' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/alpacas/crias`);
     await expect(h1Element).toHaveText('Onze cria\'s hier geboren');
  });

  test('Menu link Fotoalbum is working', async ({ page }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Onze alpaca\'s' })
    const submenulink = page.getByRole('menuitem', { name: 'Fotoalbum (Google)' })
    const tab2 = page.waitForEvent('popup');

    // Act
    await menulink.hover();
    await submenulink.click();
    const page2 = await tab2;

    // Assert
    await expect(page2.getByRole('main')).toContainText('Alpaca\'s van Alpacamundo');
    
  });

  test('Menu link Alpaca\'s te koop is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Verkoop' })
    const submenulink = page.getByRole('menuitem', { name: 'Alpaca\'s te koop' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/alpacas/forsale`);
     await expect(h1Element).toHaveText('Alpaca\'s te koop');
  });

  test('Menu link Alpaca\'s verkocht is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Verkoop' })
    const submenulink = page.getByRole('menuitem', { name: 'Alpaca\'s verkocht' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/alpacas/sold`);
     await expect(h1Element).toHaveText('Alpaca\'s verkocht');
  });

  test('Menu link Voorwaarden en garantie - verkoop - is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Verkoop' })
    const submenulink = page.getByRole('menuitem', { name: 'Voorwaarden en garantie' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/warranty`);
     await expect(h1Element).toHaveText('Voorwaarden en garantie');
  });

  test('Menu link Onze dekhengsten is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Dekservice' })
    const submenulink = page.getByRole('menuitem', { name: 'Onze dekhengsten' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/alpacas/studservice`);
     await expect(h1Element).toHaveText('Dekhengsten');
  });

  test('Menu link Voorwaarden en garantie - dekservice - is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Dekservice' })
    const submenulink = page.getByRole('menuitem', { name: 'Voorwaarden en garantie' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.hover();
    await submenulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/warranty`);
     await expect(h1Element).toHaveText('Voorwaarden en garantie');
  });

  test('Menu link Over alapca\'s is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Over alpaca\'s' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/info`);
     await expect(h1Element).toHaveText('Over alpaca\'s');
  });

  test('Menu link Contact is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Contact' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/contact`);
     await expect(h1Element).toHaveText('Contactgegevens');
  });

  test('Menu link Links is working', async ({ page, baseURL  }) => {
    
    // Arrange
    const menu = page.locator('#main-menu');
    const menulink = menu.getByRole('button', { name: 'Links' })
    const h1Element = page.locator('h1');

    // Act
    await menulink.click();

    // Assert
     await page.waitForURL(`${baseURL}/links`);
     await expect(h1Element).toHaveText('Links');
  });
});
