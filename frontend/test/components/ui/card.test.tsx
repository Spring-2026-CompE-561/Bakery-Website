import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

describe("Card Component", () => {
  it("renders a card by default", () => {
    render(<Card>Card content</Card>);

    const card = screen.getByText(/card content/i);

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "default");
    expect(card).toHaveClass("bg-card");
  });

  it("renders a small card", () => {
    render(<Card size="sm">Small card</Card>);

    const card = screen.getByText(/small card/i);

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "sm");
  });

  it("merges custom className on Card", () => {
    render(<Card className="custom-card-class">Custom card</Card>);

    const card = screen.getByText(/custom card/i);

    expect(card).toHaveClass("custom-card-class");
  });

  it("renders card header", () => {
    render(<CardHeader>Header content</CardHeader>);

    const header = screen.getByText(/header content/i);

    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("data-slot", "card-header");
  });

  it("renders card title", () => {
    render(<CardTitle>My Card Title</CardTitle>);

    const title = screen.getByText(/my card title/i);

    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("data-slot", "card-title");
    expect(title).toHaveClass("font-heading");
  });

  it("renders card description", () => {
    render(<CardDescription>This is a description</CardDescription>);

    const description = screen.getByText(/this is a description/i);

    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute("data-slot", "card-description");
    expect(description).toHaveClass("text-muted-foreground");
  });

  it("renders card action", () => {
    render(<CardAction>Action</CardAction>);

    const action = screen.getByText(/action/i);

    expect(action).toBeInTheDocument();
    expect(action).toHaveAttribute("data-slot", "card-action");
  });

  it("renders card content", () => {
    render(<CardContent>Main content</CardContent>);

    const content = screen.getByText(/main content/i);

    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-slot", "card-content");
    expect(content).toHaveClass("px-4");
  });

  it("renders card footer", () => {
    render(<CardFooter>Footer content</CardFooter>);

    const footer = screen.getByText(/footer content/i);

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-slot", "card-footer");
    expect(footer).toHaveClass("border-t");
  });

  it("renders a complete card layout", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Reservation Details</CardTitle>
          <CardDescription>Room booking information</CardDescription>
          <CardAction>Edit</CardAction>
        </CardHeader>

        <CardContent>Classroom 101</CardContent>

        <CardFooter>Confirmed</CardFooter>
      </Card>
    );

    expect(screen.getByText(/reservation details/i)).toBeInTheDocument();
    expect(screen.getByText(/room booking information/i)).toBeInTheDocument();
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/classroom 101/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmed/i)).toBeInTheDocument();
  });
});
