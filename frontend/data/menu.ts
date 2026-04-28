import type { Product } from "@/types/product";

const API_URL = "http://127.0.0.1:8000" // replace with env 

export async function getMenu(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/api/v1/products/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to get menu");
    }

    return res.json();
}