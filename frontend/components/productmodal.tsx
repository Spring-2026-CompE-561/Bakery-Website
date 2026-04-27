"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ModalProps) {
  const [qty, setQty] = useState(1);
  const numericPrice = parseFloat(product.price.replace('$', ''));
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-[#999D55] p-6 rounded-lg w-full max-w-md shadow-xl">
        <img src={product.img} alt={product.name} className="w-full h-50 object-cover mb-4" />
        
        <h2 className="text-2xl font-bold font-[family-name:var(--font-geist-sans)] text-[#ED7B8D]">{product.name}</h2>
        <p className="text-xl text-black font-medium mb-1">${numericPrice.toFixed(2)}</p>
        <p className="text-black mb-4">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-1 mb-6">
          <Button onClick={() => setQty(Math.max(1, qty - 1))} size="icon" variant="default" className="rounded-full w-6 h-6 flex justify-center text-sm text-white bg-gray-300 hover:bg-gray-500">-</Button>
          <span className="text-xl text-black font-bold">{qty}</span>
          <Button onClick={() => setQty(qty + 1)} size="icon" variant="default" className="rounded-full w-6 h-6 flex justify-center text-sm text-white bg-gray-400 hover:bg-gray-500">+</Button>
        </div>

        
        <div className="flex gap-4">
          
          <Button onClick={onClose} variant="outline" size="icon" className="rounded-full w-12 h-12 bg-black justify-center text-white hover:bg-gray-600">
                <X className="w-5 h-5" />
            </Button>
          <Button onClick={() => { onAddToCart(qty); onClose(); toast.success("Added to cart", {
          description: `${qty}x ${product.name} has been added.`,duration: 2000, style:{border: "2px solid #000",fontSize: "16px",fontWeight:"bold",background: "#ED7B8D"},}); }} variant="outline"
            className="flex-1 bg-[#999D55] hover:bg-[#8a8d4a] text-white w-12 h-12" >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}