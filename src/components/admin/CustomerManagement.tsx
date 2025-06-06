
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Ban, Mail, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

interface CustomerProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: any;
  is_blocked: boolean;
  total_orders: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

const CustomerManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const queryClient = useQueryClient();

  const { data: customers, isLoading } = useQuery({
    queryKey: ['admin-customers', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('customer_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as CustomerProfile[];
    }
  });

  const { data: customerOrders } = useQuery({
    queryKey: ['customer-orders', selectedCustomer?.user_id],
    queryFn: async () => {
      if (!selectedCustomer?.user_id) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', selectedCustomer.user_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedCustomer?.user_id
  });

  const toggleBlockMutation = useMutation({
    mutationFn: async ({ id, is_blocked }: { id: string; is_blocked: boolean }) => {
      const { data, error } = await supabase
        .from('customer_profiles')
        .update({ is_blocked: !is_blocked })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      toast.success('Customer status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update customer: ' + error.message);
    }
  });

  const totalCustomers = customers?.length || 0;
  const activeCustomers = customers?.filter(c => !c.is_blocked).length || 0;
  const blockedCustomers = customers?.filter(c => c.is_blocked).length || 0;
  const totalRevenue = customers?.reduce((sum, c) => sum + (c.total_spent || 0), 0) || 0;

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corporate"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Customer Management</h2>
          <p className="text-gray-600">View and manage customer accounts</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Blocked Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{blockedCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({customers?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers?.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {customer.first_name} {customer.last_name}
                        </div>
                        <div className="text-sm text-gray-500">ID: {customer.user_id?.slice(0, 8)}...</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {customer.phone && <div>{customer.phone}</div>}
                        {customer.address && (
                          <div className="text-gray-500">
                            {typeof customer.address === 'object' ? 
                              Object.values(customer.address).slice(0, 2).join(', ') : 
                              customer.address
                            }
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{customer.total_orders || 0}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">${(customer.total_spent || 0).toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.is_blocked ? 'destructive' : 'default'}>
                        {customer.is_blocked ? 'Blocked' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Customer Details</DialogTitle>
                              <DialogDescription>
                                {selectedCustomer?.first_name} {selectedCustomer?.last_name}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedCustomer && (
                              <Tabs defaultValue="profile" className="w-full">
                                <TabsList>
                                  <TabsTrigger value="profile">Profile</TabsTrigger>
                                  <TabsTrigger value="orders">Orders ({selectedCustomer.total_orders || 0})</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="profile" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Personal Information</h4>
                                      <p><strong>Name:</strong> {selectedCustomer.first_name} {selectedCustomer.last_name}</p>
                                      <p><strong>Phone:</strong> {selectedCustomer.phone || 'Not provided'}</p>
                                      <p><strong>Status:</strong> {selectedCustomer.is_blocked ? 'Blocked' : 'Active'}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Order Statistics</h4>
                                      <p><strong>Total Orders:</strong> {selectedCustomer.total_orders || 0}</p>
                                      <p><strong>Total Spent:</strong> ${(selectedCustomer.total_spent || 0).toFixed(2)}</p>
                                      <p><strong>Joined:</strong> {new Date(selectedCustomer.created_at).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  
                                  {selectedCustomer.address && (
                                    <div>
                                      <h4 className="font-semibold mb-2">Address</h4>
                                      <div className="text-sm text-gray-600">
                                        {typeof selectedCustomer.address === 'object' ? 
                                          Object.entries(selectedCustomer.address).map(([key, value]) => (
                                            <p key={key}><strong>{key}:</strong> {String(value)}</p>
                                          )) :
                                          <p>{selectedCustomer.address}</p>
                                        }
                                      </div>
                                    </div>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="orders">
                                  <div className="space-y-4">
                                    {customerOrders && customerOrders.length > 0 ? (
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {customerOrders.map((order: any) => (
                                            <TableRow key={order.id}>
                                              <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
                                              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                              <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                                              <TableCell>
                                                <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                                  {order.status}
                                                </Badge>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <p className="text-center text-gray-500 py-4">No orders found for this customer</p>
                                    )}
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          size="sm"
                          variant={customer.is_blocked ? "outline" : "destructive"}
                          onClick={() => toggleBlockMutation.mutate({ id: customer.id, is_blocked: customer.is_blocked })}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManagement;
