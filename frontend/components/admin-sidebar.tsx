// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { 
//   LayoutDashboard, 
//   ShoppingBag, 
//   UtensilsCrossed, 
//   Settings, 
//   LogOut,
//   Store
// } from "lucide-react";

// const menuItems = [
//   { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
//   { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
//   { name: "Products", href: "/admin/products", icon: UtensilsCrossed },
//   { name: "Settings", href: "/admin/settings", icon: Settings },
// ];

// export function AdminSidebar() {
//   const pathname = usePathname();

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     window.location.href = "/admin/login";
//   };

//   return (
//     <div 
//       className="flex h-screen w-64 flex-col border-r shadow-sm"
//       style={{ backgroundColor: "#999D55" }} // Sage Green Background
//     >
//       <div className="flex h-16 items-center border-b px-6 bg-white/10">
//         <Store className="h-6 w-6 mr-2 text-[#FFEFD6]" />
//         <span className="text-lg font-bold tracking-tight text-[#FFEFD6]">
//           Bakery Admin
//         </span>
//       </div>

//       <nav className="flex-1 space-y-2 p-4">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;
          
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
//                 isActive 
//                   ? "bg-[#ED7B8D] text-white shadow-md" // Deep Pink for Active
//                   : "text-[#FFEFD6] hover:bg-[#FBC9E4]/20 hover:text-white" // Soft Pink Hover
//               )}
//             >
//               <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-[#FFEFD6]")} />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-white/10">
//         <button
//           onClick={handleLogout}
//           className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#FFEFD6] hover:bg-[#ED7B8D] hover:text-white transition-colors"
//         >
//           <LogOut className="h-5 w-5" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, ShoppingBag, UtensilsCrossed, 
  Settings, LogOut, Store, ChevronLeft, ChevronRight 
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { id: "orders", name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Products", href: "/admin/products", icon: UtensilsCrossed },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/admin/login";
  };

  return (
    <div 
      className={cn(
        "relative flex h-screen flex-col border-r transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
      style={{ backgroundColor: "#999D55" }}
    >
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-[#999D55] hover:bg-[#FFEFD6]"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="flex h-16 items-center border-b px-6 bg-white/10 overflow-hidden">
        <Store className="h-6 w-6 min-w-[24px] text-[#FFEFD6]" />
        {!isCollapsed && (
          <span className="ml-2 text-lg font-bold tracking-tight text-[#FFEFD6] whitespace-nowrap">
            Bakery Admin
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive 
                  ? "bg-[#ED7B8D] text-white shadow-md" 
                  : "text-[#FFEFD6] hover:bg-[#FBC9E4]/20 hover:text-white",
                isCollapsed && "justify-center px-0"
              )}
            >
              <Icon className="h-5 w-5 min-w-[20px]" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#FFEFD6] hover:bg-[#ED7B8D] hover:text-white transition-colors",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5 min-w-[20px]" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}