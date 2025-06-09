
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
    <div className="hidden md:flex items-center space-x-6">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors">
              <User size={20} />
              <span>Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-2 py-1.5">
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/orders" className="w-full cursor-pointer flex items-center">
                <Package size={16} className="mr-2" />
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer flex items-center">
                <UserCog size={16} className="mr-2" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          variant="ghost" 
          className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors"
          onClick={() => setAuthModalOpen(true)}
        >
          <User size={20} />
          <span>Login</span>
        </Button>
      )}
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
};

export default UserActions;
