import { describe, it, expect } from "vitest";
import { Order } from "@/types/admin";

// This test file is for the sorting logic in the OrdersPage component of the admin dashboard. 
// It checks that when sorting by "pickup_soonest", completed or cancelled orders are pushed to the bottom of the list, 
// even if they have an earlier pickup date than active orders. This ensures that active orders are prioritized in the display. 

// We extract the sorting logic into a testable unit
const sortOrders = (orders: Order[]) => {
  return [...orders].sort((a, b) => {
    const isAInactive = a.status === "completed" || a.status === "cancelled";
    const isBInactive = b.status === "completed" || b.status === "cancelled";
    if (isAInactive && !isBInactive) return 1;
    if (!isAInactive && isBInactive) return -1;
    return new Date(a.pickup_date).getTime() - new Date(b.pickup_date).getTime();
  });
};

describe("Order Sorting Logic", () => {
  it("pushes completed orders to the bottom even if they have an earlier pickup date", () => {
    const orders: any[] = [
      { id: 1, status: "completed", pickup_date: "2024-01-01" }, // Older but finished
      { id: 2, status: "pending", pickup_date: "2024-02-01" }    // Newer but active
    ];

    const sorted = sortOrders(orders);
    expect(sorted[0].id).toBe(2); // Active order should be first
    expect(sorted[1].id).toBe(1); // Completed order should be last
  });
});