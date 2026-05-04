import { render, screen } from "@testing-library/react"
import AboutPage from "@/app/about/page";

describe("AboutPage", () => {
    it("shows the page heading", () => {
        render(<AboutPage />);

        expect(
            screen.getByRole("heading", { level: 1, name: /Bakery Info/i })
        ).toBeInTheDocument();
    });

    it("shows the bakery name", () => {
        render(<AboutPage />);
        screen.debug();

        expect(
            screen.getByRole("heading", { level: 2, name: /Seri-Seri Sweets/i })
            //screen.getByText(/Seri-Seri Sweets/i)
        ).toBeInTheDocument();
    });

    it("shows the owner description", () => {
        render(<AboutPage />);

        expect(
            screen.getByText(/Raquel Muña/i)
        ).toBeInTheDocument();
    });
});