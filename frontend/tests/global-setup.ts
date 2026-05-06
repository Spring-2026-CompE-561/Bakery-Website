import { request } from "@playwright/test";
import fs from "fs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const FILE = "tests/.seeded-products.json";

async function globalSetup() {
  console.log("Running global setup...");
  const api = await request.newContext();

  // Login first
  const loginRes = await api.post(`${API_URL}/api/v1/user/login`, {
    form: {
      username: "admin@bakery.com",
      password: "bakery_password_2026",
    },
  });

  if (!loginRes.ok()) {
    throw new Error(`Admin login failed: ${loginRes.status()} ${await loginRes.text()}`);
  }

  const loginJson = await loginRes.json();
  console.log("Login response:", loginJson);

  const token =
    loginJson.access_token ||
    loginJson.token ||
    loginJson.accessToken;

  if (!token) {
    throw new Error("No token returned from login");
  }

  // 1. Get existing products
  const res = await api.get(`${API_URL}/api/v1/products`);
  if (!res.ok()) throw new Error("Failed to fetch products");

  const existing = await res.json();

  const needed = Math.max(0, 7 - existing.length);
  console.log(needed);

  const created = [];
  const runId = Date.now();

  // 2. Only create what's missing
  for (let i = 0; i < needed; i++) {
    const createRes = await api.post(`${API_URL}/api/v1/products`, {
        headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        data: {
            name: `E2E Product ${runId}-${i}`,
            price: 100 + i,
            description: "Test product",
            badge: "Test",
            picture_url: "https://placehold.co/300x300.jpg",
        },
    });

    if (!createRes.ok()) {
        const body = await createRes.text();

        throw new Error(
            `Failed to create product ${i}
            Status: ${createRes.status()}
            Body: ${body}`
        );
    }

    created.push(await createRes.json());
  }

  // 3. Save ONLY what we created (so we don’t delete real data later)
  fs.writeFileSync(FILE, JSON.stringify(created, null, 2));

  await api.dispose();
}

export default globalSetup;