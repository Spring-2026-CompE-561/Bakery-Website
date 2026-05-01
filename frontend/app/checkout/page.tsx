
// frontend/app/checkout/page.tsx
"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

function getEarliestDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
];

export default function CheckoutPage() {
  const earliestDate = getEarliestDate();

  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [pickupDate, setPickupDate] = useState(earliestDate);
  const [pickupTime, setPickupTime] = useState("8:00 AM");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // temp state inside the modal before saving
  const [tempDate, setTempDate] = useState(pickupDate);
  const [tempTime, setTempTime] = useState(pickupTime);

  // contact form
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function placeOrder() {
    if (items.length === 0) return;
    if (!customerName.trim() || !customerEmail.trim()) {
      setSubmitError("Please fill in your name and email.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim(),
          total_price: total,
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          items: items.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: Number(item.product.price),
          })),
        }),
      });
      if (!res.ok) throw new Error("Order failed. Please try again.");
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function openModal() {
    setTempDate(pickupDate);
    setTempTime(pickupTime);
    setIsModalOpen(true);
  }

  function savePickup() {
    setPickupDate(tempDate);
    setPickupTime(tempTime);
    setIsModalOpen(false);
  }

  function cancelModal() {
    setIsModalOpen(false);
  }

  return (
    <div style={{ background: "var(--color-baby-pink)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>

      {/* Pickup date/time banner */}
      <div style={{ background: "var(--color-smooth-pink)", borderBottom: "1px solid #000" }}
        className="flex items-center justify-center gap-4 px-6 py-4">
        <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: "bold" }}>
          Pickup for {formatDate(pickupDate)} at {pickupTime}
        </p>
        <button
          onClick={openModal}
          style={{
            background: "var(--color-tender-rose)",
            border: "2px solid #000",
            borderRadius: "4px",
            padding: "4px 12px",
            cursor: "pointer",
          }}>
          ✏
        </button>
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div
          onClick={cancelModal}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}>

          {/* Modal box — stop click from closing when clicking inside */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--color-papaya)",
              border: "2px solid #000",
              borderRadius: "8px",
              padding: "32px",
              width: "380px",
              fontFamily: "var(--font-body)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>

            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Edit Pickup Time</p>

            {/* Date picker */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "16px" }}>Date</label>
              <input
                type="date"
                value={tempDate}
                min={earliestDate}
                onChange={(e) => setTempDate(e.target.value)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "18px",
                  padding: "6px 10px",
                  border: "1px solid #000",
                  background: "var(--color-baby-pink)",
                  borderRadius: "4px",
                }}
              />
            </div>

            {/* Time picker */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "16px" }}>Time</label>
              <select
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "18px",
                  padding: "6px 10px",
                  border: "1px solid #000",
                  background: "var(--color-baby-pink)",
                  borderRadius: "4px",
                }}
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={savePickup}
                style={{
                  background: "var(--color-tender-rose)",
                  border: "2px solid #000",
                  borderRadius: "6px",
                  padding: "10px 28px",
                  fontSize: "18px",
                  fontFamily: "var(--font-body)",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                Save
              </button>
              <button
                onClick={cancelModal}
                style={{
                  background: "var(--color-papaya)",
                  border: "2px solid #000",
                  borderRadius: "6px",
                  padding: "10px 28px",
                  fontSize: "18px",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                }}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ padding: "24px 72px" }}>

        {/* Pickup location */}
        <section style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "20px", fontFamily: "var(--font-body)", marginBottom: "6px", fontWeight: "bold" }}>
            Pickup Location
          </p>
          <p style={{ fontSize: "20px", fontFamily: "var(--font-body)" }}>
            Street Address<br />
            City, State, Zip Code
          </p>
          <hr style={{ borderColor: "#000", marginTop: "20px" }} />
        </section>

        {/* Order summary */}
        <section style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "20px", fontFamily: "var(--font-body)", marginBottom: "12px", fontWeight: "bold" }}>
            Order Summary
          </p>
          <div style={{ fontSize: "20px", fontFamily: "var(--font-body)" }}>
            {items.length === 0 ? (
              <p style={{ color: "#808080" }}>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between" style={{ marginBottom: "10px", gap: "12px" }}>
                  <span style={{ flex: 1 }}>{item.product.name}</span>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{ width: "26px", height: "26px", borderRadius: "9999px", border: "1.5px solid #000", background: "var(--color-papaya)", fontWeight: "bold", fontSize: "16px", cursor: "pointer", lineHeight: 1 }}>
                      −
                    </button>
                    <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ width: "26px", height: "26px", borderRadius: "9999px", border: "1.5px solid #000", background: "var(--color-papaya)", fontWeight: "bold", fontSize: "16px", cursor: "pointer", lineHeight: 1 }}>
                      +
                    </button>
                  </div>
                  <span style={{ minWidth: "56px", textAlign: "right" }}>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#888", lineHeight: 1 }}
                    title="Remove item">
                    ✕
                  </button>
                </div>
              ))
            )}
            {items.length > 0 && (
              <div className="flex justify-between" style={{ marginTop: "12px", fontWeight: "bold" }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            )}
          </div>
          <hr style={{ borderColor: "#000", marginTop: "20px" }} />
        </section>

        {/* Contact information */}
        <section style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "20px", fontFamily: "var(--font-body)", marginBottom: "16px", fontWeight: "bold" }}>
            Contact Information
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
            <input
              type="text"
              placeholder="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ background: "var(--color-papaya)", border: "1px solid #000", padding: "6px 10px", fontSize: "20px", fontFamily: "var(--font-body)", color: "#000" }}
            />
            <input
              type="email"
              placeholder="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              style={{ background: "var(--color-papaya)", border: "1px solid #000", padding: "6px 10px", fontSize: "20px", fontFamily: "var(--font-body)", color: "#000" }}
            />
            <input
              type="tel"
              placeholder="phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={{ background: "var(--color-papaya)", border: "1px solid #000", padding: "6px 10px", fontSize: "20px", fontFamily: "var(--font-body)", color: "#000" }}
            />
          </div>
          <hr style={{ borderColor: "#000", marginTop: "40px" }} />
        </section>

        {/* Error message */}
        {submitError && (
          <p style={{ color: "red", fontFamily: "var(--font-body)", fontSize: "16px", marginBottom: "12px", textAlign: "center" }}>
            {submitError}
          </p>
        )}

        {/* Success message */}
        {orderPlaced && (
          <p style={{ color: "green", fontFamily: "var(--font-body)", fontSize: "18px", fontWeight: "bold", marginBottom: "12px", textAlign: "center" }}>
            Order placed! We'll be in touch soon.
          </p>
        )}

        {/* Place order button */}
        <div className="flex justify-center" style={{ marginBottom: "40px" }}>
          <button
            onClick={placeOrder}
            disabled={isSubmitting || items.length === 0}
            style={{
              background: "var(--color-tender-rose)",
              border: "2px solid #000",
              borderRadius: "8px",
              padding: "16px 0",
              width: "360px",
              fontSize: "20px",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              cursor: isSubmitting || items.length === 0 ? "not-allowed" : "pointer",
              color: "#000",
              opacity: isSubmitting || items.length === 0 ? 0.6 : 1,
            }}>
            {isSubmitting ? "Placing Order..." : "PLACE ORDER"}
          </button>
        </div>

      </div>

    </div>
  );
}