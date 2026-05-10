import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductsPage from "./page";

// This test file is for the ProductsPage component, which displays a list of products in the admin dashboard. 
// It checks that the product list is rendered correctly and that the availability switch can be toggled, 
// which should trigger a PATCH request to update the product's availability status in the backend.


// Mock fetch globally
global.fetch = vi.fn()

describe("ProductsPage", () => {
  it("shows the product list and toggles availability switch", async () => {
    // 2. Mock the initial GET request
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ 
        id: 1, 
        name: "Pandesal", 
        price: 1.0, 
        is_available: true, // Initial state is TRUE (checked)
        is_active: true 
      }]
    });

    // 3. Mock the PATCH request (triggered by clicking the switch)
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200
    });

    render(<ProductsPage />);
    
    // Wait for data to load
    const productName = await screen.findByText("Pandesal");
    expect(productName).toBeInTheDocument();

    const toggle = screen.getByRole("switch");
    expect(toggle).toBeChecked(); // Confirmed it starts as checked

    // 4. Click the toggle
    fireEvent.click(toggle);

    // 5. WAIT for the state update to reflect in the UI
    await waitFor(() => {
      expect(toggle).not.toBeChecked();
    });
  });
});