import { test, expect } from '@playwright/test';

/**
 * Responsive Viewport Test: Landing Page
 * 
 * Tests:
 * - Mobile viewport (≤360px)
 * - Desktop viewport (≥1024px)
 * - CTA visibility across viewports
 */
test.describe('Landing Page Responsive', () => {
  test('should render correctly on mobile viewport (360px)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('http://localhost:3000');

    // Check hero section is visible
    await expect(page.locator('text=Votação Inteligente')).toBeVisible();

    // Check CTA is visible (may be sticky/floating)
    await expect(page.locator('button:has-text("Entrar")')).toBeVisible();

    // Check benefits section
    await expect(page.locator('text=Segurança')).toBeVisible();
  });

  test('should render correctly on desktop viewport (1024px)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('http://localhost:3000');

    // Check all sections are visible
    await expect(page.locator('text=Votação Inteligente')).toBeVisible();
    await expect(page.locator('text=Segurança')).toBeVisible();
    await expect(page.locator('text=Como funciona')).toBeVisible();

    // Check CTA is visible
    await expect(page.locator('button:has-text("Entrar")')).toBeVisible();
  });

  test('should have CTA always visible (sticky/floating)', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // CTA should still be visible
    await expect(page.locator('button:has-text("Entrar")')).toBeVisible();
  });
});

