
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminNav: React.FC = () => {
  const location = useLocation();
  
  const adminLinks = [
    { name: 'POS Dashboard', path: '/admin/pos' },
    { name: 'Sales Reports', path: '/pos/sales' },
    { name: 'Inventory', path: '/admin/inventory' },
    { name: 'Home', path: '/' }, // Added Home link for easier navigation
  ];

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast.success("Successfully logged out of admin panel");
    // Navigate to home page after logout
    window.location.href = '/';
  };

  // Only show if we're on an admin page
  if (!location.pathname.includes('/admin') && 
      !location.pathname.includes('/pos')) {
    return null;
  }

  return (
    <div className="bg-gray-800 text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4 font-semibold flex items-center">
            <Lock size={16} className="mr-2" />
            Admin Panel:
          </div>
          <div className="flex space-x-4">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1 rounded ${
                  location.pathname === link.path 
                    ? 'bg-primary text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-300 hover:text-white hover:bg-gray-700"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" /> 
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminNav;
