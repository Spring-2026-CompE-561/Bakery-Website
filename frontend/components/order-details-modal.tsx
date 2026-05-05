"use client";

import { Order } from "@/types/admin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReceiptText, Package, Calendar, Clock, Mail } from "lucide-react";

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string; 
  quantity: number;
  unit_price: number;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] border-[#FBC9E4]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#999D55] text-2xl">
            <ReceiptText className="w-6 h-6" />
            Order #{order.id}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Info Section */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Package className="w-4 h-4 text-[#ED7B8D]" />
              <span>{order.customer_name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>{order.customer_email}</span>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-[#999D55]" />
              <span>{order.pickup_date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-[#999D55]" />
              <span>{order.pickup_time}</span>
            </div>
          </div>

          {/* Items List */}
          <div className="border-t border-b border-dashed border-[#FBC9E4] py-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Order Items</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">Product: {item.product_name}</span>
                    <span className="text-xs text-gray-400">${item.unit_price.toFixed(2)} per unit</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{item.quantity}x</span>
                    <p className="font-mono text-[#ED7B8D]">${(item.quantity * item.unit_price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center bg-[#999D55]/5 p-4 rounded-lg">
            <span className="text-lg font-bold text-[#999D55]">Total</span>
            <span className="text-2xl font-bold text-[#999D55]">${order.total_price.toFixed(2)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}