"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav style={{ background: "var(--color-papaya)", borderBottom: "1px solid var(--color-smooth-pink)" }}
      className="flex items-center justify-between px-6 h-30">

      {/* Store name + links centered together */}
      <div className="flex items-center gap-4 mx-auto">
        <Link href="/"
          style={{ color: "var(--color-foreground)", fontFamily: "var(--font-display)" }}
          className="text-4xl font-bold hover:opacity-80">
          Seri Seri Sweets
        </Link>

        <span style={{ color: "var(--color-foreground)" }}>|</span>

        {[
          { label: "Home",    href: "/" },
          { label: "Menu",    href: "/menu" },
          { label: "About",   href: "/about" },
        ].map(({ label, href }, i, arr) => (
          <span key={label} className="flex items-center gap-4">
            <Link href={href}
              style={{ color: "var(--color-foreground)", fontFamily: "var(--font-body)" }}
              className="text-xl hover:opacity-60">
              {label}
            </Link>
            {i < arr.length - 1 && (
              <span style={{ color: "var(--color-foreground)" }}>|</span>
            )}
          </span>
        ))}
      </div>

      {/* Cart icon — right side */}
      <Link href="/checkout" style={{ color: "var(--color-foreground)" }} className="relative hover:opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        {itemCount > 0 && (
          <span style={{
            position: "absolute", top: "-8px", right: "-8px",
            background: "var(--color-tender-rose)",
            border: "1.5px solid #000",
            borderRadius: "9999px",
            fontSize: "11px",
            fontWeight: "bold",
            fontFamily: "var(--font-body)",
            minWidth: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4px",
            color: "#000",
          }}>
            {itemCount}
          </span>
        )}
      </Link>

    </nav>
  );
}