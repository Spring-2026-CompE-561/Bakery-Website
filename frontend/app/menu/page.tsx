// menu page
// header, products, footer
// header and footer help user navigate through the menu
// products are in a grid

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
    const currentProducts = products.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );

    const goNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((p) => p + 1);
        }
    };

    const goPrev = () => {
        if (currentPage > 1) {
            setCurrentPage((p) => p - 1);
        }
    };

    const [isPageMenuOpen, setIsPageMenuOpen] = useState(false);

    const selectPage = (page: number) => {
        setCurrentPage(page);
        setIsPageMenuOpen(false);
    };



    return (
        <main className="min-h-screen bg-[var(--color-smooth-pink)] p-4 sm:p-6 flex-1">
            <div className="mx-auto max-w-6xl border border-black bg-[var(--color-baby-pink)]">

                <MenuHeader
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goNext={goNext}
                    goPrev={goPrev}
                    isPageMenuOpen={isPageMenuOpen}
                    setIsPageMenuOpen={setIsPageMenuOpen}
                    selectPage={selectPage}
                />

                <div className="grid grid-cols-1 gap-x-12 gap-y-8 px-3 py-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
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
                opacity: product.is_available ? 1 : 0.85
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
                  style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderBottom: "2px solid #000", filter:product.is_available ? "none" : "grayscale(100%)" }}
                />

                {/* SOLD OUT OVERLAY: Only shows if is_available is false */}
                {!product.is_available && (
                   <div style={{ 
                    position: "absolute", 
                    inset: 0, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.2)" 
                  }}>
                    <div style={{
                      background: "#ff4d4d", 
                      color: "#fff",
                      padding: "5px 15px",
                      fontWeight: "bold",
                      border: "2px solid #000",
                      borderRadius: "5px",
                      transform: "rotate(-5deg)",
                      boxShadow: "2px 2px 0 #000"
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

              <CardContent style={{ padding: "4px 16px 1px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold", color: product.is_available ? "#000" : "#665"}}>{product.name}</p>
                  <p style={{ fontSize: "17px", fontWeight: "bold", color: product.is_available ? "#000" : "#665"}}>${product.price}</p>
                </div>
                <p style={{ fontSize: "14px", color: product.is_available ? "#555" : "#999", lineHeight: "1.5" }}>{product.description}</p>
              </CardContent>

              <CardFooter style={{ padding: "8px 16px 16px" }}>
              </CardFooter>
            </Card>
                    ))}
                </div>

                <MenuPager
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goNext={goNext}
                    goPrev={goPrev}
                />
                
                {selectedProduct && (
                <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)}
                // onAddToCart={(q) => addToCart(selectedProduct!, q)}
                onAddToCart={(q) => {
                    if (selectedProduct.is_available) {
                        addToCart(selectedProduct, q);
                    }
                }}
                />
                )}
            </div>
        </main>
    );
}