
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const MyProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Check admin status
  const { data: adminStatus } = useQuery({
    queryKey: ['admin-status', user?.id],
    queryFn: async () => {
      if (!user?.id) return { isAdmin: false };
      
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin status:', error);
          return { isAdmin: false };
        }

        return { isAdmin: !!data };
      } catch (error) {
        console.error('Error:', error);
        return { isAdmin: false };
      }
    },
    enabled: !!user?.id && isAuthenticated
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('Please log in to view your profile');
      navigate('/');
      return;
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate"></div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-corporate-dark mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={user.firstName || ''}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={user.lastName || ''}
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ''}
                      disabled
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="button" disabled>
                      Update Profile (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Account Type</p>
                    <p className="text-sm text-gray-500">
                      {adminStatus?.isAdmin ? 'Administrator' : 'Customer'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">User ID</p>
                    <p className="text-sm text-gray-500 font-mono">
                      {user.id}
                    </p>
                  </div>
                  
                  {adminStatus?.isAdmin && (
                    <Button onClick={() => navigate('/admin')} className="w-full">
                      Admin Dashboard
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full" onClick={() => navigate('/orders')}>
                    View My Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfilePage;
