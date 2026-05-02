
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Loader2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_available: boolean;
  picture_url: string | null;
  badge: string | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // State for the form (handles both Add and Edit)
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const forceLogout = () => {
    toast.error("Session expired. Redirecting...");
    localStorage.removeItem("access_token");
    window.location.href = "/admin/login";
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/products/", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (res.status === 401) return forceLogout();
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      forceLogout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    
    const isEditing = !!editingProduct?.id;
    const url = isEditing 
      ? `http://127.0.0.1:8000/api/v1/products/${editingProduct.id}`
      : `http://127.0.0.1:8000/api/v1/products/`;
    
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(editingProduct)
      });

      if (!res.ok) throw new Error();
      
      toast.success(isEditing ? "Product updated" : "Product created");
      fetchProducts();
      setIsOpen(false);
      setEditingProduct(null);
    } catch (err) {
      toast.error("Failed to save product. Check backend.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const toggleAvailability = async (productId: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({ is_available: !currentStatus })
      });
      if (!res.ok) throw new Error();
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_available: !currentStatus } : p));
      toast.success("Availability updated");
    } catch (err) {
      forceLogout();
    }
  };

  if (isLoading) return <div className="p-8 text-[#999D55]">Loading inventory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#999D55]">Product Inventory</h1>
        
        <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if(!val) setEditingProduct(null); }}>
          <DialogTrigger asChild>
            <Button className="bg-[#999D55] hover:bg-[#888b4a]" onClick={() => setEditingProduct({ is_available: true })}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingProduct?.id ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  value={editingProduct?.name || ""} 
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01"
                    value={editingProduct?.price || ""} 
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge (Optional)</Label>
                  <Input 
                    id="badge" 
                    placeholder="e.g. New, Vegan"
                    value={editingProduct?.badge || ""} 
                    onChange={(e) => setEditingProduct({...editingProduct, badge: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea 
                  id="desc" 
                  value={editingProduct?.description || ""} 
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Picture URL (Direct Link)</Label>
                <Input 
                  id="url" 
                  placeholder="https://..."
                  value={editingProduct?.picture_url || ""} 
                  onChange={(e) => setEditingProduct({...editingProduct, picture_url: e.target.value})}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#999D55]" disabled={isSubmitLoading}>
                  {isSubmitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingProduct?.id ? "Update Product" : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-[#FBC9E4]">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.picture_url || 'https://placehold.co/100x100?text=No+Img'} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded-md border"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=No+Img'; }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.name}
                    <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.badge && <Badge className="bg-[#FBC9E4] text-[#999D55]">{product.badge}</Badge>}
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={product.is_available} 
                      onCheckedChange={() => toggleAvailability(product.id, product.is_available)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingProduct(product); setIsOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}