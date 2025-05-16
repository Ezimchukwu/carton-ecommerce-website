
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, ShoppingCart, ArrowLeft, BarChart, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface PosHeaderProps {
  onClearCart?: () => void;
  title?: string;
}

const PosHeader: React.FC<PosHeaderProps> = ({ onClearCart, title = "Point of Sale" }) => {
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast.success("Successfully logged out of admin panel");
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center">
            <Lock size={18} className="mr-2" />
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {onClearCart && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-gray-700"
              onClick={onClearCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          )}
          
          <Link to="/pos/sales">
            <Button variant="secondary">
              <BarChart className="mr-2 h-4 w-4" />
              Today's Sales
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            className="text-white hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PosHeader;
