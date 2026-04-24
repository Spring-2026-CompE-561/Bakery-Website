// menu page
// header, products, footer
// header and footer help user navigate through the menu
// products are in a grid

"use client";

import { useState } from "react";
import MenuPager from "@/components/menuPager";
import MenuHeader from "@/components/menuHeader";
import { products } from "@/data/menu";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Menu() {
    const PRODUCTS_PER_PAGE = 6;

    const [currentPage, setCurrentPage] = useState(1);

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

    console.log({
  totalProducts: products.length,
  currentPage,
  totalPages,
  startIndex,
  currentProductsLength: currentProducts.length,
  currentProducts,
});
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
                  style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", borderBottom: "2px solid #000" }}
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

              <CardContent style={{ padding: "4px 16px 1px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>{product.name}</p>
                  <p style={{ fontSize: "17px", fontWeight: "bold" }}>{product.price}</p>
                </div>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{product.description}</p>
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
            </div>
        </main>
    );
}