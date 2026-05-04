import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import MenuPager from "@/components/ui/menuPager";

describe("MenuPager Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 3,
    goNext: vi.fn(),
    goPrev: vi.fn(),
  };

  /* note: \s matches any whitespace character
   * 
   * example:
   * /Prev\s?Page/i will match both "PrevPage" and "Prev Page"
   * because \s? means "zero or one whitespace character"
   */

  it("renders both Prev and Next buttons", () => {
    render(<MenuPager {...defaultProps} />);

    expect(screen.getByRole("button", { name: /Prev\s?Page/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next\s?Page/i })).toBeInTheDocument();
  });

  it("calls goNext when Next button is clicked", async () => {
    const user = userEvent.setup();
    const goNext = vi.fn();

    render(<MenuPager {...defaultProps} goNext={goNext} />);

    await user.click(screen.getByRole("button", { name: /Next\s?Page/i }));

    expect(goNext).toHaveBeenCalledTimes(1);
  });

  it("calls goPrev when Prev button is clicked", async () => {
    const user = userEvent.setup();
    const goPrev = vi.fn();

    render(<MenuPager {...defaultProps} currentPage={2} goPrev={goPrev} />);

    await user.click(screen.getByRole("button", { name: /Prev\s?Page/i }));

    expect(goPrev).toHaveBeenCalledTimes(1);
  });

  it("disables Prev button on the first page", () => {
    render(<MenuPager {...defaultProps} currentPage={1} />);

    expect(
      screen.getByRole("button", { name: /Prev\s?Page/i })
    ).toBeDisabled();
  });

  it("disables Next button on the last page", () => {
    render(<MenuPager {...defaultProps} currentPage={3} totalPages={3} />);

    expect(
      screen.getByRole("button", { name: /Next\s?Page/i })
    ).toBeDisabled();
  });
});