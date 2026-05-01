// frontend/app/layout.tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Providers } from "@/components/Providers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Sari Sari Sweets",
  description: "Filipino desserts — pickup only, Oahu Hawaii",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Toaster position="top-center"/>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

