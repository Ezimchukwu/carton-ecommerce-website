
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
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
  const { user, logout, isAuthenticated } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
  };

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
              <Link to="/orders" className="w-full cursor-pointer">My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">My Profile</Link>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
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
