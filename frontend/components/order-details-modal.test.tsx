
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OrderDetailsModal } from "./order-details-modal";
import { Order } from "@/types/admin";

// this test file is for the OrderDetailsModal component, 
// which displays the details of an order in a modal dialog. 
// It checks that the component renders correctly and that 
// the line item totals are calculated properly based on the quantity 
// and unit price of each item in the order.

const mockOrder: Order = {
  id: 55,
  customer_name: "Isabella Garcia",
  customer_email: "isabella@example.com",
  total_price: 30.00,
  status: "pending",
  created_at: new Date().toISOString(),
  pickup_date: "2024-06-01",
  pickup_time: "10:00",
  items: [
    { id: 1, product_id: 10, product_name: "Ube Crinkle", quantity: 2, unit_price: 5.00 },
    { id: 2, product_id: 11, product_name: "Cheese Ensaymada", quantity: 2, unit_price: 10.00 }
  ]
};

describe("OrderDetailsModal", () => {
  it("renders correctly and calculates line item totals", () => {
    render(<OrderDetailsModal order={mockOrder} isOpen={true} onClose={() => {}} />);
    
    // Check if product names appear
    expect(screen.getByText(/Product: Ube Crinkle/i)).toBeInTheDocument();
    
    // Check line item calculation: 2 * $10.00 = $20.00
    expect(screen.getByText(/\$20.00/i)).toBeInTheDocument();
    
    // Check grand total
    expect(screen.getByText(/\$30.00/i)).toBeInTheDocument();
  });
});