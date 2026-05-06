"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // If the path starts with /admin, don't show the customer navbar
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) return null;
    
  return <Navbar />;
}