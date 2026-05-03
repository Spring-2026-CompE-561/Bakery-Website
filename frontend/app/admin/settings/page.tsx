"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileUpdateForm } from "@/components/profile-update-form";
import { RegisterAdminForm } from "@/components/register-admin-form";

export default function SettingsPage() {
    
  // Shared logout logic used by child components
  const forceLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-[#999D55]">Settings</h1>
        <p className="text-muted-foreground">Manage your account security and staff access.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#FBC9E4]/20 border border-[#FBC9E4] h-12">
          <TabsTrigger value="profile" className="text-md font-medium">My Account</TabsTrigger>
          <TabsTrigger value="admins" className="text-md font-medium">Staff Management</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <ProfileUpdateForm forceLogout={forceLogout} />
        </TabsContent>

        <TabsContent value="admins" className="mt-6">
          <RegisterAdminForm forceLogout={forceLogout} />
        </TabsContent>
      </Tabs>
    </div>
  );
}