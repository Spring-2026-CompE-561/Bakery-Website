import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ProductModal } from "@/components/productmodal";
import type { Product } from "@/types/product";

// mock toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  name: "Chocolate Cake",
  description: "Delicious cake",
  price: "10",
  picture_url: "/cake.jpg",
  badge: "",
};

describe("ProductModal Component", () => {
  it("renders product info", () => {
    render(
      <ProductModal
        product={mockProduct}
        onClose={vi.fn()}
        onAddToCart={vi.fn()}
      />
    );

    expect(screen.getByText(/chocolate cake/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10\.00/)).toBeInTheDocument();
    expect(screen.getByText(/delicious cake/i)).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /chocolate cake/i }))
      .toBeInTheDocument();
  });

  it("increments and decrements quantity", async () => {
    const user = userEvent.setup();

    render(
      <ProductModal
        product={mockProduct}
        onClose={vi.fn()}
        onAddToCart={vi.fn()}
      />
    );

    const plusBtn = screen.getByRole("button", { name: "+" });
    const minusBtn = screen.getByRole("button", { name: "-" });

    // initial qty
    expect(screen.getByText("1")).toBeInTheDocument();

    await user.click(plusBtn);
    expect(screen.getByText("2")).toBeInTheDocument();

    await user.click(minusBtn);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("does not go below quantity of 1", async () => {
    const user = userEvent.setup();

    render(
      <ProductModal
        product={mockProduct}
        onClose={vi.fn()}
        onAddToCart={vi.fn()}
      />
    );

    const minusBtn = screen.getByRole("button", { name: "-" });

    await user.click(minusBtn);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ProductModal
        product={mockProduct}
        onClose={onClose}
        onAddToCart={vi.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");
    const closeBtn = buttons[buttons.length - 2]; // close button

    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
  });

  it("adds to cart with correct quantity and closes modal", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    const onClose = vi.fn();

    render(
      <ProductModal
        product={mockProduct}
        onClose={onClose}
        onAddToCart={onAddToCart}
      />
    );

    const plusBtn = screen.getByRole("button", { name: "+" });
    await user.click(plusBtn); // qty = 2

    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addBtn);

    expect(onAddToCart).toHaveBeenCalledWith(2);
    expect(onClose).toHaveBeenCalled();
  });
});