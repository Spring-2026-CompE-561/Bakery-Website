import { test, expect } from "@playwright/test";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

test.describe("Admin integration", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/login");

        await page.getByLabel("Admin Email").fill("admin@bakery.com");
        await page.getByLabel("Password").fill("bakery_password_2026");

        await page.getByRole("button", { name: "Sign in" }).click();

        // wait until login completes
        await expect(page).toHaveURL(/admin|dashboard/);
    });

    test("dashboard loads", async ({ page }) => {
        await expect(page.getByText("Active Orders")).toBeVisible();
        await expect(page.getByRole("link", { name: "View Orders" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Manage Menu" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Go to Settings" })).toBeVisible();
    });

    test("can navigate between admin pages", async ({ page }) => {
        await page.getByRole("link", { name: "View Orders" }).click();
        await expect(page).toHaveURL(/admin\/orders/);

        await page.getByRole("link", { name: "Dashboard" }).nth(1).click();
        await expect(page.getByText("Active Orders")).toBeVisible();

        await page.getByRole("link", { name: "Manage Menu" }).click();
        await expect(page).toHaveURL(/admin\/products|admin\/menu/);

        await page.getByRole("link", { name: "Dashboard" }).nth(1).click();
        await expect(page.getByText("Active Orders")).toBeVisible();

        await page.getByRole("link", { name: "Go to Settings" }).click();
        await expect(page).toHaveURL(/admin\/settings/);
    });

    test("can toggle product availability", async ({ page, request }) => {
        const response = await request.get(`${API_URL}/api/v1/products`);
        expect(response.ok()).toBeTruthy();
    
        const products = await response.json();
    
        test.skip(products.length <= 6, "Need more than 6 products for pagination");
        
        await page.getByRole("link", { name: "Products" }).click();

        const rows = page.locator('[data-slot="table-row"]');

        // skips header row
        const row = rows.nth(1);

        await expect(row).toBeVisible();

        const toggle = row.locator('[role="switch"], [data-slot="switch"], button[aria-checked]');

        await expect(toggle).toBeVisible();

        const before = await toggle.getAttribute("aria-checked");

        await toggle.click();

        await expect(toggle).not.toHaveAttribute("aria-checked", before ?? "");

        // restore state
        await toggle.click();
    });

    test("can open and close order details", async ({ page }) => {
        await page.getByRole("link", { name: "Orders" }).nth(1).click();

        await page.getByRole("cell", { name: "#1", exact: true }).click();

        await expect(page.getByRole("dialog")).toBeVisible();

        await page.getByRole("button", { name: "Close" }).click();

        await expect(page.getByRole("dialog")).not.toBeVisible();
    });

    test("can sort orders", async ({ page }) => {
    await page.getByRole("link", { name: "Orders" }).nth(1).click();

    const sortDropdown = page.getByRole("combobox").first();

        await sortDropdown.click();
        await page.getByText("Oldest Created").click();
        await expect(page.getByRole("combobox").first()).toContainText("Oldest Created");

        await page.getByRole("combobox").first().click();
        await page.getByText("Soonest Pickup").click();
        await expect(page.getByRole("combobox").first()).toContainText("Soonest Pickup");

        await page.getByRole("combobox").first().click();
        await page.getByText("Newest Created").click();
        await expect(page.getByRole("combobox").first()).toContainText("Newest Created");
    });

    test("view live site opens public site", async ({ page }) => {
        const popupPromise = page.waitForEvent("popup");

        await page.getByRole("link", { name: "View Live Site" }).click();

        const publicPage = await popupPromise;
        await expect(publicPage).toHaveURL("/");
    });

    test("can create a product", async ({ page }) => {
        await page.getByRole("link", { name: "Products" }).click();

        const productName = `Bob-${Date.now()}`;

        await page.getByRole("button", { name: "Add Product" }).click();

        await page.getByRole("textbox", { name: "Product Name" }).fill(productName);
        await page.getByRole("spinbutton", { name: "Price ($)" }).fill("400");
        await page.getByRole("textbox", { name: "Badge (Optional)" }).fill("Vegan");
        await page.getByRole("textbox", { name: "Description" }).fill("This is Bob");

        await page
        .getByRole("textbox", { name: "Picture URL (Direct Link)" })
        .fill("https://placehold.co/300x300.jpg");

        await page.getByRole("button", { name: "Create Product" }).click();

        await expect(page.locator("[data-slot='table-cell']").last()).toBeVisible();
    });

    // test("can delete a product", async ({ page, request }) => {
    //     const response = await request.get(`${API_URL}/api/v1/products`);
    //     const products = await response.json();

    //     test.skip(products.length <= 0, "Need a product");

    //     await page.getByRole("link", { name: "Products" }).click();

        
    // });

});