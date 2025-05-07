
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, ShoppingCart, ArrowLeft, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PosHeaderProps {
  onClearCart: () => void;
}

const PosHeader: React.FC<PosHeaderProps> = ({ onClearCart }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold">Point of Sale</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-gray-700"
            onClick={onClearCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
          
          <Link to="/pos/sales">
            <Button variant="secondary">
              <BarChart className="mr-2 h-4 w-4" />
              Today's Sales
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PosHeader;
