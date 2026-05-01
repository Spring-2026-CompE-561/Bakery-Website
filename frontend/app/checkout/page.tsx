
// frontend/app/checkout/page.tsx
"use client";
import React, { useState } from "react";
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

  const card: React.CSSProperties = {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    padding: "24px 28px",
    marginBottom: "20px",
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: "14px",
    fontFamily: "var(--font-body)",
  };

  const inputLabel: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: "4px",
    fontFamily: "var(--font-body)",
  };

  const inputStyle: React.CSSProperties = {
    background: "#fafafa",
    border: "1.5px solid #f0c4d4",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "16px",
    fontFamily: "var(--font-body)",
    color: "#000",
    width: "100%",
    outline: "none",
  };

  return (
    <div style={{ background: "var(--color-baby-pink)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>

      {/* Pickup date/time banner */}
      <div
        className="flex items-center justify-center gap-4 px-6 py-4"
        style={{ background: "var(--color-smooth-pink)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", fontWeight: "bold" }}>
          Pickup for {formatDate(pickupDate)} at {pickupTime}
        </p>
        <button
          onClick={openModal}
          style={{
            background: "var(--color-tender-rose)",
            border: "none",
            borderRadius: "8px",
            padding: "6px 14px",
            cursor: "pointer",
            color: "#fff",
            fontSize: "15px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
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
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.16)",
              padding: "36px",
              width: "380px",
              fontFamily: "var(--font-body)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>

            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Edit Pickup Time</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={inputLabel}>Date</label>
              <input
                type="date"
                value={tempDate}
                min={earliestDate}
                onChange={(e) => setTempDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={inputLabel}>Time</label>
              <select
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
                style={inputStyle}
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={savePickup}
                style={{
                  background: "var(--color-tender-rose)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 28px",
                  fontSize: "16px",
                  fontFamily: "var(--font-body)",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}>
                Save
              </button>
              <button
                onClick={cancelModal}
                style={{
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 28px",
                  fontSize: "16px",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  color: "#555",
                }}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ padding: "28px 72px" }}>

        {/* Pickup location */}
        <section style={card}>
          <p style={sectionTitle}>Pickup Location</p>
          <p style={{ fontSize: "16px", fontFamily: "var(--font-body)", color: "#333", lineHeight: 1.6 }}>
            Street Address<br />
            City, State, Zip Code
          </p>
        </section>

        {/* Order summary */}
        <section style={card}>
          <p style={sectionTitle}>Order Summary</p>
          <div style={{ fontSize: "16px", fontFamily: "var(--font-body)" }}>
            {items.length === 0 ? (
              <p style={{ color: "#aaa" }}>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between" style={{ marginBottom: "12px", gap: "12px" }}>
                  <span style={{ flex: 1, color: "#222" }}>{item.product.name}</span>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{ width: "28px", height: "28px", borderRadius: "9999px", border: "1.5px solid #f0c4d4", background: "var(--color-papaya)", fontWeight: "bold", fontSize: "16px", cursor: "pointer", lineHeight: 1 }}>
                      −
                    </button>
                    <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ width: "28px", height: "28px", borderRadius: "9999px", border: "1.5px solid #f0c4d4", background: "var(--color-papaya)", fontWeight: "bold", fontSize: "16px", cursor: "pointer", lineHeight: 1 }}>
                      +
                    </button>
                  </div>
                  <span style={{ minWidth: "56px", textAlign: "right", color: "#333" }}>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#ccc", lineHeight: 1 }}
                    title="Remove item">
                    ✕
                  </button>
                </div>
              ))
            )}
            {items.length > 0 && (
              <>
                <div style={{ borderTop: "1px solid #f3e0eb", marginTop: "12px", paddingTop: "12px" }} className="flex justify-between">
                  <span style={{ fontWeight: "bold", color: "#222" }}>Total</span>
                  <span style={{ fontWeight: "bold", color: "#222" }}>${total.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Contact information */}
        <section style={card}>
          <p style={sectionTitle}>Contact Information</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "340px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={inputLabel}>Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={inputLabel}>Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={inputLabel}>Phone (optional)</label>
              <input
                type="tel"
                placeholder="(555) 000-0000"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </section>

        {/* Error message */}
        {submitError && (
          <p style={{ color: "#c0392b", fontFamily: "var(--font-body)", fontSize: "15px", marginBottom: "12px", textAlign: "center" }}>
            {submitError}
          </p>
        )}

        {/* Success message */}
        {orderPlaced && (
          <p style={{ color: "#27ae60", fontFamily: "var(--font-body)", fontSize: "17px", fontWeight: "bold", marginBottom: "12px", textAlign: "center" }}>
            Order placed! We&apos;ll be in touch soon.
          </p>
        )}

        {/* Place order button */}
        <div className="flex justify-center" style={{ marginBottom: "48px" }}>
          <button
            onClick={placeOrder}
            disabled={isSubmitting || items.length === 0}
            style={{
              background: "var(--color-tender-rose)",
              border: "none",
              borderRadius: "12px",
              padding: "16px 0",
              width: "360px",
              fontSize: "18px",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              cursor: isSubmitting || items.length === 0 ? "not-allowed" : "pointer",
              color: "#fff",
              opacity: isSubmitting || items.length === 0 ? 0.55 : 1,
              boxShadow: "0 4px 16px rgba(237,123,141,0.35)",
              transition: "opacity 0.2s",
            }}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>

      </div>

    </div>
  );
}