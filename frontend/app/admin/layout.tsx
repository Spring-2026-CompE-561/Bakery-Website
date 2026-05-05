
"use client";

import { AdminSidebar } from "@/components/admin-sidebar"; 
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminNavbar from "@/components/admin-navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      if (!isLoginPage) {
        router.push("/admin/login");
      }
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname, isLoginPage]);

  // Authorization Loading State
  if (!isAuthorized && !isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#999D55]">
        Verifying admin session...
      </div>
    );
  }

  // LOGIN PAGE LAYOUT (No Nav, No Sidebar)
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    );
  }

  // FULL ADMIN DASHBOARD LAYOUT
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50"> 
      <AdminNavbar /> 

      <div className="flex flex-1 w-full">
        <AdminSidebar /> 

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
