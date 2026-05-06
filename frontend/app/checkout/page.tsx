"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

// --- Floral SVG Accents ---
type AccentProps = { size?: number; opacity?: number; rotate?: number };

function Hibiscus({ size = 110, opacity = 0.18, rotate = 0 }: AccentProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}>
      <ellipse cx="50" cy="27" rx="9" ry="23" />
      <ellipse cx="50" cy="27" rx="9" ry="23" transform="rotate(72 50 50)" />
      <ellipse cx="50" cy="27" rx="9" ry="23" transform="rotate(144 50 50)" />
      <ellipse cx="50" cy="27" rx="9" ry="23" transform="rotate(216 50 50)" />
      <ellipse cx="50" cy="27" rx="9" ry="23" transform="rotate(288 50 50)" />
      <circle cx="50" cy="50" r="7" />
      <line x1="50" y1="43" x2="50" y2="32" strokeWidth="1" />
    </svg>
  );
}

function Plumeria({ size = 100, opacity = 0.18, rotate = 0 }: AccentProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}>
      <path d="M50,50 C46,38 44,22 50,12 C56,22 54,38 50,50" />
      <path d="M50,50 C46,38 44,22 50,12 C56,22 54,38 50,50" transform="rotate(72 50 50)" />
      <path d="M50,50 C46,38 44,22 50,12 C56,22 54,38 50,50" transform="rotate(144 50 50)" />
      <path d="M50,50 C46,38 44,22 50,12 C56,22 54,38 50,50" transform="rotate(216 50 50)" />
      <path d="M50,50 C46,38 44,22 50,12 C56,22 54,38 50,50" transform="rotate(288 50 50)" />
      <circle cx="50" cy="50" r="5" />
    </svg>
  );
}

function PalmLeaf({ size = 100, opacity = 0.18, rotate = 0 }: AccentProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}>
      <path d="M50,85 C50,85 18,55 12,20 C28,28 45,55 50,85" />
      <path d="M50,85 C50,85 82,55 88,20 C72,28 55,55 50,85" />
      <path d="M50,85 C50,85 30,45 50,15 C70,45 50,85 50,85" />
      <line x1="50" y1="85" x2="50" y2="55" strokeWidth="1" />
    </svg>
  );
}

function getEarliestDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toISOString().split("T")[0];
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
  const [tempDate, setTempDate] = useState(pickupDate);
  const [tempTime, setTempTime] = useState(pickupTime);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

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
          customer_phone: customerPhone.trim() || undefined,
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

  function openModal() { setTempDate(pickupDate); setTempTime(pickupTime); setIsModalOpen(true); }
  function savePickup() { setPickupDate(tempDate); setPickupTime(tempTime); setIsModalOpen(false); }
  function cancelModal() { setIsModalOpen(false); }

  const card: React.CSSProperties = {
    background: "white",
    borderRadius: "16px",
    border: "2px solid #000",
    boxShadow: "3px 3px 0 #000",
    padding: "24px 28px",
    marginBottom: "20px",
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#444",
    marginBottom: "14px",
    fontFamily: "var(--font-body)",
  };

  const inputLabel: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#444",
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
    <div style={{ background: "var(--color-smooth-pink)", minHeight: "100vh", fontFamily: "var(--font-body)", display: "flex", flexDirection: "column" }}>

      {/* Modal overlay */}
      {isModalOpen && (
        <div onClick={cancelModal} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: "20px", border: "2px solid #000", boxShadow: "4px 4px 0 #000", padding: "36px", width: "380px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ fontSize: "13px", fontWeight: "bold", letterSpacing: "0.08em", textTransform: "uppercase", color: "#444" }}>Edit Pickup Time</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={inputLabel}>Date</label>
              <input type="date" value={tempDate} min={earliestDate} onChange={(e) => setTempDate(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={inputLabel}>Time</label>
              <select value={tempTime} onChange={(e) => setTempTime(e.target.value)} style={inputStyle}>
                {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={savePickup} className="transition-transform duration-200 hover:scale-105" style={{ background: "var(--color-tender-rose)", border: "2px solid #000", borderRadius: "10px", padding: "10px 28px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", color: "#000" }}>Save</button>
              <button onClick={cancelModal} style={{ background: "#f5f5f5", border: "2px solid #000", borderRadius: "10px", padding: "10px 28px", fontSize: "16px", cursor: "pointer", color: "#222" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Top section with floras */}
      <div style={{ background: "var(--color-smooth-pink)", position: "relative", overflow: "hidden", paddingTop: "40px" }}>
        <div style={{ position: "absolute", top: "10px", left: "-20px" }}><Hibiscus size={130} rotate={-30} opacity={0.2} /></div>
        <div style={{ position: "absolute", top: "10px", right: "-20px" }}><Hibiscus size={130} rotate={30} opacity={0.2} /></div>
        
        {/* Top wave */}
        <div style={{ lineHeight: 0, marginBottom: "-1px" }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "50px" }}>
            <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="var(--color-baby-pink)" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div style={{ background: "var(--color-baby-pink)", backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "22px 22px", padding: "28px 72px", flex: 1, position: "relative", overflow: "hidden" }}>
        
        {/* Extra Floras in main background */}
        <div style={{ position: "absolute", top: "20%", left: "-30px" }}><Plumeria size={110} rotate={15} opacity={0.15} /></div>
        <div style={{ position: "absolute", bottom: "10%", right: "-30px" }}><PalmLeaf size={140} rotate={-15} opacity={0.15} /></div>

        {/* Pickup date/time */}
        <div className="flex justify-center" style={{ marginBottom: "20px", position: "relative", zIndex: 1 }}>
          <div style={{ background: "var(--color-tender-rose)", borderRadius: "16px", border: "2px solid #000", boxShadow: "3px 3px 0 #000", padding: "18px 32px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)", marginBottom: "4px" }}>Pickup Time</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>{formatDate(pickupDate)} &middot; {pickupTime}</p>
            </div>
            <button onClick={openModal} className="transition-transform duration-200 hover:scale-110 hover:rotate-12" style={{ background: "rgba(255,255,255,0.35)", border: "2px solid #000", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "20px" }}>✏</button>
          </div>
        </div>

        {/* Form Containers */}
        <div style={{ position: "relative", zIndex: 1 }}>
            <section style={card}>
            <p style={sectionTitle}>Pickup Location</p>
            <p style={{ fontSize: "16px", color: "#222", lineHeight: 1.6 }}>Street Address<br />City, State, Zip Code</p>
            </section>

            <section style={card}>
            <p style={sectionTitle}>Order Summary</p>
            <div style={{ fontSize: "16px" }}>
                {items.length === 0 ? <p style={{ color: "#666" }}>Your cart is empty.</p> : (
                items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between" style={{ marginBottom: "12px", gap: "12px" }}>
                    <span style={{ flex: 1, color: "#111" }}>{item.product.name}</span>
                    <div className="flex items-center" style={{ gap: "8px" }}>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid #000", background: "var(--color-papaya)", fontWeight: "bold", cursor: "pointer" }}>−</button>
                        <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid #000", background: "var(--color-papaya)", fontWeight: "bold", cursor: "pointer" }}>+</button>
                    </div>
                    <span style={{ minWidth: "56px", textAlign: "right" }}>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.product.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888" }}>✕</button>
                    </div>
                ))
                )}
                {items.length > 0 && (
                <div style={{ borderTop: "1px solid #f3e0eb", marginTop: "12px", paddingTop: "12px" }} className="flex justify-between">
                    <span style={{ fontWeight: "bold" }}>Total</span>
                    <span style={{ fontWeight: "bold" }}>${total.toFixed(2)}</span>
                </div>
                )}
            </div>
            </section>

            <section style={card}>
            <p style={sectionTitle}>Contact Information</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "340px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={inputLabel}>Name</label>
                    <input type="text" placeholder="Jane Smith" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={inputLabel}>Email</label>
                    <input type="email" placeholder="jane@example.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={inputLabel}>Phone (optional)</label>
                    <input type="tel" placeholder="(555) 000-0000" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={inputStyle} />
                </div>
            </div>
            </section>
        </div>

        {submitError && <p style={{ color: "#c0392b", fontSize: "15px", marginBottom: "12px", textAlign: "center" }}>{submitError}</p>}
        {orderPlaced && <p style={{ color: "#27ae60", fontSize: "17px", fontWeight: "bold", marginBottom: "12px", textAlign: "center" }}>Order placed! We&apos;ll be in touch soon.</p>}

        <div className="flex justify-center" style={{ marginBottom: "48px", position: "relative", zIndex: 1 }}>
          <button
            onClick={placeOrder}
            disabled={isSubmitting || items.length === 0}
            className="transition-transform duration-200 hover:scale-[1.03]"
            style={{
              background: "var(--color-tender-rose)", border: "2px solid #000", boxShadow: "3px 3px 0 #000",
              borderRadius: "12px", padding: "16px 0", width: "360px", fontSize: "18px", fontWeight: "bold",
              cursor: (isSubmitting || items.length === 0) ? "not-allowed" : "pointer", color: "#000",
              opacity: (isSubmitting || items.length === 0) ? 0.55 : 1,
            }}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>

      </div>

      {/* Bottom wave section */}
      <div style={{ background: "var(--color-baby-pink)", lineHeight: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "10px", left: "20%" }}><Plumeria size={80} rotate={10} opacity={0.12} /></div>
        <div style={{ position: "absolute", bottom: "10px", right: "20%" }}><Plumeria size={80} rotate={-10} opacity={0.12} /></div>
        
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "50px" }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="var(--color-smooth-pink)" />
        </svg>
      </div>

    </div>
  );
}