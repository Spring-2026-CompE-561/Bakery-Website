
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Order } from "@/types/admin";
import { Card, CardContent } from "@/components/ui/card";
import { OrderDetailsModal } from "@/components/order-details-modal";
import { CheckCircle2, Clock, Package, XCircle, AlertCircle, CheckCircle } from "lucide-react";

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_newest");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);


  // if the backend is disconnected or returns 401, force logout and redirect to login page
  const forceLogout = () => {
    toast.error("Connection lost or unauthorized. Redirecting...");
    localStorage.removeItem("access_token");
    setTimeout(() => { window.location.href = "/admin/login"; }, 1500);
  };

  // Fetch orders from the backend API
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/orders/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Accept": "application/json",
        }
      });
      if (res.status === 401) return forceLogout();
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      forceLogout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

 // Sort orders based on the selected criteria
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "created_newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortBy === "created_oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    if (sortBy === "pickup_soonest") return new Date(a.pickup_date).getTime() - new Date(b.pickup_date).getTime();
    return 0;
  });

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({ status: newStatus }), 
      });

      
      if (response.status === 401) return forceLogout();
      if (!response.ok) throw new Error();
      
      toast.success(`Order #${orderId} updated`);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      // If the backend is disconnected during the click, kick to login
      forceLogout();
    }
  };

  const getStatusIcon = (status: string) => {
    const s = status.toUpperCase();
    if (s === "PENDING") return <Clock className="w-4 h-4 text-amber-500" />;
    if (s === "READY") return <Package className="w-4 h-4 text-green-500" />;
    if (s === "CONFIRMED") return <CheckCircle className="w-4 h-4 text-orange-500" />;
    if (s === "COMPLETED") return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (s === "CANCELLED") return <XCircle className="w-4 h-4 text-red-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-400" />;
  };

  if (isLoading) return <div className="p-8 text-[#999D55]">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#999D55]">Orders</h1>
        
     
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_newest">Newest Created</SelectItem>
              <SelectItem value="created_oldest">Oldest Created</SelectItem>
              <SelectItem value="pickup_soonest">Soonest Pickup</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pickup Date</TableHead>
                <TableHead>Pickup Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.map((order) => (
                <TableRow key={order.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{order.customer_name || "Guest"}</TableCell>
                  <TableCell>${order.total_price.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.pickup_date ? new Date(order.pickup_date).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>{order.pickup_time || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <Select defaultValue={order.status.toLowerCase()} onValueChange={(v) => handleStatusChange(order.id, v)}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <OrderDetailsModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />  
    </div>
  );
}