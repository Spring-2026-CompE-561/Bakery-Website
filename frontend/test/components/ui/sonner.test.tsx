import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Toaster } from "@/components/ui/sonner";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
  }),
}));

vi.mock("sonner", () => ({
  Toaster: (props: any) => (
    <div
      data-testid="sonner-toaster"
      data-theme={props.theme}
      className={props.className}
    />
  ),
}));

describe("Toaster Component", () => {
  it("renders the Sonner toaster", () => {
    render(<Toaster />);

    expect(screen.getByTestId("sonner-toaster")).toBeInTheDocument();
  });

  it("passes the current theme to Sonner", () => {
    render(<Toaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute(
      "data-theme",
      "dark"
    );
  });

  it("uses the toaster className", () => {
    render(<Toaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveClass("toaster");
    expect(screen.getByTestId("sonner-toaster")).toHaveClass("group");
  });
});