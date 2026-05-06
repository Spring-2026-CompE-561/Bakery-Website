"use client";
import React from "react";

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

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-baby-pink)", minHeight: "100vh" }}>

      {/* ── Hero Banner ── */}
      <section
        style={{ background: "var(--color-smooth-pink)", position: "relative", overflow: "hidden" }}
        className="px-6 py-12 md:py-16 text-center"
      >
        <div style={{ position: "absolute", top: "-20px", left: "-20px" }}><Hibiscus size={130} rotate={-30} opacity={0.2} /></div>
        <div style={{ position: "absolute", top: "-20px", right: "-20px" }}><Hibiscus size={130} rotate={30} opacity={0.2} /></div>
        <div style={{ position: "absolute", bottom: "-15px", left: "15%" }}><Plumeria size={90} rotate={20} opacity={0.13} /></div>
        <div style={{ position: "absolute", bottom: "-15px", right: "15%" }}><Plumeria size={90} rotate={-20} opacity={0.13} /></div>

        <h1
          className="font-bold leading-tight mb-3"
          style={{ fontSize: "clamp(30px, 6vw, 64px)", fontFamily: "var(--font-display)" }}
        >
          About Seri-Seri Sweets
        </h1>
        <p
          className="mx-auto leading-relaxed"
          style={{ fontSize: "clamp(15px, 2vw, 20px)", maxWidth: "520px", fontFamily: "var(--font-body)", color: "#444" }}
        >
          A Filipino family bakery bringing the warmth of home to Oahu, Hawai&apos;i — one mini cake at a time.
        </p>
      </section>

      {/* Wave: hero → story */}
      <div style={{ background: "var(--color-smooth-pink)", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "55px" }}>
          <path d="M0,20 C480,70 960,0 1440,50 L1440,70 L0,70 Z" fill="var(--color-baby-pink)" />
        </svg>
      </div>

      {/* ── Our Story ── */}
      <section
        style={{ background: "var(--color-baby-pink)", position: "relative", overflow: "hidden" }}
        className="px-6 py-12 md:py-16"
      >
        <div style={{ position: "absolute", top: "-10px", left: "-10px" }}><PalmLeaf size={110} rotate={-20} opacity={0.13} /></div>
        <div style={{ position: "absolute", top: "-10px", right: "-10px" }}><PalmLeaf size={110} rotate={20} opacity={0.13} /></div>
        <div style={{ position: "absolute", bottom: "-10px", left: "40%" }}><Plumeria size={80} rotate={10} opacity={0.10} /></div>

        <div
          className="mx-auto"
          style={{
            maxWidth: "720px",
            position: "relative",
            zIndex: 1,
            background: "#fff",
            border: "2px solid #000",
            borderRadius: "14px",
            boxShadow: "4px 4px 0 #000",
            padding: "clamp(24px, 5vw, 48px)",
          }}
        >
          <p
            className="text-center font-bold mb-6"
            style={{ fontSize: "clamp(20px, 3vw, 28px)", fontFamily: "var(--font-display)" }}
          >
            Our Story
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              lineHeight: "1.9",
              color: "#333",
              textAlign: "justify",
            }}
          >
            Hi, I&apos;m Raquel Muña, the owner of Seri-Seri Sweets. I&apos;m a wife, mom, and military spouse currently stationed in Hawai&apos;i with Filipino heritage. I created Seri-Seri Sweets after discovering my love for baking and sharing treats with others. The name was inspired by my family and the nostalgic Sari-Sari store, a place filled with Filipino snacks, essentials, and community. Our journey began at Fort Campbell, where I first envisioned this home bakery, and it continues to grow with us as we move through different duty stations, each place bringing new inspiration to Seri-Seri Sweets.
          </p>
        </div>
      </section>

    </div>
  );
}