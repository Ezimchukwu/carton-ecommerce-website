
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Check if the user is authenticated as admin
const isAdminAuthenticated = () => {
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

interface AdminAuthenticationProps {
  children: React.ReactNode;
}

const AdminAuthentication: React.FC<AdminAuthenticationProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const authStatus = isAdminAuthenticated();
    setAuthenticated(authStatus);
  }, []);

  // If authentication state is still loading
  if (authenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Loading Admin Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, redirect to home
  if (authenticated === false) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AdminAuthentication;
