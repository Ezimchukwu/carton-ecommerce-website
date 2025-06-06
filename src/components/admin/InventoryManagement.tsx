
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Package, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const InventoryManagement: React.FC = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    transaction_type: 'in',
    quantity: '',
    notes: ''
  });

  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ['products-for-inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    }
  });

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['inventory-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory_transactions')
        .select(`
          *,
          products (name, category)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const createTransactionMutation = useMutation({
    mutationFn: async (transactionData: any) => {
      const { data, error } = await supabase
        .from('inventory_transactions')
        .insert([{
          ...transactionData,
          quantity: parseInt(transactionData.quantity),
          created_by: user?.id,
          reference_type: 'manual'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['products-for-inventory'] });
      toast.success('Inventory transaction recorded successfully');
      setIsDialogOpen(false);
      setFormData({ product_id: '', transaction_type: 'in', quantity: '', notes: '' });
    },
    onError: (error) => {
      toast.error('Failed to record transaction: ' + error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTransactionMutation.mutate(formData);
  };

  const lowStockProducts = products?.filter(p => p.stock_quantity < 10) || [];
  const outOfStockProducts = products?.filter(p => p.stock_quantity === 0) || [];

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corporate"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-gray-600">Monitor stock levels and manage inventory transactions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Record Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Inventory Transaction</DialogTitle>
              <DialogDescription>
                Add stock in, remove stock out, or adjust stock levels
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="product_id">Product</Label>
                <Select value={formData.product_id} onValueChange={(value) => setFormData({ ...formData, product_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products?.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} (Current: {product.stock_quantity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transaction_type">Transaction Type</Label>
                <Select value={formData.transaction_type} onValueChange={(value) => setFormData({ ...formData, transaction_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">Stock In</SelectItem>
                    <SelectItem value="out">Stock Out</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Reason for transaction..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createTransactionMutation.isPending}>
                  Record Transaction
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stock Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {outOfStockProducts.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Out of Stock ({outOfStockProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {outOfStockProducts.slice(0, 5).map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="font-medium">{product.name}</span>
                      <Badge variant="destructive">0</Badge>
                    </div>
                  ))}
                  {outOfStockProducts.length > 5 && (
                    <p className="text-sm text-gray-500">+{outOfStockProducts.length - 5} more</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {lowStockProducts.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-600">Low Stock ({lowStockProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStockProducts.slice(0, 5).map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="font-medium">{product.name}</span>
                      <Badge variant="outline" className="text-yellow-600">{product.stock_quantity}</Badge>
                    </div>
                  ))}
                  {lowStockProducts.length > 5 && (
                    <p className="text-sm text-gray-500">+{lowStockProducts.length - 5} more</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Stock</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Stock Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category.replace('-', ' ')}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className={
                            product.stock_quantity === 0 ? 'text-red-600 font-bold' :
                            product.stock_quantity < 10 ? 'text-yellow-600 font-semibold' :
                            'text-green-600'
                          }>
                            {product.stock_quantity}
                          </span>
                        </TableCell>
                        <TableCell>
                          {product.stock_quantity === 0 ? (
                            <Badge variant="destructive">Out of Stock</Badge>
                          ) : product.stock_quantity < 10 ? (
                            <Badge variant="outline" className="text-yellow-600">Low Stock</Badge>
                          ) : (
                            <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions?.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{transaction.products?.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {transaction.transaction_type === 'in' ? (
                              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                            ) : transaction.transaction_type === 'out' ? (
                              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                            ) : (
                              <RefreshCw className="h-4 w-4 text-blue-600 mr-1" />
                            )}
                            <Badge variant={
                              transaction.transaction_type === 'in' ? 'default' :
                              transaction.transaction_type === 'out' ? 'destructive' : 'secondary'
                            }>
                              {transaction.transaction_type.replace('_', ' ')}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={
                            transaction.transaction_type === 'in' ? 'text-green-600' :
                            transaction.transaction_type === 'out' ? 'text-red-600' : ''
                          }>
                            {transaction.transaction_type === 'out' ? '-' : '+'}{transaction.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{transaction.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
