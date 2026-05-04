import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import Menu from "@/app/menu/page";
import { getMenu } from "@/data/menu";

vi.mock("@/data/menu", () => ({
  getMenu: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockProducts = [
  {
    id: 1,
    name: "Chocolate Mini Cake",
    price: "6.00",
    description: "Chocolate cake description",
    picture_url: "/chocolate.jpg",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Turon Mini Cake",
    price: "10.00",
    description: "Turon cake description",
    picture_url: "/turon.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "Ube Mini Cake",
    price: "8.00",
    description: "Ube cake description",
    picture_url: "/ube.jpg",
    badge: null,
  },
];

describe("Menu Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders menu heading", async () => {
    vi.mocked(getMenu).mockResolvedValue(mockProducts);

    render(<Menu />);

    expect(
      await screen.findByRole("heading", {
        name: /view our tasty products/i,
      })
    ).toBeInTheDocument();
  });

  it("loads and renders products", async () => {
    vi.mocked(getMenu).mockResolvedValue(mockProducts);

    render(<Menu />);

    expect(await screen.findByText(/chocolate mini cake/i)).toBeInTheDocument();
    expect(screen.getByText(/turon mini cake/i)).toBeInTheDocument();
    expect(screen.getByText(/ube mini cake/i)).toBeInTheDocument();

    expect(screen.getByText(/\$6\.00/)).toBeInTheDocument();
    expect(screen.getByText(/\$10\.00/)).toBeInTheDocument();
    expect(screen.getByText(/\$8\.00/)).toBeInTheDocument();
  });

  it("renders product badges when present", async () => {
    vi.mocked(getMenu).mockResolvedValue(mockProducts);

    render(<Menu />);

    expect(await screen.findByText(/popular/i)).toBeInTheDocument();
    expect(screen.getByText(/new/i)).toBeInTheDocument();
  });

  it("opens product modal when a product card is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(getMenu).mockResolvedValue(mockProducts);

    render(<Menu />);

    const product = await screen.findByText(/chocolate mini cake/i);

    const descriptions = screen.getAllByText(/chocolate cake description/i);

    await user.click(product);

    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it("closes product modal when close button is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(getMenu).mockResolvedValue(mockProducts);

    render(<Menu />);

    await user.click(await screen.findByText(/chocolate mini cake/i));

    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    const closeButton = buttons.find(
      (button) => button.querySelector("svg") !== null
    );

    expect(closeButton).toBeDefined();

    await user.click(closeButton!);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /add to cart/i })
      ).not.toBeInTheDocument();
    });
  });

  it("shows only 6 products on the first page", async () => {
    const manyProducts = Array.from({ length: 7 }, (_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      price: "5.00",
      description: `Description ${index + 1}`,
      picture_url: `/product-${index + 1}.jpg`,
      badge: null,
    }));

    vi.mocked(getMenu).mockResolvedValue(manyProducts);

    render(<Menu />);

    expect(await screen.findByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/product 6/i)).toBeInTheDocument();
    expect(screen.queryByText(/product 7/i)).not.toBeInTheDocument();
  });

  it("goes to next page when next button is clicked", async () => {
    const user = userEvent.setup();

    const manyProducts = Array.from({ length: 7 }, (_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      price: "5.00",
      description: `Description ${index + 1}`,
      picture_url: `/product-${index + 1}.jpg`,
      badge: null,
    }));

    vi.mocked(getMenu).mockResolvedValue(manyProducts);

    render(<Menu />);

    expect(await screen.findByText(/product 1/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /▶/i }));

    expect(screen.getByText(/product 7/i)).toBeInTheDocument();
    expect(screen.queryByText(/product 1/i)).not.toBeInTheDocument();
  });

  it("shows an error message when menu fails to load", async () => {
    vi.mocked(getMenu).mockRejectedValue(new Error("Failed to load"));

    render(<Menu />);

    // NOTE:
    // This test will currently fail because your component sets the error
    // but does not render it anywhere.
    expect(await screen.findByText(/could not load menu/i)).toBeInTheDocument();
  });
});