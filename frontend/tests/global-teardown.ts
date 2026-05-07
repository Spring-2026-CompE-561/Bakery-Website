import { request } from "@playwright/test";
import fs from "fs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const FILE = "tests/.seeded-products.json";

async function globalTeardown() {
  if (!fs.existsSync(FILE)) {
    console.log("No seeded-products file found");
    return;
  }

  const saved = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  const created = Array.isArray(saved) ? saved : saved.created ?? [];


  const api = await request.newContext();

  const loginRes = await api.post(`${API_URL}/api/v1/user/login`, {
    form: {
      username: "admin@bakery.com",
      password: "bakery_password_2026",
    },
  });

  if (!loginRes.ok()) {
    throw new Error(`Teardown login failed: ${loginRes.status()} ${await loginRes.text()}`);
  }

  const loginJson = await loginRes.json();

  const token =
    loginJson.access_token ||
    loginJson.token ||
    loginJson.accessToken;

  for (const product of created) {
    const deleteRes = await api.delete(`${API_URL}/api/v1/products/${product.id}`, {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    });

    if (!deleteRes.ok()) {
      console.log(
        `Failed to delete ${product.id}: ${deleteRes.status()} ${await deleteRes.text()}`
      );
    }
  }

  console.log(`Deleted ${created.length} extra products`);

  fs.unlinkSync(FILE);
  await api.dispose();
}

export default globalTeardown;