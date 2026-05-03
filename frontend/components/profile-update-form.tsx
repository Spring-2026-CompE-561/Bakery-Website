"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, Lock } from "lucide-react";

interface ProfileUpdateFormProps {
  forceLogout: () => void;
}

export function ProfileUpdateForm({ forceLogout }: ProfileUpdateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(data)
      });

      if (res.status === 401) return forceLogout();

      if (!res.ok) {
        const errorData = await res.json();
        return toast.error(errorData.detail || "Update failed.");
      }

      toast.success("Account details updated!", {
        description: "Redirecting to login. Please use your new credentials.",
        duration: 3000,
        style: { border: "2px solid #000", background: "#ED7B8D", fontWeight: "bold" }
      });

      // Allow the user to see the success message before clearing the session
      setTimeout(() => {
        forceLogout();
      }, 3000);

    } catch (err) {
      toast.error("Connection error. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-[#FBC9E4] shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#ED7B8D]">
          <ShieldCheck className="w-5 h-5" />
          Update Security Credentials
        </CardTitle>
        <CardDescription>
          Change your admin email or set a new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">New Email</Label>
              <Input name="email" type="email" placeholder="owner@bakery.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password (Optional)</Label>
              <Input name="password" type="password" placeholder="Leave blank to keep current" />
            </div>
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
            Save Security Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}