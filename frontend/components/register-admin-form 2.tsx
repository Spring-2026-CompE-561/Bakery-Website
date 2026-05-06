"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus, Lock } from "lucide-react";

interface RegisterAdminFormProps {
  onSuccess?: () => void;
  forceLogout: () => void;
}

export function RegisterAdminForm({ onSuccess, forceLogout }: RegisterAdminFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(data)
      });

      if (res.status === 401) return forceLogout();

      if (!res.ok) {
        const errorData = await res.json();
        return toast.error(errorData.detail || "Registration failed.");
      }

      toast.success("New Admin Registered!", {
        description: `${data.name} can now log in.`,
        duration: 4000,
        style: { border: "2px solid #000", background: "#999D55", color: "#fff", fontWeight: "bold" }
      });

      (e.target as HTMLFormElement).reset();
      if (onSuccess) onSuccess();

    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-[#FBC9E4] shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#ED7B8D]">
          <UserPlus className="w-5 h-5" />
          Add New Staff Member
        </CardTitle>
        <CardDescription>
          Create a new account for a bakery worker or business partner.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Full Name</Label>
              <Input name="name" id="new-name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">Email Address</Label>
              <Input name="email" id="new-email" type="email" placeholder="staff@bakery.com" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">Temporary Password</Label>
            <Input name="password" id="new-password" type="password" required />
          </div>

          <div className="pt-4 border-t border-dashed border-[#FBC9E4]">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-amber-800 font-semibold">
                <Lock className="w-4 h-4" />
                Verification Required
              </div>
              <div className="space-y-2">
                <Label htmlFor="current_password">Confirm Current Admin Password</Label>
                <Input 
                  name="current_password" 
                  type="password" 
                  placeholder="Required to save changes" 
                  required 
                  className="bg-white border-amber-300 focus-visible:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <Button className="bg-[#999D55] hover:bg-[#888b4a] w-full md:w-auto" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}