import { test, expect } from '@playwright/test';

/**
 * E2E Test: Logout and Disabled Menu Items
 * 
 * Tests:
 * - Logout functionality
 * - Disabled menu items don't navigate
 */
test.describe('Logout and Disabled Menu', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="emailInstitucional"]', 'mesa@camara.gov.br');
    await page.fill('input[name="senha"]', 'senha123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should logout and redirect to login', async ({ page }) => {
    // Click logout button
    await page.click('button:has-text("Sair")');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);

    // Should not be able to access dashboard
    await page.goto('http://localhost:3000/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should not navigate when clicking disabled menu items', async ({ page }) => {
    // Try to click disabled menu items
    const disabledItems = ['Sessões', 'Pautas', 'Relatórios', 'Configurações'];

    for (const item of disabledItems) {
      const menuItem = page.locator(`text=${item}`);
      await expect(menuItem).toBeVisible();

      // Click should not navigate
      const currentUrl = page.url();
      await menuItem.click();
      await expect(page).toHaveURL(currentUrl);
    }
  });
});

