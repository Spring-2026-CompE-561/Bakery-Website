// frontend/app/layout.tsx
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata = {
  title: "Sari Sari Sweets",
  description: "Filipino desserts — pickup only, Oahu Hawaii",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}