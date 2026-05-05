# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: menu.integration.spec.ts >> Menu integration >> next page button changes visible products
- Location: tests/menu.integration.spec.ts:85:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('6')
Expected: visible
Error: strict mode violation: getByText('6') resolved to 3 elements:
    1) <p>6</p> aka getByText('6').first()
    2) <p>$6</p> aka getByText('$')
    3) <p>6</p> aka getByText('6').nth(2)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('6')

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
            - button "Page 2" [ref=e29]
            - generic [ref=e30]:
              - button "◀" [ref=e31]
              - button "▶" [disabled]
          - heading "View Our Tasty Products!" [level=1] [ref=e32]
        - generic [ref=e34]:
          - img "6" [ref=e36]
          - generic [ref=e37]:
            - generic [ref=e38]:
              - paragraph [ref=e39]: "6"
              - paragraph [ref=e40]: $6
            - paragraph [ref=e41]: "6"
        - generic [ref=e43]:
          - button "Prev Page" [ref=e44]:
            - generic [ref=e45]: Prev
            - generic [ref=e46]: Page
          - button "Next Page" [disabled]:
            - generic: Next
            - generic: Page
  - region "Notifications alt+T"
  - generic [ref=e47]:
    - img [ref=e49]
    - button "Open Tanstack query devtools" [ref=e97] [cursor=pointer]:
      - img [ref=e98]
  - img [ref=e147]
  - contentinfo [ref=e149]:
    - generic [ref=e150]:
      - generic [ref=e151]: Seri-Seri Sweets
      - generic [ref=e152]: "@instagram"
  - button "Open Next.js Dev Tools" [ref=e158] [cursor=pointer]:
    - img [ref=e159]
  - alert [ref=e162]
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
  50  |       await expect(page.getByText(product.name)).toBeVisible();
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
> 97  |     await expect(page.getByText(products[6].name)).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
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
  151 |     const response = await request.get(`${API_URL}/api/v1/products`);
  152 |     const products = await response.json();
  153 | 
  154 |     test.skip(products.length <= 6, "Need more than 6 products for page dropdown");
  155 | 
  156 |     await page.goto("/menu");
  157 | 
  158 |     await page.getByRole("button", { name: /page 1/i }).click();
  159 |     await page.getByRole("button", { name: /page 2/i }).click();
  160 | 
  161 |     await expect(page.getByText(products[6].name)).toBeVisible();
  162 |   });
  163 | 
  164 |   test("page dropdown closes after selecting a page", async ({ page, request }) => {
  165 |     const response = await request.get(`${API_URL}/api/v1/products`);
  166 |     const products = await response.json();
  167 | 
  168 |     test.skip(products.length <= 6, "Need more than 6 products for page dropdown");
  169 | 
  170 |     await page.goto("/menu");
  171 | 
  172 |     await page.getByRole("button", { name: /page 1/i }).click();
  173 |     await page.getByRole("button", { name: /page 2/i }).click();
  174 | 
  175 |     await expect(page.getByRole("button", { name: /page 1/i })).not.toBeVisible();
  176 |   });
  177 | 
  178 | 
  179 |   test("clicking product opens modal", async ({ page, request }) => {
  180 |     const response = await request.get(`${API_URL}/api/v1/products`);
  181 |     const products = await response.json();
  182 | 
  183 |     await page.goto("/menu");
  184 | 
  185 |     await page.getByText(products[0].name).click();
  186 | 
  187 |     await expect(page.getByText("Add To Cart")).toBeVisible();
  188 |   });
  189 | 
  190 | 
  191 |   test("modal closes", async ({ page, request }) => {
  192 |     const response = await request.get(`${API_URL}/api/v1/products`);
  193 |     const products = await response.json();
  194 | 
  195 |     await page.goto("/menu");
  196 | 
  197 |     await page.getByText(products[0].name).click();
```