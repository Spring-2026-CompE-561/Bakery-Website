/**
 * Home.tsx
 * Landing page for the Filipino-Hawaiian bakery website.
 *
 * Sections:
 *  1. Navbar      — sticky top bar with nav links
 *  2. Hero        — full-viewport intro with bakery name, tagline, CTA
 *  3. Marquee     — scrolling pastry name ticker for visual rhythm
 *  4. Featured    — 3 highlight product cards (replace with API data later)
 *  5. About       — brand story strip with quote
 *  6. Footer      — minimal branded footer
 *
 * Styling: Tailwind CSS utility classes + inline styles for brand tokens.
 * Fonts:   "Cormorant Garamond" (display) + "DM Sans" (body) via Google Fonts.
 *
 *  → Add this line to the TOP of src/index.css:
 *  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
 *
 * TODO: Replace FEATURED_ITEMS with a fetch() to GET /api/products?featured=true
 * TODO: Replace emoji tiles with <img src={product.imageUrl} /> from src/assets
 * TODO: Replace "Store Name Here" with the real bakery name throughout
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const T = {
  cream:     "#FAF7F2",
  ink:       "#1C1A17",
  forest:    "#2D4A3E",
  forestMid: "#3D6354",
  gold:      "#C9A84C",
  goldLight: "#E8D5A3",
  sand:      "#EDE0CC",
  muted:     "#7A7060",
};

// ─── Placeholder featured items ───────────────────────────────────────────────
// TODO: Replace with API call → GET /api/products?featured=true
const FEATURED_ITEMS = [
  {
    id: 1,
    name: "Ube Ensaymada",
    tag: "Signature",
    description:
      "Brioche-soft rolls swirled with ube halaya, crowned with cultured butter and aged Edam.",
    emoji: "🟣",
  },
  {
    id: 2,
    name: "Bibingka",
    tag: "Seasonal",
    description:
      "Coconut rice cake slow-baked on banana leaf with salted egg and kesong puti.",
    emoji: "🥥",
  },
  {
    id: 3,
    name: "Malasada",
    tag: "Hawaiian",
    description:
      "Pillowy Portuguese-Hawaiian doughnuts dusted with vanilla sugar, filled to order.",
    emoji: "🍩",
  },
];

// ─── Mini Cakes ────────────────────────────────────────────────────────────────
const MINI_CAKES = [
  {
    id: 101,
    name: "Chocolate Mini Cake",
    description: "Rich chocolate cupcake topped with fluffy chocolate buttercream.",
    price: "$6",
    emoji: "🍫",
  },
  {
    id: 102,
    name: "Vanilla Mini Cake",
    description: "Soft vanilla cupcake with smooth and creamy vanilla buttercream.",
    price: "$6",
    emoji: "🤎",
  },
  {
    id: 103,
    name: "Turon Mini Cake",
    description: "Banana-caramel cupcake inspired by the Filipino favorite, topped with crunchy caramelized lumpia wrapper.",
    price: "$10",
    emoji: "🟡",
  },
  {
    id: 104,
    name: "Ube Mini Cake",
    description: "Soft ube cupcake with creamy ube buttercream and sweet nutty flavor.",
    price: "$10",
    emoji: "🟣",
  },
  {
    id: 105,
    name: "Samplers",
    description: "One of each flavor — try the full range in one collection.",
    price: "$30",
    emoji: "🎁",
  },
];

const MARQUEE_ITEMS = [
  "Pandesal", "Bibingka", "Ensaymada", "Malasada",
  "Polvoron", "Ube Cake", "Hopia", "Sapin-Sapin",
  "Mochi", "Palitaw", "Puto", "Biko",
];

// ─── Simple Leaf Decoration ──────────────────────────────────────────────────
function BotanicalLeaf({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        ...style,
        fontSize: "4rem",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      🌿
    </div>
  );
}

// ─── Gold diamond rule ────────────────────────────────────────────────────────
function GoldRule() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs mx-auto my-6">
      <div className="flex-1 h-px" style={{ backgroundColor: T.gold, opacity: 0.4 }} />
      <div className="w-2 h-2 rotate-45" style={{ backgroundColor: T.gold, opacity: 0.7 }} />
      <div className="flex-1 h-px" style={{ backgroundColor: T.gold, opacity: 0.4 }} />
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (el) el.style.animation = "marquee 28s linear infinite";
  }, []);

  return (
    <>
      {/* Global keyframes */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.9s ease both; }
        .delay-1   { animation-delay: 0.1s; }
        .delay-2   { animation-delay: 0.28s; }
        .delay-3   { animation-delay: 0.46s; }
        .delay-4   { animation-delay: 0.64s; }

        .card-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(44,74,62,0.12);
        }
        .nav-link {
          transition: color 0.2s;
        }
        .nav-link:hover { color: ${T.forest} !important; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: T.cream, color: T.ink, overflowX: "hidden" }}>

        {/* ── NAVBAR ──────────────────────────────────────────────────── */}
        <nav
          className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
          style={{ backgroundColor: T.cream, borderBottom: `1px solid ${T.sand}` }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.45rem",
              fontWeight: 700,
              color: T.forest,
              letterSpacing: "0.05em",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Store Name Here
          </button>

          <div className="flex items-center gap-8">
            {[{ label: "Home", path: "/" }, { label: "Products", path: "/products" }].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="nav-link"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.muted,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("/checkout")}
              className="flex items-center gap-2 px-5 py-2 rounded-full"
              style={{
                backgroundColor: T.forest,
                color: T.cream,
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.forestMid)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = T.forest)}
            >
              {/* TODO: wire count to cart context */}
              Cart · 0
            </button>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-6"
          style={{
            minHeight: "92vh",
            background: `linear-gradient(168deg, ${T.cream} 55%, ${T.sand} 100%)`,
          }}
        >
          {/* Botanical accents
          <BotanicalLeaf
            className="absolute bottom-0 left-0 w-1 opacity-20"
            style={{ color: T.forest }}
          />
          <BotanicalLeaf
            className="absolute top-10 right-100 w-1 opacity-15"
            style={{ color: T.forest, transform: "scaleX(-1) rotate(12deg)" }}
          /> */}

          {/* Eyebrow label */}
          <p
            className="fade-up delay-1 mb-6"
            style={{
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: T.gold,
            }}
          >
            Filipino · Hawaiian · Handcrafted
          </p>

          {/* Headline */}
          <h1
            className="fade-up delay-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
              fontWeight: 700,
              lineHeight: 1.0,
              color: T.ink,
              maxWidth: "860px",
            }}
          >
            Baked with{" "}
            <em style={{ color: T.forest, fontStyle: "italic" }}>love,</em>
            <br />
            rooted in{" "}
            <em style={{ color: T.gold, fontStyle: "italic" }}>quality.</em>
          </h1>

          <GoldRule />

          {/* Subtext */}
          <p
            className="fade-up delay-3"
            style={{
              maxWidth: "460px",
              fontSize: "1rem",
              lineHeight: 1.85,
              color: T.muted,
              fontWeight: 300,
              marginBottom: "2.5rem",
            }}
          >
            Traditional Filipino pastries reimagined with the warmth of the islands —
            made from scratch, every morning, with recipes that carry a story.
          </p>

          {/* CTA buttons */}
          <div className="fade-up delay-4 flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => navigate("/products")}
              className="px-9 py-3 rounded-full"
              style={{
                backgroundColor: T.forest,
                color: T.cream,
                fontWeight: 500,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = T.forestMid;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = T.forest;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Order Now
            </button>
            <button
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
              className="px-9 py-3 rounded-full"
              style={{
                backgroundColor: "transparent",
                color: T.forest,
                fontWeight: 500,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: `1.5px solid ${T.forest}`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = T.forest;
                e.currentTarget.style.color = T.cream;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = T.forest;
              }}
            >
              See the Menu
            </button>
          </div>

          {/* Scroll arrow */}
          <div
            className="absolute bottom-8 left-1/2"
            style={{
              transform: "translateX(-50%)",
              color: T.goldLight,
              fontSize: "1.3rem",
              animation: "fadeUp 1.2s ease 1.2s both",
            }}
          >
            ↓
          </div>
        </section>

        {/* ── MARQUEE TICKER ──────────────────────────────────────────── */}
        <div
          className="overflow-hidden py-3"
          style={{ backgroundColor: T.forest, borderTop: `1px solid ${T.sand}`, borderBottom: `1px solid ${T.sand}` }}
        >
          <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: "max-content" }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: T.goldLight,
                  padding: "0 2.5rem",
                }}
              >
                {item}
                <span style={{ color: T.gold, marginLeft: "2.5rem" }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURED PRODUCTS ───────────────────────────────────────── */}
        <section id="featured" style={{ maxWidth: "1100px", margin: "0 auto", padding: "6rem 1.5rem" }}>
          <p
            className="text-center mb-2"
            style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold }}
          >
            From the Case
          </p>
          <h2
            className="text-center mb-16"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: T.ink }}
          >
            Today's Selection
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FEATURED_ITEMS.map((item) => (
              <div
                key={item.id}
                className="card-lift cursor-pointer rounded-2xl overflow-hidden"
                style={{ backgroundColor: "#fff", border: `1px solid ${T.sand}` }}
                onClick={() => navigate(`/products/${item.id}`)}
              >
                {/* Placeholder image tile — replace with <img> from src/assets */}
                <div
                  className="flex items-center justify-center text-6xl"
                  style={{ height: 180, backgroundColor: T.sand }}
                >
                  {item.emoji}
                </div>

                <div style={{ padding: "1.5rem" }}>
                  {/* Tag badge */}
                  <span
                    className="inline-block mb-3 px-3 py-1 rounded-full"
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      backgroundColor: T.goldLight,
                      color: T.forest,
                    }}
                  >
                    {item.tag}
                  </span>

                  {/* Name */}
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: T.ink }}
                  >
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: T.muted, fontWeight: 300 }}>
                    {item.description}
                  </p>

                  {/* CTA */}
                  <p className="mt-4" style={{ fontSize: "0.82rem", fontWeight: 500, color: T.forest, letterSpacing: "0.06em" }}>
                    View →
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => navigate("/products")}
              className="px-10 py-3 rounded-full"
              style={{
                backgroundColor: "transparent",
                color: T.forest,
                fontWeight: 500,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: `1.5px solid ${T.forest}`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = T.forest;
                e.currentTarget.style.color = T.cream;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = T.forest;
              }}
            >
              Browse All Products
            </button>
          </div>
        </section>

        {/* ── MINI CAKES SECTION ──────────────────────────────────────── */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "6rem 1.5rem" }}>
          <p
            className="text-center mb-2"
            style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold }}
          >
            New Arrivals
          </p>
          <h2
            className="text-center mb-16"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: T.ink }}
          >
            Mini Cakes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {MINI_CAKES.map((cake) => (
              <div
                key={cake.id}
                className="card-lift cursor-pointer rounded-2xl overflow-hidden"
                style={{ backgroundColor: "#fff", border: `1px solid ${T.sand}` }}
                onClick={() => navigate(`/products/${cake.id}`)}
              >
                {/* Image tile — replace with <img> from src/assets */}
                <div
                  className="flex items-center justify-center text-5xl"
                  style={{ height: 140, backgroundColor: T.sand }}
                >
                  {cake.emoji}
                </div>

                <div style={{ padding: "1.25rem" }}>
                  {/* Name */}
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: T.ink }}
                  >
                    {cake.name}
                  </h3>

                  {/* Price badge */}
                  <span
                    className="inline-block mb-3 px-3 py-1 rounded-full"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      color: T.cream,
                      backgroundColor: T.forest,
                    }}
                  >
                    {cake.price}
                  </span>

                  {/* Description */}
                  <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: T.muted, fontWeight: 300, marginBottom: "1rem" }}>
                    {cake.description}
                  </p>

                  {/* CTA */}
                  <p style={{ fontSize: "0.75rem", fontWeight: 500, color: T.forest, letterSpacing: "0.06em" }}>
                    View →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT STRIP ─────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col md:flex-row items-center gap-12 px-10 py-24 overflow-hidden"
          style={{ backgroundColor: T.forest }}
        >
          <BotanicalLeaf
            className="absolute right-0 top-0 opacity-5"
            style={{ color: T.goldLight, height: "100%", width: "0.5rem" }}
          />

          {/* Story text */}
          <div className="flex-1 max-w-xl relative z-10">
            <p
              className="mb-4"
              style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold }}
            >
              Our Story
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 700,
                color: T.cream,
                lineHeight: 1.2,
              }}
            >
              A little piece of the islands, in every bite.
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: T.goldLight, fontWeight: 300, opacity: 0.85 }}>
              {/* TODO: Replace with real bakery origin story */}
              blah blah blah
            </p>
          </div>

          {/* Quote card */}
          <div
            className="relative z-10 flex-shrink-0 flex flex-col items-center justify-center rounded-2xl p-10 text-center"
            style={{ border: `1px solid rgba(201,168,76,0.3)`, maxWidth: "300px", width: "100%" }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: T.gold, lineHeight: 0.8, display: "block" }}>
              "
            </span>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: T.cream,
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              Lutuin mo ng may pagmamahal — cook it with love.
            </p>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.gold, fontWeight: 500 }}>
              Family Motto
            </p>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <footer
          className="flex flex-col md:flex-row items-center justify-between px-10 py-6 gap-4"
          style={{ backgroundColor: T.ink, borderTop: `1px solid ${T.forest}` }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: T.goldLight, letterSpacing: "0.06em" }}>
            Store Name Here
          </span>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted }}>
            {/* TODO: Replace with real contact / address */}
            Filipino · Hawaiian · Handcrafted with love · {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            {/* TODO: Wire to real social links */}
            {["Instagram", "Facebook"].map((s) => (
              <a
                key={s}
                href="#"
                style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = T.goldLight)}
                onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
              >
                {s}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}
