import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { describe, expect, it, vi } from "vitest";

describe("Button Component", () => {
    it("renders as a button by default", () => {
        render(<Button>Click me</Button>);
        
        const btn = screen.getByRole("button", { name: /Click me/i });
        
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveAttribute("data-slot", "button");
        expect(btn).toHaveAttribute("data-variant", "default");
        expect(btn).toHaveAttribute("data-size", "default");
    });

    it("calls onClick when clicked", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>Click me</Button>);

        await user.click(screen.getByRole("button", { name: /Click me/i }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    })

    // it("applies the destructive variant", () => {
    //     //testing the 'destructive' variant
    //     const { rerender } = render(<Button variant="destructive">Delete</Button>);
    //     const btn = screen.getByRole("button");
    // });

    it("applies the destructive variant", () => {
        render(<Button variant="destructive">Delete</Button>);

        const button = screen.getByRole("button", { name: /Delete/i });

        expect(button).toHaveAttribute("data-variant", "destructive");
        expect(button).toHaveClass("text-destructive");
    });

    it("applies the large size", () => {
        render(<Button size="lg">Large Button</Button>);

        const button = screen.getByRole("button", { name: /Large Button/i });

        expect(button).toHaveAttribute("data-size", "lg");
        expect(button).toHaveClass("h-9");
    })

    it("handles the asChild prop correctly", () => {
        // Test polymorphism: rendering as an <a> tag
        render(
            <Button asChild>
                <a href="/test">Link</a>
            </Button>
        );

        const link = screen.getByRole("link", { name: /link/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/test");

        //make sure it is not a button anymore
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("applies disabled state", () => {
        render(<Button disabled>Disabled</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toBeDisabled();
        expect(btn).toHaveClass("disabled:pointer-events-none");
    });
});