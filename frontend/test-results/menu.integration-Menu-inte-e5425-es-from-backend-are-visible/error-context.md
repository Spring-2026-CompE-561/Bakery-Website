# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: menu.integration.spec.ts >> Menu integration >> product names from backend are visible
- Location: tests/menu.integration.spec.ts:43:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('2')
Expected: visible
Error: strict mode violation: getByText('2') resolved to 3 elements:
    1) <p>2</p> aka getByText('2').first()
    2) <p>$2</p> aka getByText('$2')
    3) <p>2</p> aka getByText('2').nth(2)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('2')

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
    - main [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - button "Page 1" [ref=e29]
            - generic [ref=e30]:
              - button "◀" [disabled]
              - button "▶" [ref=e31]
          - heading "View Our Tasty Products!" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - img "cake" [ref=e36]
            - generic [ref=e37]:
              - generic [ref=e38]:
                - paragraph [ref=e39]: cake
                - paragraph [ref=e40]: $4
              - paragraph [ref=e41]: hi hi
          - generic [ref=e43]:
            - img "2" [ref=e45]
            - generic [ref=e46]:
              - generic [ref=e47]:
                - paragraph [ref=e48]: "2"
                - paragraph [ref=e49]: $2
              - paragraph [ref=e50]: "2"
          - generic [ref=e52]:
            - img "1" [ref=e54]
            - generic [ref=e55]:
              - generic [ref=e56]:
                - paragraph [ref=e57]: "1"
                - paragraph [ref=e58]: $1
              - paragraph [ref=e59]: "1"
          - generic [ref=e61]:
            - img "3" [ref=e63]
            - generic [ref=e64]:
              - generic [ref=e65]:
                - paragraph [ref=e66]: "3"
                - paragraph [ref=e67]: $3
              - paragraph [ref=e68]: "3"
          - generic [ref=e70]:
            - img "4" [ref=e72]
            - generic [ref=e73]:
              - generic [ref=e74]:
                - paragraph [ref=e75]: "4"
                - paragraph [ref=e76]: $4
              - paragraph [ref=e77]: "4"
          - generic [ref=e79]:
            - img "5" [ref=e81]
            - generic [ref=e82]:
              - generic [ref=e83]:
                - paragraph [ref=e84]: "5"
                - paragraph [ref=e85]: $5
              - paragraph [ref=e86]: "5"
        - generic [ref=e88]:
          - button "Prev Page" [disabled]:
            - generic: Prev
            - generic: Page
          - button "Next Page" [ref=e89]:
            - generic [ref=e90]: Next
            - generic [ref=e91]: Page
  - region "Notifications alt+T"
  - generic [ref=e92]:
    - img [ref=e94]
    - button "Open Tanstack query devtools" [ref=e142] [cursor=pointer]:
      - img [ref=e143]
  - img [ref=e192]
  - contentinfo [ref=e194]:
    - generic [ref=e195]:
      - generic [ref=e196]: Seri-Seri Sweets
      - generic [ref=e197]: "@instagram"
  - button "Open Next.js Dev Tools" [ref=e203] [cursor=pointer]:
    - img [ref=e204]
  - alert [ref=e207]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  4   | 
  5   | test.describe("Menu integration", () => {
  6   |   test("backend products endpoint is reachable from test runner", async ({ request }) => {
  7   |     const response = await request.get(`${API_URL}/api/v1/products`);
  8   | 
  9   |     expect(response.ok()).toBeTruthy();
  10  | 
  11  |     const products = await response.json();
  12  |     expect(Array.isArray(products)).toBeTruthy();
  13  |     expect(products.length).toBeGreaterThan(0);
  14  |   });
  15  | 
  16  |   test("menu page loads", async ({ page }) => {
  17  |     await page.goto("/menu");
  18  | 
  19  |     await expect(page).toHaveURL(/\/menu/);
  20  |   });
  21  | 
  22  |   test("first backend product appears on frontend", async ({ page, request }) => {
  23  |     const response = await request.get(`${API_URL}/api/v1/products`);
  24  |     const products = await response.json();
  25  | 
  26  |     const firstProductName = products[0].name;
  27  | 
  28  |     await page.goto("/menu");
  29  | 
  30  |     await expect(page.getByText(firstProductName)).toBeVisible();
  31  |   });
  32  | 
  33  |   test("first page renders up to 6 product cards", async ({ page }) => {
  34  |     await page.goto("/menu");
  35  | 
  36  |     const cards = page.locator("[data-slot='card']");
  37  |     await expect(cards.first()).toBeVisible();
  38  | 
  39  |     const count = await cards.count();
  40  |     expect(count).toBeLessThanOrEqual(6);
  41  |   });
  42  | 
  43  |   test("product names from backend are visible", async ({ page, request }) => {
  44  |     const response = await request.get(`${API_URL}/api/v1/products`);
  45  |     const products = await response.json();
  46  | 
  47  |     await page.goto("/menu");
  48  | 
  49  |     for (const product of products.slice(0, 3)) {
> 50  |       await expect(page.getByText(product.name)).toBeVisible();
      |                                                  ^ Error: expect(locator).toBeVisible() failed
  51  |     }
  52  |   });
  53  | 
  54  |   test("product prices from backend are visible", async ({ page, request }) => {
  55  |     const response = await request.get(`${API_URL}/api/v1/products`);
  56  |     const products = await response.json();
  57  | 
  58  |     await page.goto("/menu");
  59  | 
  60  |     const firstPrice = String(products[0].price);
  61  |     await expect(page.getByText(firstPrice, { exact: false }).first()).toBeVisible();
  62  |   });
  63  | 
  64  |   test("product images load successfully", async ({ page }) => {
  65  |     await page.goto("/menu");
  66  | 
  67  |     const images = page.locator("[data-slot='card'] img");
  68  |     const count = await images.count();
  69  | 
  70  |     expect(count).toBeGreaterThan(0);
  71  | 
  72  |     for (let i = 0; i < count; i++) {
  73  |       const image = images.nth(i);
  74  | 
  75  |       await expect(image).toBeVisible();
  76  | 
  77  |       const naturalWidth = await image.evaluate((img) => {
  78  |         return (img as HTMLImageElement).naturalWidth;
  79  |       });
  80  | 
  81  |       expect(naturalWidth).toBeGreaterThan(0);
  82  |     }
  83  |   });
  84  | 
  85  |   test("next page button changes visible products", async ({ page, request }) => {
  86  |     const response = await request.get(`${API_URL}/api/v1/products`);
  87  |     const products = await response.json();
  88  | 
  89  |     test.skip(products.length <= 6, "Need more than 6 products for pagination");
  90  | 
  91  |     await page.goto("/menu");
  92  | 
  93  |     await expect(page.getByText(products[0].name)).toBeVisible();
  94  | 
  95  |     await page.getByRole("button", { name: "Next Page" }).click();
  96  | 
  97  |     await expect(page.getByText(products[6].name)).toBeVisible();
  98  |   });
  99  | 
  100 |   test("previous page button returns to first page", async ({ page, request }) => {
  101 |     const response = await request.get(`${API_URL}/api/v1/products`);
  102 |     const products = await response.json();
  103 | 
  104 |     test.skip(products.length <= 6, "Need more than 6 products for pagination");
  105 | 
  106 |     await page.goto("/menu");
  107 | 
  108 |     await page.getByRole("button", { name: "Next Page" }).click();
  109 |     await expect(page.getByText(products[6].name)).toBeVisible();
  110 | 
  111 |     await page.getByRole("button", { name: "Prev Page" }).click();
  112 |     await expect(page.getByText(products[0].name)).toBeVisible();
  113 |   });
  114 | 
  115 |   test("prev button is disabled on first page", async ({ page }) => {
  116 |     await page.goto("/menu");
  117 | 
  118 |     await expect(page.getByRole("button", { name: "Prev Page" })).toBeDisabled();
  119 |   });
  120 | 
  121 |   test("next button is disabled on last page", async ({ page, request }) => {
  122 |     const response = await request.get(`${API_URL}/api/v1/products`);
  123 |     const products = await response.json();
  124 | 
  125 |     await page.goto("/menu");
  126 | 
  127 |     const totalPages = Math.max(1, Math.ceil(products.length / 6));
  128 | 
  129 |     if (totalPages > 1) {
  130 |         for (let i = 1; i < totalPages; i++) {
  131 |         await page.getByRole("button", { name: "Next Page" }).click();
  132 |         }
  133 |     };
  134 | 
  135 |     await expect(page.getByRole("button", { name: "Next Page" })).toBeDisabled();
  136 |   });
  137 | 
  138 |   test("page dropdown opens", async ({ page, request }) => {
  139 |     const response = await request.get(`${API_URL}/api/v1/products`);
  140 |     const products = await response.json();
  141 |     await page.goto("/menu");
  142 | 
  143 |     test.skip(products.length <= 6, "Need more than 6 products for pagination");
  144 | 
  145 |     await page.getByRole("button", { name: "Page 1"}).click();
  146 | 
  147 |     await expect(page.getByText("Page 2")).toBeVisible();
  148 |   });
  149 | 
  150 |   test("page dropdown can select another page", async ({ page, request }) => {
```