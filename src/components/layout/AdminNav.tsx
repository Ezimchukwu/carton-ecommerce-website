
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const AdminNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Back to Site', path: '/', icon: null },
  ];

  // Function to handle logout
  const handleLogout = () => {
    supabase.auth.signOut();
    toast.success("Successfully logged out");
    navigate('/');
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <div className="mr-4 font-bold text-xl text-corporate-dark">
            Admin Panel
          </div>
          <div className="hidden md:flex space-x-6">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1 rounded flex items-center ${
                  location.pathname === link.path 
                    ? 'bg-corporate text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.icon && <link.icon size={16} className="mr-2" />}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {user?.email}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" /> 
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
