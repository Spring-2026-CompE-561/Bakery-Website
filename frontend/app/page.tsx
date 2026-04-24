// frontend/app/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Chocolate Mini Cake",
    price: "$6.00",
    description: "Rich chocolate cupcake topped with fluffy chocolate buttercream.",
    // Replace with your real photo: e.g. "/images/chocolate-mini-cake.jpg"
    img: "https://placehold.co/400x300/c8a882/5a3e2b?text=Chocolate+Mini+Cake",
    accent: "#5a3e2b",
  },
  {
    id: 2,
    name: "Vanilla Mini Cake",
    price: "$6.00",
    description: "Soft vanilla cupcake with smooth and creamy vanilla buttercream.",
    // Replace with your real photo: e.g. "/images/vanilla-mini-cake.jpg"
    img: "https://placehold.co/400x300/f5e6c8/8b6914?text=Vanilla+Mini+Cake",
    accent: "#8b6914",
  },
  {
    id: 3,
    name: "Turon Mini Cake",
    price: "$10.00",
    description: "Banana-caramel cupcake inspired by the Filipino favorite, topped with crunchy caramelized lumpia wrapper.",
    // Replace with your real photo: e.g. "/images/turon-mini-cake.jpg"
    img: "https://placehold.co/400x300/d4a853/6b4c0a?text=Turon+Mini+Cake",
    accent: "#6b4c0a",
  },
  {
    id: 4,
    name: "Ube Mini Cake",
    price: "$10.00",
    description: "Soft ube cupcake with creamy ube buttercream and sweet nutty flavor.",
    // Replace with your real photo: e.g. "/images/ube-mini-cake.jpg"
    img: "https://placehold.co/400x300/c9a8e0/5b2d8e?text=Ube+Mini+Cake",
    accent: "#5b2d8e",
  },
  {
    id: 5,
    name: "Sampler Box",
    price: "$30.00",
    description: "One of each flavor — Chocolate, Vanilla, Turon, and Ube — perfect for trying them all!",
    // Replace with your real photo: e.g. "/images/sampler-box.jpg"
    img: "https://placehold.co/400x300/e8d5b7/7a5c3a?text=Sampler+Box",
    accent: "#7a5c3a",
  },
];

export default function HomePage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--color-baby-pink)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>

      {/* ── Hero Banner ── */}
      <section style={{
        background: "var(--color-smooth-pink)",
        borderBottom: "2px solid #000",
        padding: "56px 32px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", opacity: 0.7 }}>
          Homemade · Pickup Only · Oahu, Hawai'i
        </p>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 60px)",
          fontFamily: "var(--font-heading, var(--font-body))",
          fontWeight: "bold",
          marginBottom: "20px",
          lineHeight: 1.2,
        }}>
          Seri-Seri Sweets 🍰
        </h1>
        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          maxWidth: "560px",
          margin: "0 auto 32px",
          lineHeight: "1.7",
        }}>
          Filipino-inspired mini cakes baked fresh with love. Order ahead for local pickup — taste a little piece of home.
        </p>
        <Link href="/menu">
          <button
            style={{
              background: "var(--color-tender-rose)",
              border: "2px solid #000",
              borderRadius: "8px",
              padding: "14px 40px",
              fontSize: "18px",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Order Now →
          </button>
        </Link>
      </section>

      {/* ── Products Grid ── */}
      <section style={{ padding: "48px 32px" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "32px" }}>
          🧁 Our Menu
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#fff",
                border: "2px solid #000",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                transform: hovered === product.id ? "translateY(-5px)" : "none",
                boxShadow: hovered === product.id ? "6px 6px 0 #000" : "3px 3px 0 #000",
              }}
            >
              {/* Product Image — replace src with your real photo path */}
              <img
                src={product.img}
                alt={product.name}
                style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", borderBottom: "2px solid #000" }}
              />
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>{product.name}</p>
                  <p style={{ fontSize: "18px", fontWeight: "bold", color: product.accent }}>{product.price}</p>
                </div>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <Link href="/checkout">
            <button style={{
              background: "var(--color-tender-rose)",
              border: "2px solid #000",
              borderRadius: "8px",
              padding: "12px 36px",
              fontSize: "17px",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
              Place an Order
            </button>
          </Link>
        </div>
      </section>

      <hr style={{ borderColor: "#000", margin: "0 32px" }} />

      {/* ── About Section ── */}
      <section style={{
        background: "var(--color-tender-rose)",
        borderTop: "2px solid #000",
        borderBottom: "2px solid #000",
        padding: "48px 32px",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
            About Seri-Seri Sweets
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "16px" }}>
            Hi, I'm <strong>Raquel Muña</strong>, the owner of Seri-Seri Sweets. I'm a wife, mom,
            and military spouse currently stationed in Hawai'i with Filipino heritage.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "16px" }}>
            I created Seri-Seri Sweets after discovering my love for baking and sharing treats with others.
            The name was inspired by my family and the nostalgic <em>Sari-Sari</em> store — a place filled
            with Filipino snacks, essentials, and community.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
            Our journey began at Fort Campbell, where I first envisioned this home bakery, and it continues
            to grow with us as we move through different duty stations, each place bringing new inspiration
            to Seri-Seri Sweets. 🏡🌺
          </p>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section style={{
        background: "var(--color-smooth-pink)",
        borderBottom: "2px solid #000",
        padding: "48px 32px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Contact & Pickup</p>
        <p style={{ fontSize: "18px", lineHeight: "2.2" }}>
          📧 {/* Add your business email here */} <em style={{ color: "#888" }}>(business email coming soon)</em><br />
          📞 {/* Add your phone number here */} <em style={{ color: "#888" }}>(phone number coming soon)</em><br />
          📍 {/* Add your address here */} <em style={{ color: "#888" }}>(address coming soon)</em> — Oahu, Hawai'i<br />
          🕐 {/* Add pickup hours here */} <em style={{ color: "#888" }}>(pickup hours coming soon)</em><br />
          <strong>Pickup Only</strong> · Orders confirmed by owner
        </p>
      </section>

    </div>
  );
}