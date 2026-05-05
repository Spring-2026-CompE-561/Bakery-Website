# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.integration.spec.ts >> Home page integration/unit tests >> shows featured products from backend
- Location: tests/home.integration.spec.ts:67:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('cake')
Expected: visible
Error: strict mode violation: getByText('cake') resolved to 3 elements:
    1) <p class="mx-auto mb-8 leading-relaxed">Filipino-inspired mini cakes baked fresh with lov…</p> aka getByText('Filipino-inspired mini cakes')
    2) <p>cake</p> aka getByText('cake', { exact: true })
    3) <p class="text-base md:text-lg mx-auto mb-7 leading-relaxed">A Filipino family bakery bringing the warmth of h…</p> aka getByText('A Filipino family bakery')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('cake')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - link "Seri Seri Sweets" [ref=e5] [cursor=pointer]:
          - /url: /
        - generic [ref=e6]:
          - generic [ref=e7]: "|"
          - generic [ref=e8]:
            - link "Home" [ref=e9] [cursor=pointer]:
              - /url: /
            - generic [ref=e10]: "|"
          - generic [ref=e11]:
            - link "Menu" [ref=e12] [cursor=pointer]:
              - /url: /menu
            - generic [ref=e13]: "|"
          - link "About" [ref=e15] [cursor=pointer]:
            - /url: /about
      - link [ref=e17] [cursor=pointer]:
        - /url: /checkout
        - img [ref=e18]
  - img [ref=e21]
  - main [ref=e23]:
    - generic [ref=e24]:
      - generic [ref=e25]:
        - img [ref=e27]
        - img [ref=e36]
        - img [ref=e45]
        - img [ref=e54]
        - img [ref=e63]
        - img [ref=e72]
        - generic [ref=e80]:
          - img
          - text: Freshly Baked to Order
        - heading "Seri-Seri Sweets" [level=1] [ref=e82]
        - paragraph [ref=e83]: Filipino-inspired mini cakes baked fresh with love. Order ahead for local pickup — taste a little piece of home.
        - link "Order Now →" [ref=e84] [cursor=pointer]:
          - /url: /menu
          - button "Order Now →" [ref=e85]
      - img [ref=e87]
      - generic [ref=e89]:
        - img [ref=e91]
        - img [ref=e97]
        - img [ref=e103]
        - generic [ref=e107]:
          - generic [ref=e108]:
            - img [ref=e110]
            - paragraph [ref=e113]: Freshly Baked
            - paragraph [ref=e114]: Every order made from scratch — never sitting on a shelf.
          - generic [ref=e115]:
            - img [ref=e117]
            - paragraph [ref=e119]: Made with Love
            - paragraph [ref=e120]: Filipino family recipes passed down through generations.
          - generic [ref=e121]:
            - img [ref=e123]
            - paragraph [ref=e126]: Local Pickup, Oahu
            - paragraph [ref=e127]: Pearl City pickup only. Fresh to your hands, same day.
      - img [ref=e129]
      - generic [ref=e131]:
        - paragraph [ref=e132]:
          - img [ref=e133]
          - text: Featured Items
          - img [ref=e136]
        - generic [ref=e139]:
          - generic [ref=e140]:
            - generic [ref=e141]:
              - img "cake" [ref=e142]
              - generic [ref=e144]:
                - img
                - text: Most Popular
            - generic [ref=e145]:
              - generic [ref=e146]:
                - paragraph [ref=e147]: cake
                - paragraph [ref=e148]: $4
              - paragraph [ref=e149]: hi hi
            - link "Order This" [ref=e151] [cursor=pointer]:
              - /url: /menu
              - button "Order This" [ref=e152]
          - generic [ref=e153]:
            - img "2" [ref=e155]
            - generic [ref=e156]:
              - generic [ref=e157]:
                - paragraph [ref=e158]: "2"
                - paragraph [ref=e159]: $2
              - paragraph [ref=e160]: "2"
            - link "Order This" [ref=e162] [cursor=pointer]:
              - /url: /menu
              - button "Order This" [ref=e163]
          - generic [ref=e164]:
            - img "1" [ref=e166]
            - generic [ref=e167]:
              - generic [ref=e168]:
                - paragraph [ref=e169]: "1"
                - paragraph [ref=e170]: $1
              - paragraph [ref=e171]: "1"
            - link "Order This" [ref=e173] [cursor=pointer]:
              - /url: /menu
              - button "Order This" [ref=e174]
        - link "See Full Menu" [ref=e176] [cursor=pointer]:
          - /url: /menu
          - button "See Full Menu" [ref=e177]
      - img [ref=e179]
      - generic [ref=e181]:
        - img [ref=e183]
        - img [ref=e191]
        - img [ref=e199]
        - img [ref=e207]
        - paragraph [ref=e214]: About Seri-Seri Sweets
        - paragraph [ref=e215]: A Filipino family bakery bringing the warmth of home to Oahu, Hawai'i — one mini cake at a time.
        - link "Our Story →" [ref=e216] [cursor=pointer]:
          - /url: /about
          - button "Our Story →" [ref=e217]
      - img [ref=e219]
      - generic [ref=e221]:
        - img [ref=e223]
        - img [ref=e232]
        - img [ref=e241]
        - img [ref=e249]
        - paragraph [ref=e256]: Contact & Pickup
        - generic [ref=e257]:
          - paragraph [ref=e258]:
            - img [ref=e259]
            - text: seriseri.sweets@gmail.com
          - paragraph [ref=e262]:
            - img [ref=e263]
            - text: (619) 679-6669
          - paragraph [ref=e265]:
            - img [ref=e266]
            - text: Pearl City, Hawai'i
          - paragraph [ref=e269]:
            - img [ref=e270]
            - emphasis [ref=e273]: Pickup hours coming soon
          - paragraph [ref=e274]:
            - strong [ref=e275]: Pickup Only
            - text: · Orders confirmed by owner
  - region "Notifications alt+T"
  - generic [ref=e276]:
    - img [ref=e278]
    - button "Open Tanstack query devtools" [ref=e326] [cursor=pointer]:
      - img [ref=e327]
  - img [ref=e376]
  - contentinfo [ref=e378]:
    - generic [ref=e379]:
      - generic [ref=e380]: Seri-Seri Sweets
      - generic [ref=e381]: "@instagram"
  - button "Open Next.js Dev Tools" [ref=e387] [cursor=pointer]:
    - img [ref=e388]
  - alert [ref=e391]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  4   | 
  5   | const mockProducts = [
  6   |   {
  7   |     id: 1,
  8   |     name: "Ube Mini Cake",
  9   |     description: "Soft ube cake with creamy frosting.",
  10  |     price: 12,
  11  |     picture_url: "https://placehold.co/400x300",
  12  |     badge: "Best Seller",
  13  |   },
  14  |   {
  15  |     id: 2,
  16  |     name: "Mango Mini Cake",
  17  |     description: "Fresh mango flavor.",
  18  |     price: 14,
  19  |     picture_url: "https://placehold.co/400x300",
  20  |     badge: "New",
  21  |   },
  22  |   {
  23  |     id: 3,
  24  |     name: "Chocolate Mini Cake",
  25  |     description: "Rich chocolate cake.",
  26  |     price: 10,
  27  |     picture_url: "https://placehold.co/400x300",
  28  |     badge: null,
  29  |   },
  30  |   {
  31  |     id: 4,
  32  |     name: "Extra Cake",
  33  |     description: "Should not appear on home page.",
  34  |     price: 99,
  35  |     picture_url: "https://placehold.co/400x300",
  36  |     badge: null,
  37  |   },
  38  | ];
  39  | 
  40  | test.describe("Home page integration/unit tests", () => {
  41  |   test.beforeEach(async ({ page }) => {
  42  |     await page.route("**/api/v1/products", async (route) => {
  43  |       await route.fulfill({
  44  |         status: 200,
  45  |         contentType: "application/json",
  46  |         body: JSON.stringify(mockProducts),
  47  |       });
  48  |     });
  49  |   });
  50  | 
  51  |   test("home page loads main content", async ({ page }) => {
  52  |     await page.goto("/");
  53  | 
  54  |     await expect(page.getByRole("heading", { name: "Seri-Seri Sweets" })).toBeVisible();
  55  |     await expect(page.getByText("Freshly Baked to Order")).toBeVisible();
  56  |     await expect(page.getByText("Filipino-inspired mini cakes")).toBeVisible();
  57  | 
  58  |     await expect(page.getByText("Local Pickup, Oahu")).toBeVisible();
  59  | 
  60  |     await expect(page.getByText("About Seri-Seri Sweets")).toBeVisible();
  61  |     await expect(page.getByText("Contact & Pickup")).toBeVisible();
  62  |     await expect(page.getByText("seriseri.sweets@gmail.com")).toBeVisible();
  63  |     await expect(page.getByText("(619) 679-6669")).toBeVisible();
  64  |     await expect(page.getByText("Pearl City, Hawai'i")).toBeVisible();
  65  |   });
  66  | 
  67  |   test("shows featured products from backend", async ({ page, request }) => {
  68  |     const response = await request.get(`${API_URL}/api/v1/products`);
  69  |     const products = await response.json();
  70  |     await page.goto("/");
  71  | 
  72  |     await expect(page.getByText("Featured Items")).toBeVisible();
  73  | 
> 74  |     await expect(page.getByText(products[0].name)).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  75  |     await expect(page.getByText(products[1].name)).toBeVisible();
  76  |     await expect(page.getByText(products[2].name)).toBeVisible();
  77  | 
  78  |     await expect(page.getByText(products[0].price).first()).toBeVisible();
  79  |     await expect(page.getByText(products[1].price).nth(1)).toBeVisible();
  80  |     await expect(page.getByText(products[2].price).nth(1)).toBeVisible();
  81  | 
  82  |     await expect(page.getByText("Extra Cake")).not.toBeVisible();
  83  |   });
  84  | 
  85  |   test("order buttons navigate to menu", async ({ page }) => {
  86  |     await page.goto("/");
  87  | 
  88  |     await page.getByRole("link", { name: "Order Now →" }).click();
  89  |     await expect(page).toHaveURL(/\/menu$/);
  90  |   });
  91  | 
  92  |   test("see full menu button navigates to menu", async ({ page }) => {
  93  |     await page.goto("/");
  94  | 
  95  |     await page.getByRole("link", { name: "See Full Menu" }).click();
  96  |     await expect(page).toHaveURL(/\/menu$/);
  97  |   });
  98  | 
  99  |   test("our story button navigates to about", async ({ page }) => {
  100 |     await page.goto("/");
  101 | 
  102 |     await page.getByRole("link", { name: "Our Story →" }).click();
  103 |     await expect(page).toHaveURL(/\/about$/);
  104 |   });
  105 | });
```