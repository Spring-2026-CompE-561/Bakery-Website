import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";

describe("Navbar Component", () => {
  it("renders the store name", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("link", { name: /Seri Seri Sweets/i })
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /menu/i })).toHaveAttribute("href", "/menu");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
  });

  it("links the store name to the homepage", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("link", { name: /seri seri sweets/i })
    ).toHaveAttribute("href", "/");
  });

  it("renders the checkout/cart link", () => {
    render(<Navbar />);

    const links = screen.getAllByRole("link");
    const checkoutLink = links.find((link) =>
      link.getAttribute("href") === "/checkout"
    );

    expect(checkoutLink).toBeInTheDocument();
  });

  it("renders a nav element", () => {
    render(<Navbar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});