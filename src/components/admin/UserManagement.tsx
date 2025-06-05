
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Shield, ShieldOff, Search } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  user_metadata: any;
}

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  permissions: any;
}

interface UserManagementProps {
  onUpdate: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onUpdate }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchAdminUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Note: In a real app, you'd need admin privileges to list users
      // For now, we'll show a placeholder since regular users can't access auth.users
      setUsers([]);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*');

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      toast.error('Failed to fetch admin users');
    }
  };

  const makeUserAdmin = async () => {
    if (!selectedUserId) {
      toast.error('Please enter a user ID');
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .insert([{
          user_id: selectedUserId,
          role: 'admin',
          permissions: { blog: true, products: true, users: true }
        }]);

      if (error) throw error;
      toast.success('User granted admin privileges');
      setIsDialogOpen(false);
      setSelectedUserId('');
      fetchAdminUsers();
      onUpdate();
    } catch (error) {
      console.error('Error making user admin:', error);
      toast.error('Failed to grant admin privileges');
    }
  };

  const removeAdminPrivileges = async (adminUserId: string) => {
    if (!confirm('Are you sure you want to remove admin privileges from this user?')) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminUserId);

      if (error) throw error;
      toast.success('Admin privileges removed');
      fetchAdminUsers();
      onUpdate();
    } catch (error) {
      console.error('Error removing admin privileges:', error);
      toast.error('Failed to remove admin privileges');
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Users Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Admin Users</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Grant Admin Privileges</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    placeholder="Enter the user's UUID"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    You can find the user ID in the Supabase auth dashboard
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={makeUserAdmin}>
                    Grant Admin Access
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {adminUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No admin users found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((adminUser) => (
                  <TableRow key={adminUser.id}>
                    <TableCell className="font-mono text-sm">{adminUser.user_id}</TableCell>
                    <TableCell>
                      <Badge>{adminUser.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {adminUser.permissions?.blog && <Badge variant="outline">Blog</Badge>}
                        {adminUser.permissions?.products && <Badge variant="outline">Products</Badge>}
                        {adminUser.permissions?.users && <Badge variant="outline">Users</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeAdminPrivileges(adminUser.id)}
                      >
                        <ShieldOff className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* User Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>User Management Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">To view all users:</h4>
              <p className="text-sm text-muted-foreground">
                Visit the Supabase dashboard → Authentication → Users to see all registered users.
              </p>
            </div>
            <div>
              <h4 className="font-medium">To grant admin privileges:</h4>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>Go to Supabase dashboard → Authentication → Users</li>
                <li>Find the user you want to make admin</li>
                <li>Copy their User UID</li>
                <li>Use the "Add Admin" button above to grant them admin access</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
