
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // Check if user is admin
  const { data: adminStatus, isLoading: adminLoading, error: adminError } = useQuery({
    queryKey: ['admin-status', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log('No user ID available for admin check');
        return { isAdmin: false };
      }
      
      console.log('Checking admin status for user:', user.id);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        throw error;
      }

      const isAdmin = !!data;
      console.log('Admin status result:', isAdmin);
      return { isAdmin };
    },
    enabled: !!user?.id && isAuthenticated,
    retry: 3,
    retryDelay: 1000
  });

  // Show loading state while checking authentication or admin status
  if (authLoading || (isAuthenticated && adminLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto h-12 w-12 text-corporate mb-4" />
            <CardTitle>Verifying Access</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate mx-auto mb-4"></div>
            <p className="text-gray-600">
              {authLoading ? 'Checking authentication...' : 'Verifying admin privileges...'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated || !user) {
    console.log('User not authenticated, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Show error state if admin check failed
  if (adminError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <CardTitle className="text-red-600">Access Verification Failed</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Unable to verify admin privileges. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if not admin
  if (adminStatus && !adminStatus.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <CardTitle className="text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You don't have administrator privileges to access this area.
            </p>
            <p className="text-sm text-gray-500">
              Logged in as: {user.email}
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render admin dashboard if all checks pass
  return <>{children}</>;
};

export default AdminAuthGuard;
