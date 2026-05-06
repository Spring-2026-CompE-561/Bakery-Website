import { test, expect } from "@playwright/test";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

test.describe("Menu integration", () => {
  test("backend products endpoint is reachable from test runner", async ({ request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);

    expect(response.ok()).toBeTruthy();

    const products = await response.json();
    test.skip(products.length <= 0, "Need a product");

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

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    const items = page.locator('[data-slot="card"]');

    await expect(items.nth(0)).toContainText(products[0].name);
  });

  test("first page renders up to 6 product cards", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    const cards = page.locator("[data-slot='card']");
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    expect(count).toBeLessThanOrEqual(6);
  });

  test("product names from backend are visible", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    const items = page.locator('[data-slot="card"]');

    for (const [i, product] of products.slice(0, products.length % 6).entries()) {
        await expect(items.nth(i)).toContainText(product.name);
    }
  });

  test("product prices from backend are visible", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    const firstPrice = String(products[0].price);
    await expect(page.getByText(firstPrice, { exact: false }).first()).toBeVisible();
  });

 test("product images load successfully", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    const cards = page.locator('[data-slot="card"]');
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const card = cards.nth(i);
        const image = card.locator("img");

        await expect(image).toBeVisible();

        const alt = await image.getAttribute("alt");
        const src = await image.getAttribute("src");

        expect(src, `Image missing src. alt=${alt}`).toBeTruthy();

        const loaded = await image.evaluate((img) => {
        const el = img as HTMLImageElement;

        return new Promise<boolean>((resolve) => {
            if (el.complete) {
            resolve(el.naturalWidth > 0);
            return;
            }

            el.addEventListener("load", () => resolve(el.naturalWidth > 0), {
            once: true,
            });

            el.addEventListener("error", () => resolve(false), {
            once: true,
            });
        });
        });

        expect(loaded, `Image failed. alt=${alt}, src=${src}`).toBeTruthy();
    }
   });

  test("next page button changes visible products", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 6, "Need more than 6 products for pagination");

    await page.goto("/menu");

    const items = page.locator('[data-slot="card"]');

    for (const [i, product] of products.slice(0, 6).entries()) {
        await expect(items.nth(i)).toContainText(product.name);
    }

    await page.getByRole("button", { name: "Next →" }).click();

    await expect(items.nth(0).getByText(products[6].name, { exact: true })).toBeVisible();
  });

  test("previous page button returns to first page", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    expect(response.ok()).toBeTruthy();

    const products = await response.json();

    test.skip(products.length <= 6, "Need more than 6 products for pagination");

    await page.goto("/menu");

    const items = page.locator('[data-slot="card"]')
    const card = items.locator('[data-slot="card-content"]');

    await expect(card.first()).toBeVisible();
    await expect(card.nth(0).getByText(products[0].name)).toBeVisible();

    await page.getByRole("button", { name: "Next →" }).click();

    await expect(card.nth(0).getByText(products[6].name)).toBeVisible();
    await expect(card.nth(0).getByText(products[0].name)).not.toBeVisible();

    await page.getByRole("button", { name: "← Prev" }).click();

    await expect(card.nth(0).getByText(products[0].name)).toBeVisible();
    await expect(card.nth(0).getByText(products[6].name)).not.toBeVisible();
 });

  test("prev button is disabled on first page", async ({ page }) => {
    await page.goto("/menu");

    await expect(page.getByRole("button", { name: "← Prev" })).toBeDisabled();
  });

  test("next button is disabled on last page", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    const totalPages = Math.max(1, Math.ceil(products.length / 6));

    if (totalPages > 1) {
        for (let i = 1; i < totalPages; i++) {
        await page.getByRole("button", { name: "Next →" }).click();
        }
    };
    

    await expect(page.getByRole("button", { name: "Next →" })).toBeDisabled();
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

    const items = page.locator('[data-slot="card"]');

    await page.getByRole("button", { name: /Page 1/i }).click();
    await page.getByRole("button", { name: /Page 2/i }).click();
    
    await expect(items.nth(0).getByText(products[0].name, { exact: true })).not.toBeVisible();
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

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    await page.locator('[data-slot="card"]').nth(0).click();

    await expect(page.getByText("Add To Cart")).toBeVisible();
  });


  test("modal closes", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    await page.locator('[data-slot="card"]').nth(0).click();
    await expect(page.getByText("Add To Cart")).toBeVisible();

    await page.getByRole('button').filter({ hasText: /^$/ }).first().click()
    await expect(page.getByText("Add To Cart")).toBeHidden();
  });

  test("modal quantity can increase", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    await page.locator('[data-slot="card"]').nth(0).click();

    await page.getByRole('button', { name: '+' }).click();

    await expect(page.locator('span').filter({ hasText: /^2$/ })).toBeVisible();
  });

  test("modal quantity can decrease", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");

    await page.goto("/menu");

    await page.locator('[data-slot="card"]').nth(0).click();

    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '-' }).click();

    await expect(page.locator('span').filter({ hasText: /^1$/ })).toBeVisible();
  });
});