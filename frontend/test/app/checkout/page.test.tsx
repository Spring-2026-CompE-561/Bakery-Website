import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "@/app/checkout/page";

describe("CheckoutPage", () => {
  it("renders the checkout sections", () => {
    render(<CheckoutPage />);

    expect(screen.getByText(/pickup location/i)).toBeInTheDocument();
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
    expect(screen.getByText(/contact information/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /place order/i })
    ).toBeInTheDocument();
  });

  it("renders the order summary items and total", () => {
    render(<CheckoutPage />);

    expect(screen.getByText(/1 x chocolate mini cake/i)).toBeInTheDocument();
    expect(screen.getByText(/\$6\.00/)).toBeInTheDocument();

    expect(screen.getByText(/2 x turon mini cake/i)).toBeInTheDocument();
    expect(screen.getByText(/\$20\.00/)).toBeInTheDocument();

    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText(/\$26\.00/)).toBeInTheDocument();
  });

  it("renders contact input fields", () => {
    render(<CheckoutPage />);

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
  });

  it("opens the pickup edit modal", async () => {
    const user = userEvent.setup();

    render(<CheckoutPage />);

    await user.click(screen.getByRole("button", { name: /✏/i }));

    expect(screen.getByText(/edit pickup time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });

  it("closes the modal when Cancel is clicked", async () => {
    const user = userEvent.setup();

    render(<CheckoutPage />);

    await user.click(screen.getByRole("button", { name: /✏/i }));

    expect(screen.getByText(/edit pickup time/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.queryByText(/edit pickup time/i)).not.toBeInTheDocument();
  });

  it("updates pickup time after saving", async () => {
    const user = userEvent.setup();

    render(<CheckoutPage />);

    await user.click(screen.getByRole("button", { name: /✏/i }));

    await user.selectOptions(screen.getByLabelText(/time/i), "10:30 AM");

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.queryByText(/edit pickup time/i)).not.toBeInTheDocument();
    expect(screen.getByText(/at 10:30 AM/i)).toBeInTheDocument();
  });
});