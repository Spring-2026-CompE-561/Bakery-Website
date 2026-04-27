// frontend/app/page.tsx
"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

const products: Product[] = [ 
  {
    id: 1,
    name: "Chocolate Mini Cake",
    price: "$6.00",
    description: "Rich chocolate cupcake topped with fluffy chocolate buttercream.",
    img: "https://placehold.co/400x300/c8a882/5a3e2b?text=Chocolate+Mini+Cake",
    badge: null,
  },
  {
    id: 2,
    name: "Ube Mini Cake",
    price: "$10.00",
    description: "Soft ube cupcake with creamy ube buttercream and sweet nutty flavor.",
    img: "https://placehold.co/400x300/c9a8e0/5b2d8e?text=Ube+Mini+Cake",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Sampler Box",
    price: "$30.00",
    description: "One of each flavor — Chocolate, Vanilla, Turon, and Ube — perfect for trying them all!",
    img: "https://placehold.co/400x300/e8d5b7/7a5c3a?text=Sampler+Box",
    badge: "Best Value",
  },
];

export default function HomePage() {
  return (
    <div style={{ background: "var(--color-baby-pink)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>

      {/* ── Hero Banner ── */}
      <section style={{
        background: "var(--color-smooth-pink)",
        borderBottom: "2px solid #000",
        padding: "56px 32px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", opacity: 0.6 }}>
          Homemade · Pickup Only · Oahu, Hawai'i
        </p>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 60px)",
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
          <Button
            size="lg"
            style={{
              background: "var(--color-tender-rose)",
              border: "2px solid #000",
              color: "#000",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              fontSize: "17px",
              padding: "14px 40px",
              height: "auto",
            }}
          >
            Order Now →
          </Button>
        </Link>
      </section>

      {/* ── Featured Products (3 max) ── */}
      <section style={{ padding: "48px 32px" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "32px" }}>
          🧁 Featured Items
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "28px",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {products.map((product) => (
            <Card
              key={product.id}
              style={{
                border: "2px solid #000",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "3px 3px 0 #000",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                background: "#fff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", borderBottom: "2px solid #000" }}
                />
                {product.badge && (
                  <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                    <Badge style={{
                      background: "var(--color-tender-rose)",
                      color: "#000",
                      border: "1px solid #000",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                    }}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent style={{ padding: "16px 16px 8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>{product.name}</p>
                  <p style={{ fontSize: "17px", fontWeight: "bold" }}>{product.price}</p>
                </div>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{product.description}</p>
              </CardContent>

              <CardFooter style={{ padding: "8px 16px 16px" }}>
                <Link href="/menu" style={{ width: "100%" }}>
                  <Button style={{
                    width: "100%",
                    background: "var(--color-papaya)",
                    border: "1.5px solid #000",
                    color: "#000",
                    fontFamily: "var(--font-body)",
                    fontWeight: "bold",
                    height: "auto",
                    padding: "8px",
                  }}>
                    Order This
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link href="/menu">
            <Button style={{
              background: "var(--color-smooth-pink)",
              border: "2px solid #000",
              color: "#000",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              height: "auto",
              padding: "10px 28px",
            }}>
              See Full Menu
            </Button>
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
        textAlign: "center",
      }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
          About Seri-Seri Sweets
        </p>
        <p style={{ fontSize: "18px", maxWidth: "560px", margin: "0 auto 28px", lineHeight: "1.7" }}>
          A Filipino family bakery bringing the warmth of home to Oahu, Hawai'i — one mini cake at a time. 🌺
        </p>
        <Link href="/about">
          <Button style={{
            background: "#fff",
            border: "2px solid #000",
            color: "#000",
            fontFamily: "var(--font-body)",
            fontWeight: "bold",
            height: "auto",
            padding: "10px 28px",
            fontSize: "16px",
          }}>
            Our Story →
          </Button>
        </Link>
      </section>

      {/* ── Contact Section ── */}
      <section style={{
        background: "var(--color-smooth-pink)",
        borderBottom: "2px solid #000",
        padding: "48px 32px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Contact & Pickup</p>
        <p style={{ fontSize: "18px", lineHeight: "2.4" }}>
          📧 <em style={{ color: "#888" }}>(business email coming soon)</em><br />
          📞 <em style={{ color: "#888" }}>(phone number coming soon)</em><br />
          📍 <em style={{ color: "#888" }}>(address coming soon)</em> — Oahu, Hawai'i<br />
          🕐 <em style={{ color: "#888" }}>(pickup hours coming soon)</em><br />
          <strong>Pickup Only</strong> · Orders confirmed by owner
        </p>
      </section>

    </div>
  );
}