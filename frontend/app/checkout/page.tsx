// frontend/app/checkout/page.tsx
"use client";
import { useState } from "react";

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

  const [pickupDate, setPickupDate] = useState(earliestDate);
  const [pickupTime, setPickupTime] = useState("8:00 AM");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // temp state inside the modal before saving
  const [tempDate, setTempDate] = useState(pickupDate);
  const [tempTime, setTempTime] = useState(pickupTime);

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
              <label htmlFor="pickup-date" style={{ fontSize: "16px" }}>
                Date
              </label>
              <input
                id="pickup-date"
                type="date"
                value={tempDate}
                min={earliestDate}
                onChange={(e) => setTempDate(e.target.value)}
              />

              {/* Note: replaced this code with code above,
              for better accessability and testability */}
              
              {/* <label style={{ fontSize: "16px" }}>Date</label>
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
              /> */}
            </div>

            {/* Time picker */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="pickup-time" style={{ fontSize: "16px" }}>
                Time
              </label>
              <select
                id="pickup-time"
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              
              {/* Note: replaced this code with code above,
              for better accessability and testability */}

              {/* <label style={{ fontSize: "16px" }}>Time</label>
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
              </select> */}
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
      <div style={{ padding: "24px 32px" }}>

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
            <div className="flex justify-between" style={{ marginBottom: "6px" }}>
              <span>1 x chocolate mini cake</span>
              <span>$6.00</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: "6px" }}>
              <span>2 x turon mini cake</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between" style={{ marginTop: "12px", fontWeight: "bold" }}>
              <span>Total</span>
              <span>$26.00</span>
            </div>
          </div>
          <hr style={{ borderColor: "#000", marginTop: "20px" }} />
        </section>

        {/* Contact information */}
        <section style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "20px", fontFamily: "var(--font-body)", marginBottom: "16px", fontWeight: "bold" }}>
            Contact Information
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
            {["name", "email", "phone number"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                style={{
                  background: "var(--color-papaya)",
                  border: "1px solid #000",
                  padding: "6px 10px",
                  fontSize: "20px",
                  fontFamily: "var(--font-body)",
                  color: "#808080",
                }}
              />
            ))}
          </div>
          <hr style={{ borderColor: "#000", marginTop: "40px" }} />
        </section>

        {/* Place order button */}
        <div className="flex justify-center" style={{ marginBottom: "40px" }}>
          <button style={{
            background: "var(--color-tender-rose)",
            border: "2px solid #000",
            borderRadius: "8px",
            padding: "16px 0",
            width: "360px",
            fontSize: "20px",
            fontFamily: "var(--font-body)",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#000",
          }}>
            PLACE ORDER
          </button>
        </div>

      </div>

    </div>
  );
}