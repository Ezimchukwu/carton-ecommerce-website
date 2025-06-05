
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Move } from 'lucide-react';
import { toast } from 'sonner';

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  order: number;
  isActive: boolean;
}

const CMSNavigation: React.FC = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([
    { id: '1', label: 'Home', url: '/', order: 1, isActive: true },
    { id: '2', label: 'Products', url: '/products', order: 2, isActive: true },
    { id: '3', label: 'About', url: '/about', order: 3, isActive: true },
    { id: '4', label: 'Contact', url: '/contact', order: 4, isActive: true },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setNavigationItems(items =>
        items.map(item =>
          item.id === editingItem.id
            ? { ...item, label: formData.label, url: formData.url }
            : item
        )
      );
      toast.success('Navigation item updated');
    } else {
      const newItem: NavigationItem = {
        id: Date.now().toString(),
        label: formData.label,
        url: formData.url,
        order: navigationItems.length + 1,
        isActive: true
      };
      setNavigationItems(items => [...items, newItem]);
      toast.success('Navigation item added');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this navigation item?')) return;
    
    setNavigationItems(items => items.filter(item => item.id !== id));
    toast.success('Navigation item deleted');
  };

  const resetForm = () => {
    setFormData({ label: '', url: '' });
    setEditingItem(null);
  };

  const openEditDialog = (item: NavigationItem) => {
    setEditingItem(item);
    setFormData({ label: item.label, url: item.url });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Website Navigation</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Navigation Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? 'Update' : 'Add'} Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {navigationItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.order}</TableCell>
                <TableCell className="font-medium">{item.label}</TableCell>
                <TableCell>{item.url}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Move className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CMSNavigation;
