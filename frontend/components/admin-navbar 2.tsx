"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";


const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Orders",    href: "/admin/orders" },
  { label: "Settings",  href: "/admin/settings" },
];

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    window.location.href = "/admin/login";
  };

  return (
    <nav
      style={{ 
        background: "var(--color-papaya)", 
        borderBottom: "1px solid var(--color-smooth-pink)", 
        height: "80px"
      }}
      className="relative px-6 sticky top-0 z-50"
    >
   
      <div className="flex items-center justify-between h-16 md:h-20">

       
        <Link
          href="/admin/dashboard"
          style={{ 
            color: "var(--color-foreground)", 
            fontFamily: "var(--font-display)" 
          }}
          className="text-2xl md:text-4xl font-bold hover:opacity-80 shrink-0"
        >
          Seri Seri Sweets
        </Link>

        {/* Desktop nav links (Management specific) */}
        <div className="hidden md:flex items-center gap-4">
          <span style={{ color: "var(--color-foreground)" }}>|</span>
          {adminLinks.map(({ label, href }, i, arr) => (
            <span key={label} className="flex items-center gap-4">
              <Link
                href={href}
                style={{ 
                  color: pathname === href ? "var(--color-tender-rose)" : "var(--color-foreground)", 
                  fontFamily: "var(--font-body)",
                  fontWeight: pathname === href ? "bold" : "normal"
                }}
                className="text-xl hover:opacity-60"
              >
                {label}
              </Link>
              {i < arr.length - 1 && (
                <span style={{ color: "var(--color-foreground)" }}>|</span>
              )}
            </span>
          ))}
        </div>

        {/* Right side: View Store + Logout */}
        <div className="flex items-center gap-6">
          {/* Link back to customer site */}
          <Link 
            href="/" 
            target="_blank"
            style={{ fontFamily: "var(--font-body)" }}
            className="hidden lg:block text-sm text-gray-500 hover:underline"
          >
            View Live Site
          </Link>

          <div className="flex items-center gap-4">
             <div className="h-9 w-9 rounded-full bg-[#FBC9E4]/30 border border-[#FBC9E4] flex items-center justify-center text-[#ED7B8D]">
                <User className="w-5 h-5" />
             </div>
             
             <button
                onClick={handleLogout}
                style={{ color: "var(--color-foreground)" }}
                className="hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 shrink-0"
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
          className="md:hidden flex flex-col gap-1 pb-4 pt-3"
        >
          {adminLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ color: "var(--color-foreground)", fontFamily: "var(--font-body)" }}
              className={`text-lg px-2 py-2 hover:opacity-60 ${pathname === href ? "font-bold" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            style={{ color: "var(--color-foreground)", fontFamily: "var(--font-body)" }}
            className="text-lg px-2 py-2 text-left hover:text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}