import { test, expect } from "@playwright/test";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

test.describe("Menu integration", () => {
  test("backend products endpoint is reachable from test runner", async ({ request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);

    expect(response.ok()).toBeTruthy();

    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
  });

  test("menu page loads", async ({ page }) => {
    await page.goto("/menu");

    await expect(page).toHaveURL(/\/menu/);
  });

  test("first backend product appears on frontend", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    const firstProductName = products[0].name;

    await page.goto("/menu");

    await expect(page.getByText(firstProductName)).toBeVisible();
  });

  test("first page renders up to 6 product cards", async ({ page }) => {
    await page.goto("/menu");

    const cards = page.locator("[data-slot='card']");
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    expect(count).toBeLessThanOrEqual(6);
  });

  test("product names from backend are visible", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    await page.goto("/menu");

    for (const product of products.slice(0, 3)) {
      await expect(page.getByText(product.name)).toBeVisible();
    }
  });

  test("product prices from backend are visible", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    await page.goto("/menu");

    const firstPrice = String(products[0].price);
    await expect(page.getByText(firstPrice, { exact: false }).first()).toBeVisible();
  });

  test("product images load successfully", async ({ page }) => {
    await page.goto("/menu");

    const images = page.locator("[data-slot='card'] img");
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const image = images.nth(i);

      await expect(image).toBeVisible();

      const naturalWidth = await image.evaluate((img) => {
        return (img as HTMLImageElement).naturalWidth;
      });

      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test("next page button changes visible products", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 6, "Need more than 6 products for pagination");

    await page.goto("/menu");

    await expect(page.getByText(products[0].name)).toBeVisible();

    await page.getByRole("button", { name: "Next Page" }).click();

    await expect(page.getByText(products[6].name)).toBeVisible();
  });

  test("previous page button returns to first page", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 6, "Need more than 6 products for pagination");

    await page.goto("/menu");

    await page.getByRole("button", { name: "Next Page" }).click();
    await expect(page.getByText(products[6].name)).toBeVisible();

    await page.getByRole("button", { name: "Prev Page" }).click();
    await expect(page.getByText(products[0].name)).toBeVisible();
  });

  test("prev button is disabled on first page", async ({ page }) => {
    await page.goto("/menu");

    await expect(page.getByRole("button", { name: "Prev Page" })).toBeDisabled();
  });

  test("next button is disabled on last page", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    await page.goto("/menu");

    const totalPages = Math.max(1, Math.ceil(products.length / 6));

    if (totalPages > 1) {
        for (let i = 1; i < totalPages; i++) {
        await page.getByRole("button", { name: "Next Page" }).click();
        }
    };

    await expect(page.getByRole("button", { name: "Next Page" })).toBeDisabled();
  });

  test("page dropdown opens", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();
    await page.goto("/menu");

    test.skip(products.length <= 6, "Need more than 6 products for pagination");

    await page.getByRole("button", { name: "Page 1"}).click();

    await expect(page.getByText("Page 2")).toBeVisible();
  });

  test("page dropdown can select another page", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 6, "Need more than 6 products for page dropdown");

    await page.goto("/menu");

    await page.getByRole("button", { name: /page 1/i }).click();
    await page.getByRole("button", { name: /page 2/i }).click();

    await expect(page.getByText(products[6].name)).toBeVisible();
  });

  test("page dropdown closes after selecting a page", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 6, "Need more than 6 products for page dropdown");

    await page.goto("/menu");

    await page.getByRole("button", { name: /page 1/i }).click();
    await page.getByRole("button", { name: /page 2/i }).click();

    await expect(page.getByRole("button", { name: /page 1/i })).not.toBeVisible();
  });


  test("clicking product opens modal", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    await page.goto("/menu");

    await page.getByText(products[0].name).click();

    await expect(page.getByText("Add To Cart")).toBeVisible();
  });


  test("modal closes", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    await page.goto("/menu");

    await page.getByText(products[0].name).click();
    await expect(page.getByText("Add To Cart")).toBeVisible();

    await page.getByRole('button').filter({ hasText: /^$/ }).first().click()
    await expect(page.getByText("Add To Cart")).toBeHidden();
  });

  test("modal quantity can increase", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    await page.goto("/menu");

    await page.getByText(products[0].name).click();

    await page.getByRole('button', { name: '+' }).click();

    await expect(page.locator('span').filter({ hasText: /^2$/ })).toBeVisible();
  });

  test("modal quantity can decrease", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    await page.goto("/menu");

    await page.getByText(products[0].name).click();

    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '-' }).click();

    await expect(page.getByText('1').nth(4)).toBeVisible();
  });
});