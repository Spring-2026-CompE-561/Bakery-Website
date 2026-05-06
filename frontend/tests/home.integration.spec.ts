import { test, expect } from "@playwright/test";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const mockProducts = [
  {
    id: 1,
    name: "Ube Mini Cake",
    description: "Soft ube cake with creamy frosting.",
    price: 12,
    picture_url: "https://placehold.co/400x300",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Mango Mini Cake",
    description: "Fresh mango flavor.",
    price: 14,
    picture_url: "https://placehold.co/400x300",
    badge: "New",
  },
  {
    id: 3,
    name: "Chocolate Mini Cake",
    description: "Rich chocolate cake.",
    price: 10,
    picture_url: "https://placehold.co/400x300",
    badge: null,
  },
  {
    id: 4,
    name: "Extra Cake",
    description: "Should not appear on home page.",
    price: 99,
    picture_url: "https://placehold.co/400x300",
    badge: null,
  },
];

test.describe("Home page integration/unit tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/v1/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockProducts),
      });
    });
  });

  test("home page loads main content", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Seri-Seri Sweets" })).toBeVisible();
    await expect(page.getByText("Freshly Baked to Order")).toBeVisible();
    await expect(page.getByText("Filipino-inspired mini cakes")).toBeVisible();

    await expect(page.getByText("Local Pickup, Oahu")).toBeVisible();

    await expect(page.getByText("About Seri-Seri Sweets")).toBeVisible();
    await expect(page.getByText("Contact & Pickup")).toBeVisible();
    await expect(page.getByText("seriseri.sweets@gmail.com")).toBeVisible();
    await expect(page.getByText("(619) 679-6669")).toBeVisible();
    await expect(page.getByText("Pearl City, Hawai'i")).toBeVisible();
  });

  test("shows featured products from backend", async ({ page, request }) => {
    const response = await request.get(`${API_URL}/api/v1/products`);
    const products = await response.json();

    test.skip(products.length <= 0, "Need a product");
    const count = Math.min(products.length, 3);

    await page.goto("/");

    await expect(page.getByText("Featured Items", { exact: true })).toBeVisible();

    for (const [i, product] of products.slice(0, count).entries()) {
     await expect(page.getByText(product.name)).toBeVisible();
     await expect(page.getByText('$').nth(i)).toBeVisible();
   }

    await expect(page.getByText("asdlkfjsdlakfjdslkfjdsalkj")).not.toBeVisible();
  });

  test("order buttons navigate to menu", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Order Now →" }).click();
    await expect(page).toHaveURL(/\/menu$/);
  });

  test("see full menu button navigates to menu", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "See Full Menu" }).click();
    await expect(page).toHaveURL(/\/menu$/);
  });

  test("our story button navigates to about", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Our Story →" }).click();
    await expect(page).toHaveURL(/\/about$/);
  });
});