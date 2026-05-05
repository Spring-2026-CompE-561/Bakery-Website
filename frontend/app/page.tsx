// frontend/app/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { getMenu } from "@/data/menu";
import { Cake, CakeSlice, Clock, Heart, Mail, MapPin, Phone, Sparkles, Star } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMenu();
        setProducts(data.slice(0, 3));
      } catch (err) {
        console.error(err);
        setError("Could not load featured items.");
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div style={{ background: "var(--color-baby-pink)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>

      {/* ── Hero Banner ── */}
      <section
        style={{ background: "var(--color-smooth-pink)", borderBottom: "2px solid #000" }}
        className="px-6 py-12 md:py-16 text-center"
      >
        <Badge
          className="mb-5 inline-flex items-center gap-2"
          style={{
            background: "var(--color-papaya)",
            color: "#000",
            border: "1.5px solid #000",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            padding: "6px 16px",
            borderRadius: "9999px",
            boxShadow: "2px 2px 0 #000",
          }}
        >
          <CakeSlice size={13} strokeWidth={1.5} />
          Freshly Baked to Order
        </Badge>

        <h1 className="font-bold mb-5 leading-tight" style={{ fontSize: "clamp(28px, 6vw, 60px)" }}>
          Seri-Seri Sweets
        </h1>
        <p
          className="mx-auto mb-8 leading-relaxed"
          style={{ fontSize: "clamp(15px, 2vw, 20px)", maxWidth: "560px" }}
        >
          Filipino-inspired mini cakes baked fresh with love. Order ahead for local pickup — taste a little piece of home.
        </p>
        <Link href="/menu">
          <Button
            size="lg"
            className="transition-transform duration-200 hover:scale-105"
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

      {/* ── Why Us Cards ── */}
      <section
        style={{ background: "var(--color-papaya)", borderBottom: "2px solid #000" }}
        className="px-6 py-10 md:py-12"
      >
        <div
          className="mx-auto"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", maxWidth: "860px" }}
        >
          {[
            { icon: Cake,    title: "Freshly Baked",      body: "Every order made from scratch — never sitting on a shelf." },
            { icon: Heart,   title: "Made with Love",     body: "Filipino family recipes passed down through generations."   },
            { icon: MapPin,  title: "Local Pickup, Oahu", body: "Pearl City pickup only. Fresh to your hands, same day."     },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="transition-transform duration-200 hover:scale-105"
              style={{
                background: "#fff",
                border: "2px solid #000",
                borderRadius: "10px",
                boxShadow: "3px 3px 0 #000",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "12px",
              }}
            >
              <div style={{
                background: "var(--color-smooth-pink)",
                border: "1.5px solid #000",
                borderRadius: "50%",
                width: "52px",
                height: "52px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: "bold", fontSize: "16px" }}>{title}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#555", lineHeight: "1.6" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products (3 max) ── */}
      <section className="px-6 py-10 md:py-14">
        <p className="text-xl md:text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Sparkles size={22} strokeWidth={1.5} />
          Featured Items
          <Sparkles size={22} strokeWidth={1.5} />
        </p>

        {loading && (
          <p className="text-center text-base" style={{ color: "#888" }}>Loading featured items...</p>
        )}
        {error && (
          <p className="text-center text-base" style={{ color: "#c00" }}>{error}</p>
        )}

        {!loading && !error && (
          <div
            className="mx-auto"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              maxWidth: "900px",
            }}
          >
            {products.map((product, i) => (
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
                    src={product.picture_url}
                    alt={product.name}
                    style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", borderBottom: "2px solid #000" }}
                  />
                  {i === 0 && (
                    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                      <Badge style={{
                        background: "var(--color-deep-sage)",
                        color: "#fff",
                        border: "1px solid #000",
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}>
                        <Star size={10} strokeWidth={2} fill="currentColor" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
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

                <CardContent style={{ padding: "12px 12px 6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>{product.name}</p>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>${product.price}</p>
                  </div>
                  <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.5" }}>{product.description}</p>
                </CardContent>

                <CardFooter style={{ padding: "6px 12px 12px" }}>
                  <Link href="/menu" style={{ width: "100%" }}>
                    <Button className="transition-transform duration-200 hover:scale-[1.03]" style={{
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
        )}

        <div className="text-center mt-8">
          <Link href="/menu">
            <Button className="transition-transform duration-200 hover:scale-105" style={{
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

      {/* ── About Section ── */}
      <section
        style={{ background: "var(--color-tender-rose)", borderTop: "2px solid #000", borderBottom: "2px solid #000" }}
        className="px-6 py-10 md:py-14 text-center"
      >
        <p className="text-xl md:text-2xl font-bold mb-4">About Seri-Seri Sweets</p>
        <p className="text-base md:text-lg mx-auto mb-7 leading-relaxed" style={{ maxWidth: "560px" }}>
          A Filipino family bakery bringing the warmth of home to Oahu, Hawai&apos;i — one mini cake at a time.
        </p>
        <Link href="/about">
          <Button className="transition-transform duration-200 hover:scale-105" style={{
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
      <section
        style={{ background: "var(--color-smooth-pink)", borderBottom: "2px solid #000" }}
        className="px-6 py-10 md:py-14 text-center"
      >
        <p className="text-xl md:text-2xl font-bold mb-6">Contact &amp; Pickup</p>
        <div className="flex flex-col items-center gap-4 text-base md:text-lg">
          <p className="flex items-center gap-2">
            <Mail size={18} strokeWidth={1.5} />
            seriseri.sweets@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} strokeWidth={1.5} />
            (619) 679-6669
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={18} strokeWidth={1.5} />
            Pearl City, Hawai&apos;i
          </p>
          <p className="flex items-center gap-2" style={{ color: "#666" }}>
            <Clock size={18} strokeWidth={1.5} />
            <em>Pickup hours coming soon</em>
          </p>
          <p><strong>Pickup Only</strong> · Orders confirmed by owner</p>
        </div>
      </section>

    </div>
  );
}
