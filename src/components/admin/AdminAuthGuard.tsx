
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto h-12 w-12 text-corporate mb-4" />
            <CardTitle>Verifying Access</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
            {user?.email && (
              <p className="text-sm text-gray-500 mt-2">
                Logged in as: {user.email}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-12 w-12 text-corporate mb-4" />
            <CardTitle>Admin Login Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Please log in to access the admin dashboard (Demo Mode).
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Allow access for any authenticated user in demo mode
  console.log('Admin access granted (Demo Mode) for:', user.email);
  return <>{children}</>;
};

export default AdminAuthGuard;
