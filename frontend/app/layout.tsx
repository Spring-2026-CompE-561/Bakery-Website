// frontend/app/layout.tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Providers } from "@/components/Providers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { QueryProvider } from "@/components/query-provider";
import { NavbarWrapper } from "@/components/navbarwrapper";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Seri Seri Sweets",
  description: "Filipino desserts — pickup only, Oahu Hawaii",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <QueryProvider>
          < NavbarWrapper /> {/* Show Navbar only on non-admin routes */}
          <main className="flex-grow">{children}</main>
          <Toaster position="top-center"/>
          </QueryProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

