
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Package, UserCog, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserActionsProps {
  cartItemCount: number;
  setAuthModalOpen: (open: boolean) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ cartItemCount, setAuthModalOpen }) => {
  // Add error boundary for useAuth hook
  let authData;
  try {
    authData = useAuth();
  } catch (error) {
    console.error('useAuth error in UserActions:', error);
    // Return a minimal UI if auth context is not available
    return (
      <div className="hidden md:flex items-center space-x-6">
        <Button 
          variant="ghost" 
          className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors"
          onClick={() => setAuthModalOpen(true)}
        >
          <User size={20} />
          <span>Login</span>
        </Button>
        <Link to="/checkout" className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors">
          <div className="relative">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-corporate text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </Badge>
            )}
          </div>
          <span>Cart</span>
        </Link>
      </div>
    );
  }

  const { user, logout, isAuthenticated, isLoading } = authData;
  
  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
  };

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="hidden md:flex items-center space-x-6">
        <div className="animate-pulse">
          <div className="flex flex-col items-center text-sm">
            <div className="w-5 h-5 bg-gray-300 rounded mb-1"></div>
            <div className="w-8 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        <Link to="/checkout" className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors">
          <div className="relative">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-corporate text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </Badge>
            )}
          </div>
          <span>Cart</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex flex-col lg:flex-row items-center text-xs sm:text-sm text-gray-700 hover:text-corporate transition-colors p-2 min-h-[44px]">
              <User size={16} className="lg:mr-1" />
              <span className="hidden xl:inline">Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border shadow-lg z-50">
            <div className="px-3 py-2">
              <p className="font-medium text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/orders" className="w-full cursor-pointer flex items-center p-3 hover:bg-gray-100">
                <Package size={16} className="mr-2" />
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer flex items-center p-3 hover:bg-gray-100">
                <UserCog size={16} className="mr-2" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 p-3 hover:bg-gray-100">
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          variant="ghost" 
          className="flex flex-col lg:flex-row items-center text-xs sm:text-sm text-gray-700 hover:text-corporate transition-colors p-2 min-h-[44px]"
          onClick={() => setAuthModalOpen(true)}
        >
          <User size={16} className="lg:mr-1" />
          <span className="hidden xl:inline">Login</span>
        </Button>
      )}
      <Link to="/checkout" className="flex flex-col lg:flex-row items-center text-xs sm:text-sm text-gray-700 hover:text-corporate transition-colors p-2 min-h-[44px]">
        <div className="relative lg:mr-1">
          <ShoppingCart size={16} />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-corporate text-white text-xs h-4 w-4 flex items-center justify-center rounded-full text-[10px]">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </Badge>
          )}
        </div>
        <span className="hidden xl:inline">Cart</span>
      </Link>
    </div>
  );
};

export default UserActions;
