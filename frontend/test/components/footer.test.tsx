import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";

describe("Footer Component", () => {
  it("renders the footer text", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Seri-Seri Sweets @instagram/i)
    ).toBeInTheDocument();
  });

  it("renders a footer element", () => {
    render(<Footer />);

    const footer = screen.getByText(/Seri-Seri Sweets @instagram/i)
      .closest("footer");

    expect(footer).toBeInTheDocument();
  });

  it("applies the correct styles/classes", () => {
    render(<Footer />);

    const footer = screen.getByText(/Seri-Seri Sweets @instagram/i)
      .closest("footer");

    expect(footer).toHaveClass("w-full");
    expect(footer).toHaveClass("text-sm");
  });
});