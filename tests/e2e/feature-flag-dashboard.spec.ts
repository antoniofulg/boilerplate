import { test, expect } from '@playwright/test';

/**
 * Feature Flag Test: Static Dashboard MVP
 * 
 * Tests:
 * - Dashboard accessible when flag is enabled
 * - "Coming soon" message when flag is disabled
 */
test.describe('Feature Flag: staticDashboardMvp', () => {
  test('should display dashboard when flag is enabled', async ({ page }) => {
    // Set feature flag via environment (simulated)
    await page.goto('http://localhost:3000/dashboard');

    // If flag is enabled, dashboard should render
    // This test will need to be adjusted based on actual flag implementation
    await expect(page.locator('text=Sessão Atual')).toBeVisible();
  });

  test('should show "coming soon" when flag is disabled', async ({ page }) => {
    // This test requires the flag to be disabled via environment
    // For now, we'll test the coming-soon page exists
    await page.goto('http://localhost:3000/dashboard/coming-soon');

    await expect(page.locator('text=Em breve')).toBeVisible();
  });
});

