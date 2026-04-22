"use client";

import { useState } from "react";
import Pager from "@/components/pager";
import ProductCard from "@/components/card";
import ProductsHeader from "@/components/productsHeader";
import { products } from "@/data/menu";

export default function ProductsPage() {
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

    return (
        <main className="min-h-screen bg-[#d9b0c1] p-4 sm:p-6">
            <div className="mx-auto max-w-6xl border border-[#8a6f7b] bg-[#e7bfd0] shadow-sm">

                <ProductsHeader
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
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <Pager
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goNext={goNext}
                    goPrev={goPrev}
                />
            </div>
        </main>
    );
}