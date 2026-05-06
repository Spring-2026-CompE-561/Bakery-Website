"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Fish, Turtle } from "lucide-react";

const navLinks = [
  { label: "Home",  href: "/" },
  { label: "Menu",  href: "/menu" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  // State for the animal easter egg
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    <nav
      style={{ background: "var(--color-papaya)" }}
    >
      {/* ── Main row ── */}
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4 mx-auto relative">

          {/* Left Side Animal (Fish) */}
          <div 
            style={{ 
              position: "absolute", 
              left: "-45px", 
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(10px)",
              transition: "all 0.4s ease-out",
              pointerEvents: "none"
            }}
            className={isHovered ? "animate-bounce" : ""}
          >
            <Fish size={24} strokeWidth={1.5} />
          </div>

          {/* Store name */}
          <Link
            href="/"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ color: "var(--color-foreground)", fontFamily: "var(--font-display)" }}
            className="text-2xl md:text-4xl font-bold shrink-0 transition-transform duration-200 hover:scale-110 inline-block"
          >
            Seri Seri Sweets
          </Link>

          {/* Right Side Animal (Turtle) */}
          <div 
            style={{ 
              position: "absolute", 
              right: "-45px", 
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(-10px)",
              transition: "all 0.4s ease-out",
              pointerEvents: "none"
            }}
            className={isHovered ? "animate-bounce" : ""}
          >
            <Turtle size={24} strokeWidth={1.5} />
          </div>


          {/* Desktop nav links */}
          <div className="hidden md:flex justify-center gap-4 ml-4">
            <span style={{ color: "var(--color-foreground)" }}>|</span>
            {navLinks.map(({ label, href }, i, arr) => (
              <span key={label} className="flex items-center gap-4">
                <Link
                  href={href}
                  style={{ color: "var(--color-foreground)", fontFamily: "var(--font-display)" }}
                  className="text-xl font-bold inline-block transition-transform duration-200 hover:scale-110 hover:opacity-80"
                >
                  {label}
                </Link>
                {i < arr.length - 1 && (
                  <span style={{ color: "var(--color-foreground)" }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right side: cart + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/checkout"
            style={{ color: "var(--color-foreground)" }}
            className="relative transition-transform duration-200 hover:rotate-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
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

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 shrink-0 transition-transform duration-200 hover:scale-125"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              style={{ background: "var(--color-foreground)" }}
              className={`block h-0.5 w-full rounded transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              style={{ background: "var(--color-foreground)" }}
              className={`block h-0.5 w-full rounded transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              style={{ background: "var(--color-foreground)" }}
              className={`block h-0.5 w-full rounded transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div
          style={{ borderTop: "1px solid #000", background: "var(--color-papaya)" }}
          className="md:hidden flex flex-col pb-4 pt-2"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ color: "var(--color-foreground)", fontFamily: "var(--font-display)" }}
              className="text-2xl font-bold px-4 py-3 inline-block transition-all duration-200 hover:translate-x-2 hover:opacity-70"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
    <div style={{ background: "var(--color-papaya)", lineHeight: 0, marginBottom: "-1px" }}>
      <svg viewBox="0 0 1440 36" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "30px" }}>
        <path d="M0,0 L720,28 L1440,0 L1440,36 L0,36 Z" fill="var(--color-smooth-pink)" />
      </svg>
    </div>
    </>
  );
}