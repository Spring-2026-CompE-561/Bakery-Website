import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import MenuHeader from "@/components/ui/menuHeader";

describe("MenuHeader Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 3,
    goNext: vi.fn(),
    goPrev: vi.fn(),
    isPageMenuOpen: false,
    setIsPageMenuOpen: vi.fn(),
    selectPage: vi.fn(),
  };

  it("renders the heading", () => {
    render(<MenuHeader {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /view our tasty products/i,
      })
    ).toBeInTheDocument();
  });

  it("shows the current page button", () => {
    render(<MenuHeader {...defaultProps} currentPage={2} />);

    expect(
      screen.getByRole("button", { name: /Page 2/i })
    ).toBeInTheDocument();
  });

  it("opens the page menu when the page button is clicked", async () => {
    const user = userEvent.setup();
    const setIsPageMenuOpen = vi.fn();

    render(
      <MenuHeader
        {...defaultProps}
        setIsPageMenuOpen={setIsPageMenuOpen}
      />
    );

    await user.click(screen.getByRole("button", { name: /Page 1/i }));

    expect(setIsPageMenuOpen).toHaveBeenCalledTimes(1);
  });

  it("renders page options when menu is open", () => {
    render(<MenuHeader {...defaultProps} isPageMenuOpen={true} />);

    const pageButtons = screen.getAllByRole("button", { name: /Page 1/i });
    expect(pageButtons).toHaveLength(2);

    // expect(screen.getByRole("button", { name: /page 1/i })).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: /page 2/i })).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: /page 3/i })).toBeInTheDocument();
  });

  it("calls selectPage when a page option is clicked", async () => {
    const user = userEvent.setup();
    const selectPage = vi.fn();

    render(
      <MenuHeader
        {...defaultProps}
        isPageMenuOpen={true}
        selectPage={selectPage}
      />
    );

    await user.click(screen.getByRole("button", { name: /Page 3/i }));

    expect(selectPage).toHaveBeenCalledWith(3);
  });

  it("disables the page menu button when there is only one page", () => {
    render(<MenuHeader {...defaultProps} totalPages={1} />);

    expect(
      screen.getByRole("button", { name: /Page 1/i })
    ).toBeDisabled();
  });

  it("calls goNext when next button is clicked", async () => {
    const user = userEvent.setup();
    const goNext = vi.fn();

    render(<MenuHeader {...defaultProps} goNext={goNext} />);

    await user.click(screen.getByRole("button", { name: /▶/i }));

    expect(goNext).toHaveBeenCalledTimes(1);
  });

  it("calls goPrev when previous button is clicked", async () => {
    const user = userEvent.setup();
    const goPrev = vi.fn();

    render(<MenuHeader {...defaultProps} currentPage={2} goPrev={goPrev} />);

    await user.click(screen.getByRole("button", { name: /◀/i }));

    expect(goPrev).toHaveBeenCalledTimes(1);
  });

  it("disables previous button on the first page", () => {
    render(<MenuHeader {...defaultProps} currentPage={1} />);

    expect(screen.getByRole("button", { name: /◀/i })).toBeDisabled();
  });

  it("disables next button on the last page", () => {
    render(<MenuHeader {...defaultProps} currentPage={3} totalPages={3} />);

    expect(screen.getByRole("button", { name: /▶/i })).toBeDisabled();
  });

  it("closes the page menu when clicking outside", async () => {
    const user = userEvent.setup();
    const setIsPageMenuOpen = vi.fn();

    render(
      <div>
        <button>Outside</button>
        <MenuHeader
          {...defaultProps}
          isPageMenuOpen={true}
          setIsPageMenuOpen={setIsPageMenuOpen}
        />
      </div>
    );

    await user.click(screen.getByRole("button", { name: /outside/i }));

    expect(setIsPageMenuOpen).toHaveBeenCalledWith(false);
  });
});