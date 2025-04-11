
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminNavbar from '@/components/admin/AdminNavbar';
import HeroEditor from '@/components/admin/HeroEditor';
import TestimonialsEditor from '@/components/admin/TestimonialsEditor';
import StatsEditor from '@/components/admin/StatsEditor';
import BenefitsEditor from '@/components/admin/BenefitsEditor';
import NetworkMembersEditor from '@/components/admin/NetworkMembersEditor';
import MediaLibrary from '@/components/admin/MediaLibrary';
import StylingEditor from '@/components/admin/StylingEditor';
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore } from '@/store/cmsStore';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Force a refresh of the store data when the component loads
  const store = useCMSStore();
  
  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_authenticated');
    if (adminAuth !== 'true') {
      toast({
        title: "Access denied",
        description: "Please login to access the admin dashboard",
        variant: "destructive",
      });
      navigate('/admin-login');
    } else {
      setIsAuthenticated(true);
    }
    
    // Log the current store state
    console.log("CMS Store state in Admin Dashboard:", store);
  }, [navigate, toast, store]);

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen bg-wedding-off-white">
      <AdminNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8 border-b pb-4">Content Management System</h1>
        
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger value="hero" className="rounded-none">Hero Section</TabsTrigger>
            <TabsTrigger value="stats" className="rounded-none">Stats Bar</TabsTrigger>
            <TabsTrigger value="benefits" className="rounded-none">Benefits</TabsTrigger>
            <TabsTrigger value="network" className="rounded-none">Network Members</TabsTrigger>
            <TabsTrigger value="testimonials" className="rounded-none">Testimonials</TabsTrigger>
            <TabsTrigger value="media" className="rounded-none">Media Library</TabsTrigger>
            <TabsTrigger value="styling" className="rounded-none">Styling</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hero" className="bg-white p-6 border border-wedding-light-gray">
            <HeroEditor />
          </TabsContent>
          
          <TabsContent value="stats" className="bg-white p-6 border border-wedding-light-gray">
            <StatsEditor />
          </TabsContent>
          
          <TabsContent value="benefits" className="bg-white p-6 border border-wedding-light-gray">
            <BenefitsEditor />
          </TabsContent>
          
          <TabsContent value="network" className="bg-white p-6 border border-wedding-light-gray">
            <NetworkMembersEditor />
          </TabsContent>
          
          <TabsContent value="testimonials" className="bg-white p-6 border border-wedding-light-gray">
            <TestimonialsEditor />
          </TabsContent>
          
          <TabsContent value="media" className="bg-white p-6 border border-wedding-light-gray">
            <MediaLibrary />
          </TabsContent>
          
          <TabsContent value="styling" className="bg-white p-6 border border-wedding-light-gray">
            <StylingEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
