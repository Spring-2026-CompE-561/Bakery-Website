import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Top Wave */}
      <div style={{ background: "var(--color-smooth-pink)", lineHeight: 0, marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 36" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "30px" }}>
          <path d="M0,28 L720,0 L1440,28 L1440,36 L0,36 Z" fill="var(--color-papaya)" />
        </svg>
      </div>

      <footer className="w-full px-6 py-10 text-sm" style={{ background: "var(--color-papaya)", color: "#000" }}>
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-8">
          
          {/* Branding Section */}
          <div className="text-center flex flex-col items-center gap-1">
            <span
              className="font-bold"
              style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "#000" }}
            >
              Seri-Seri Sweets
            </span>
        
          </div>

          {/* Horizontal Contact Info */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <Mail size={16} strokeWidth={2} />
              <span>seriseri.sweets@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} strokeWidth={2} />
              <span>(619) 679-6669</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} strokeWidth={2} />
              <span>Pearl City, Hawaii</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} strokeWidth={2} />
              <span>Pickup Only · Hours Coming Soon</span>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ opacity: 0.4, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} Seri-Seri Sweets
          </div>
        </div>
      </footer>
    </>
  );
}