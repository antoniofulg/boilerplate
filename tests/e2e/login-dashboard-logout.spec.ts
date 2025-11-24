import { test, expect } from '@playwright/test';

/**
 * Essential E2E Test: Login → Dashboard → Logout
 * 
 * Covers:
 * - Valid login flow
 * - Invalid credentials
 * - Dashboard rendering
 * - Logout functionality
 */
test.describe('Login → Dashboard → Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  test('should login with valid credentials and display dashboard', async ({ page }) => {
    // Fill login form
    await page.fill('input[name="emailInstitucional"]', 'mesa@camara.gov.br');
    await page.fill('input[name="senha"]', 'senha123');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify dashboard content
    await expect(page.locator('text=Sessão Atual')).toBeVisible();
    await expect(page.locator('text=Pauta em votação')).toBeVisible();
    await expect(page.locator('text=Membros Presentes')).toBeVisible();
    await expect(page.locator('text=Resultados Recentes')).toBeVisible();
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    // Fill login form with invalid credentials
    await page.fill('input[name="emailInstitucional"]', 'invalid@example.com');
    await page.fill('input[name="senha"]', 'wrongpassword');

    // Submit form
    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.locator('text=Credenciais inválidas')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test('should logout and redirect to login', async ({ page }) => {
    // Login first
    await page.fill('input[name="emailInstitucional"]', 'mesa@camara.gov.br');
    await page.fill('input[name="senha"]', 'senha123');
    await page.click('button[type="submit"]');

    // Wait for dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Click logout button
    await page.click('button:has-text("Sair")');

    // Verify redirect to login
    await expect(page).toHaveURL(/\/login/);

    // Verify session is cleared (cannot access dashboard)
    await page.goto('http://localhost:3000/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});

