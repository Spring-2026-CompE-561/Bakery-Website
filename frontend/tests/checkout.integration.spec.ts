import { test, expect } from "@playwright/test";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

test.describe("Checkout integration", () => {
  test("checkout page loads", async ({ page }) => {
    await page.goto("/checkout");

    await expect(page).toHaveURL(/\/checkout/);
  });

  test("backend is reachable from test runner", async ({ request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test("checkout can submit an order to backend", async ({ page }) => {
    await page.goto("/menu");
    await page.locator('[data-slot="card"]').nth(0).click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    await page.goto("/checkout");

    await page.getByRole('textbox', { name: 'Jane Smith' }).fill('Test Customer');
    await page.getByRole('textbox', { name: 'jane@example.com' }).fill('test@test.com');
    await page.getByRole('textbox', { name: '(555) 000-' }).fill('6191234567');

    await page.getByRole('button', { name: 'Place Order' }).click();

    await expect(
      page.getByText('Order placed! We\'ll be in')).toBeVisible();
  });

  test("real backend order endpoint responds", async ({ request }) => {
    const response = await request.post(`${API_URL}/api/v1/orders`, {
      data: {
        customer_name: "Integration Test",
        customer_email: "integration@example.com",
        customer_phone: "8085551234",
        items: [
          {
            product_id: 1,
            quantity: 1,
          },
        ],
      },
    });

    expect([200, 201, 422]).toContain(response.status());
  });
});