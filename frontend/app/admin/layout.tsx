"use client";

import { AdminSidebar } from "@/components/admin-sidebar"; 
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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

  
  if (!isAuthorized && !isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#999D55]">
        Verifying admin session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {!isLoginPage && <AdminSidebar />} 
    
      <main className={`flex-1 bg-muted/10 ${isLoginPage ? "" : "p-8"}`}>
        <div className={isLoginPage ? "" : "max-w-6xl mx-auto"}>
          {children}
        </div>
      </main>
    </div>
  );
}