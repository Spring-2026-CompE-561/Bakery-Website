"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { ProductModal } from "@/components/productmodal";
import { useCart } from "@/context/CartContext";
import MenuPager from "@/components/ui/menuPager";
import MenuHeader from "@/components/ui/menuHeader";
import { getMenu } from "@/data/menu";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed } from "lucide-react";

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

export default function Menu() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PRODUCTS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMenu();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load menu.");
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const goNext = () => { if (currentPage < totalPages) setCurrentPage((p) => p + 1); };
  const goPrev = () => { if (currentPage > 1) setCurrentPage((p) => p - 1); };

  const [isPageMenuOpen, setIsPageMenuOpen] = useState(false);
  const selectPage = (page: number) => { setCurrentPage(page); setIsPageMenuOpen(false); };

  return (
    <div style={{ background: "var(--color-baby-pink)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>

      {/* ── Menu Hero Banner ── */}
      <section
        style={{ background: "var(--color-smooth-pink)", position: "relative", overflow: "hidden" }}
        className="px-6 py-10 md:py-14 text-center"
      >
        <div style={{ position: "absolute", top: "-20px", left:  "-20px" }}><Hibiscus size={120} rotate={-30} opacity={0.2} /></div>
        <div style={{ position: "absolute", top: "-20px", right: "-20px" }}><Hibiscus size={120} rotate={30}  opacity={0.2} /></div>
        <div style={{ position: "absolute", bottom: "-15px", left: "20%" }}><Plumeria size={90}  rotate={20}  opacity={0.13} /></div>
        <div style={{ position: "absolute", bottom: "-15px", right: "20%"}}><Plumeria size={90}  rotate={-20} opacity={0.13} /></div>

        <div className="flex items-center justify-center gap-3 mb-3">
          <UtensilsCrossed size={28} strokeWidth={1.5} />
          <h1 className="font-bold leading-tight" style={{ fontSize: "clamp(28px, 6vw, 60px)", fontFamily: "var(--font-display)" }}>
            Our Menu
          </h1>
          <UtensilsCrossed size={28} strokeWidth={1.5} />
        </div>
        <p className="mx-auto leading-relaxed" style={{ fontSize: "clamp(14px, 2vw, 18px)", maxWidth: "500px", color: "#555" }}>
          Filipino-inspired mini cakes baked fresh to order. Click any item to add it to your cart.
        </p>
      </section>

      {/* Wave: hero → grid */}
      <div style={{ background: "var(--color-smooth-pink)", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "50px" }}>
          <path d="M0,0 C360,70 1080,0 1440,40 L1440,70 L0,70 Z" fill="var(--color-baby-pink)" />
        </svg>
      </div>

      {/* ── Menu Grid ── */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="mx-auto max-w-6xl">

          <MenuHeader
            currentPage={currentPage}
            totalPages={totalPages}
            goNext={goNext}
            goPrev={goPrev}
            isPageMenuOpen={isPageMenuOpen}
            setIsPageMenuOpen={setIsPageMenuOpen}
            selectPage={selectPage}
          />

          {loading && (
            <p className="text-center py-12 text-base" style={{ color: "#888" }}>Loading menu...</p>
          )}
          {error && (
            <p className="text-center py-12 text-base" style={{ color: "#c00" }}>{error}</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
              {currentProducts.map((product) => (
                <Card
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    border: "2px solid #000",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "3px 3px 0 #000",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    background: "#fff",
                    opacity: product.is_available ? 1 : 0.85,
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
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
                      style={{
                        width: "100%",
                        aspectRatio: "4/3",
                        objectFit: "cover",
                        display: "block",
                        borderBottom: "2px solid #000",
                        filter: product.is_available ? "none" : "grayscale(100%)",
                      }}
                    />

                    {!product.is_available && (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}>
                        <div style={{
                          background: "#ff4d4d",
                          color: "#fff",
                          padding: "5px 15px",
                          fontWeight: "bold",
                          fontFamily: "var(--font-body)",
                          border: "2px solid #000",
                          borderRadius: "5px",
                          transform: "rotate(-5deg)",
                          boxShadow: "2px 2px 0 #000",
                        }}>
                          SOLD OUT
                        </div>
                      </div>
                    )}

                    {product.badge && product.is_available && (
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                      <p style={{ fontSize: "clamp(14px, 1.6vw, 17px)", fontWeight: "bold", color: product.is_available ? "#000" : "#665", flex: "1 1 0", minWidth: 0 }}>{product.name}</p>
                      <p style={{ fontSize: "clamp(13px, 1.5vw, 16px)", fontWeight: "bold", color: product.is_available ? "#000" : "#665", whiteSpace: "nowrap" }}>${product.price}</p>
                    </div>
                    <p style={{ fontSize: "clamp(12px, 1.3vw, 14px)", color: product.is_available ? "#555" : "#999", lineHeight: "1.55" }}>{product.description}</p>
                  </CardContent>

                  <CardFooter style={{ padding: "6px 12px 12px" }} />
                </Card>
              ))}
            </div>
          )}

          <MenuPager
            currentPage={currentPage}
            totalPages={totalPages}
            goNext={goNext}
            goPrev={goPrev}
          />
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(q) => {
            if (selectedProduct.is_available) addToCart(selectedProduct, q);
          }}
        />
      )}
    </div>
  );
}
