import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { Badge }  from "@/components/ui/badge";
import { describe, expect, it, vi } from "vitest";

describe("Badge Component", () => {
    it("renders as a badge by default", () => {
        render(<Badge>I am a badge</Badge>);

        const badge = screen.getByText(/I am a badge/i);

        expect(badge).toBeInTheDocument();
        expect(badge).toHaveAttribute("data-slot", "badge");
        expect(badge).toHaveAttribute("data-variant", "default");
        expect(badge).toHaveClass("text-primary-foreground");
    });

    it("renders a secondary badge", () => {
        render(<Badge variant="secondary">I am a secondary badge</Badge>);

        const badge = screen.getByText(/I am a secondary badge/i);

        expect(badge).toBeInTheDocument();
        expect(badge).toHaveAttribute("data-slot", "badge");
        expect(badge).toHaveAttribute("data-variant", "secondary");
        expect(badge).toHaveClass("bg-secondary");
    });
});