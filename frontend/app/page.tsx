// frontend/app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { getMenu } from "@/data/menu";
import { Cake, CakeSlice, Clock, Heart, Mail, MapPin, Phone, Sparkles, Star } from "lucide-react";

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
        style={{ background: "var(--color-smooth-pink)", position: "relative", overflow: "hidden" }}
        className="px-6 py-12 md:py-16 text-center"
      >
        <div style={{ position: "absolute", top: "-20px",  left:  "-20px"  }}><Hibiscus size={130} rotate={-30} opacity={0.2} /></div>
        <div style={{ position: "absolute", top: "-20px",  right: "-20px"  }}><Hibiscus size={130} rotate={30}  opacity={0.2} /></div>
        <div style={{ position: "absolute", bottom: "-20px", left: "-20px" }}><Hibiscus size={120} rotate={20}  opacity={0.15} /></div>
        <div style={{ position: "absolute", bottom: "-20px", right: "-20px"}}><Hibiscus size={120} rotate={-20} opacity={0.15} /></div>
        <div style={{ position: "absolute", top: "30%",   left:  "-10px"  }}><Hibiscus size={80}  rotate={45}  opacity={0.1} /></div>
        <div style={{ position: "absolute", top: "30%",   right: "-10px"  }}><Hibiscus size={80}  rotate={-45} opacity={0.1} /></div>
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

        <div className="animate-float mb-5">
          <h1 className="animate-shimmer font-bold leading-tight" style={{ fontSize: "clamp(36px, 8vw, 100px)", fontFamily: "var(--font-display)" }}>
            Seri-Seri Sweets
          </h1>
        </div>
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

      {/* Wave: hero → why us */}
      <div style={{ background: "var(--color-smooth-pink)", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,0 C360,70 1080,0 1440,40 L1440,70 L0,70 Z" fill="var(--color-papaya)" />
        </svg>
      </div>

      {/* ── Why Us Cards ── */}
      <section
        style={{ background: "var(--color-papaya)", position: "relative", overflow: "hidden" }}
        className="px-6 py-10 md:py-12"
      >
        <div style={{ position: "absolute", top: "-10px",  left:  "-10px"  }}><PalmLeaf size={110} rotate={-20} opacity={0.15} /></div>
        <div style={{ position: "absolute", top: "-10px",  right: "-10px"  }}><PalmLeaf size={110} rotate={20}  opacity={0.15} /></div>
        <div style={{ position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)" }}><PalmLeaf size={90} rotate={0} opacity={0.1} /></div>
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

      {/* Wave: why us → featured */}
      <div style={{ background: "var(--color-papaya)", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,40 C360,0 1080,70 1440,20 L1440,70 L0,70 Z" fill="var(--color-baby-pink)" />
        </svg>
      </div>

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
                  display: "flex",
                  flexDirection: "column",
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

                <CardContent style={{ padding: "12px 12px 6px", flex: 1 }}>
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

      {/* Wave: featured → about */}
      <div style={{ background: "var(--color-baby-pink)", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,20 C480,70 960,0 1440,50 L1440,70 L0,70 Z" fill="var(--color-tender-rose)" />
        </svg>
      </div>

      {/* ── About Section ── */}
      <section
        style={{ background: "var(--color-tender-rose)", position: "relative", overflow: "hidden" }}
        className="px-6 py-10 md:py-14 text-center"
      >
        <div style={{ position: "absolute", top: "-15px",  left:  "-15px"  }}><Plumeria size={120} rotate={-20} opacity={0.2} /></div>
        <div style={{ position: "absolute", top: "-15px",  right: "-15px"  }}><Plumeria size={120} rotate={20}  opacity={0.2} /></div>
        <div style={{ position: "absolute", bottom: "-15px", left: "15%"   }}><Plumeria size={90}  rotate={30}  opacity={0.13} /></div>
        <div style={{ position: "absolute", bottom: "-15px", right: "15%"  }}><Plumeria size={90}  rotate={-30} opacity={0.13} /></div>
        <p className="text-xl md:text-2xl font-bold mb-4">About Seri-Seri Sweets</p>
        <p className="text-base md:text-lg mx-auto mb-7 leading-relaxed" style={{ maxWidth: "560px" }}>
          A Filipino family bakery bringing the warmth of home to Oahu, Hawaii — one mini cake at a time.
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

      {/* Wave: about → contact */}
      <div style={{ background: "var(--color-tender-rose)", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,50 C360,0 1080,70 1440,20 L1440,70 L0,70 Z" fill="var(--color-smooth-pink)" />
        </svg>
      </div>

      {/* ── Contact Section ── */}
      <section
        style={{ background: "var(--color-smooth-pink)", position: "relative", overflow: "hidden" }}
        className="px-6 py-10 md:py-14 text-center"
      >
        <div style={{ position: "absolute", top: "-15px",  left:  "-15px"  }}><Hibiscus size={110} rotate={15}  opacity={0.18} /></div>
        <div style={{ position: "absolute", top: "-15px",  right: "-15px"  }}><Hibiscus size={110} rotate={-15} opacity={0.18} /></div>
        <div style={{ position: "absolute", bottom: "-10px", left: "30%"   }}><Plumeria size={80}  rotate={10}  opacity={0.12} /></div>
        <div style={{ position: "absolute", bottom: "-10px", right: "30%"  }}><Plumeria size={80}  rotate={-10} opacity={0.12} /></div>
        <p className="text-xl md:text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>Contact &amp; Pickup</p>

        <div
          className="mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            maxWidth: "800px",
            marginBottom: "16px",
          }}
        >
          {([
            { icon: Mail,   label: "Email",        value: "seriseri.sweets@gmail.com" },
            { icon: Phone,  label: "Phone",        value: "(619) 679-6669"            },
            { icon: MapPin, label: "Location",     value: "Pearl City, Hawaii"  },
            { icon: Clock,  label: "Pickup Hours", value: "Coming soon"               },
          ] as { icon: React.ElementType; label: string; value: string }[]).map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              style={{
                background: "#fff",
                border: "2px solid #000",
                borderRadius: "10px",
                boxShadow: "3px 3px 0 #000",
                padding: "18px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{
                background: "var(--color-smooth-pink)",
                border: "1.5px solid #000",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: "bold", fontSize: "13px", color: "#555" }}>{label}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: "bold", color: "#000", textAlign: "center" }}>{value}</p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#333" }}>
          <strong>Pickup Only</strong> · Orders confirmed by owner
        </p>
      </section>

    </div>
  );
}
