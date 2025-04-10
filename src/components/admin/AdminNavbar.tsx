
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/admin-login');
  };

  return (
    <nav className="bg-wedding-black text-wedding-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/admin" className="text-xl font-light">
            Wedded CMS
          </Link>
          <Link to="/" className="text-sm hover:underline" target="_blank">
            View Live Site
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-wedding-white hover:bg-wedding-dark-gray"
            onClick={() => navigate('/admin/settings')}
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-wedding-white text-wedding-white hover:bg-wedding-dark-gray"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
