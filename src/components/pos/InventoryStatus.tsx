
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Filter, PlusCircle, MinusCircle, RefreshCcw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface InventoryItemStatus {
  _id: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
  sku: string;
  category?: string;
  lastUpdated?: string;
}

interface InventoryStatusProps {
  items: InventoryItemStatus[];
  isLoading: boolean;
  onUpdateStock?: (itemId: string, newStock: number) => void;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ 
  items, 
  isLoading,
  onUpdateStock 
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'low' | 'ok'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStockDialog, setShowStockDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItemStatus | null>(null);
  const [stockAdjustment, setStockAdjustment] = useState(0);
  const [view, setView] = useState<'grid' | 'table'>('table');

  // Filter items based on filters and search
  const filteredItems = items.filter(item => {
    // Filter by category
    if (filterCategory && item.category !== filterCategory) return false;
    
    // Filter by status
    if (filterStatus === 'low' && item.currentStock > item.lowStockThreshold) return false;
    if (filterStatus === 'ok' && item.currentStock <= item.lowStockThreshold) return false;
    
    // Filter by search
    if (searchQuery && !item.productName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.sku.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  // Get unique categories for filter
  const categories = [...new Set(items.map(item => item.category).filter(Boolean))];
  
  // Sort items: low stock first, then alphabetically
  const sortedItems = [...filteredItems].sort((a, b) => {
    // Check if a is low stock but b is not
    if (a.currentStock <= a.lowStockThreshold && b.currentStock > b.lowStockThreshold) {
      return -1;
    }
    // Check if b is low stock but a is not
    if (b.currentStock <= b.lowStockThreshold && a.currentStock > a.lowStockThreshold) {
      return 1;
    }
    // If both are in the same stock status, sort alphabetically
    return a.productName.localeCompare(b.productName);
  });

  const handleUpdateStock = () => {
    if (!selectedItem) return;
    
    const newStock = selectedItem.currentStock + stockAdjustment;
    if (newStock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    
    if (onUpdateStock) {
      onUpdateStock(selectedItem._id, newStock);
      toast.success(`Updated stock for ${selectedItem.productName}`);
    }
    
    setShowStockDialog(false);
    setStockAdjustment(0);
  };

  const openStockDialog = (item: InventoryItemStatus) => {
    setSelectedItem(item);
    setStockAdjustment(0);
    setShowStockDialog(true);
  };

  const lowStockCount = items.filter(item => item.currentStock <= item.lowStockThreshold).length;

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">Loading inventory data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <span>Inventory Status</span>
              {lowStockCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {lowStockCount} Low Stock
                </Badge>
              )}
            </CardTitle>
            
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant={view === 'grid' ? "default" : "outline"}
                onClick={() => setView('grid')}
              >
                Grid
              </Button>
              <Button 
                size="sm" 
                variant={view === 'table' ? "default" : "outline"}
                onClick={() => setView('table')}
              >
                Table
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name or SKU"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <select 
                className="border rounded px-2 py-1 text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'low' | 'ok')}
              >
                <option value="all">All Stock</option>
                <option value="low">Low Stock</option>
                <option value="ok">OK Stock</option>
              </select>
            </div>
            
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Button 
                  variant={filterCategory === '' ? "secondary" : "outline"} 
                  size="sm"
                  onClick={() => setFilterCategory('')}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    variant={filterCategory === category ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory(category || '')}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto">
          {sortedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-center text-gray-500 mb-4">No inventory data available</p>
              <Button onClick={() => {
                setSearchQuery('');
                setFilterCategory('');
                setFilterStatus('all');
              }}>
                Clear Filters
              </Button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
              {sortedItems.map(item => {
                const isLowStock = item.currentStock <= item.lowStockThreshold;
                
                return (
                  <div 
                    key={item._id} 
                    className={`border rounded-md p-4 ${
                      isLowStock ? 'border-amber-300 bg-amber-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.productName}</h3>
                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                      </div>
                      {isLowStock ? (
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Current Stock:</span>
                        <span className={isLowStock ? 'font-bold text-amber-700' : ''}>
                          {item.currentStock}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Min. Required:</span>
                        <span>{item.lowStockThreshold}</span>
                      </div>
                      {item.lastUpdated && (
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Last Updated:</span>
                          <span>{formatDate(item.lastUpdated)}</span>
                        </div>
                      )}
                    </div>
                    
                    {onUpdateStock && (
                      <Button 
                        className="w-full mt-3" 
                        size="sm"
                        onClick={() => openStockDialog(item)}
                      >
                        Adjust Stock
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Min Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedItems.map(item => {
                    const isLowStock = item.currentStock <= item.lowStockThreshold;
                    
                    return (
                      <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                        <TableCell>{item.category || 'N/A'}</TableCell>
                        <TableCell className="text-right">{item.currentStock}</TableCell>
                        <TableCell className="text-right">{item.lowStockThreshold}</TableCell>
                        <TableCell>
                          {isLowStock ? (
                            <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                              <AlertTriangle className="h-3 w-3" />
                              Low Stock
                            </Badge>
                          ) : (
                            <Badge variant="success" className="flex items-center gap-1 w-fit bg-green-500">
                              <CheckCircle className="h-3 w-3" />
                              In Stock
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs">
                          {item.lastUpdated ? formatDate(item.lastUpdated) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {onUpdateStock && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openStockDialog(item)}
                            >
                              Adjust
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Stock Adjustment Dialog */}
      <Dialog open={showStockDialog} onOpenChange={setShowStockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock: {selectedItem?.productName}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4 space-y-1">
              <p className="text-sm"><strong>SKU:</strong> {selectedItem?.sku}</p>
              <p className="text-sm"><strong>Current Stock:</strong> {selectedItem?.currentStock}</p>
              <p className="text-sm"><strong>Minimum Stock:</strong> {selectedItem?.lowStockThreshold}</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Adjustment Amount</label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setStockAdjustment(prev => prev - 1)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  
                  <Input
                    type="number"
                    value={stockAdjustment}
                    onChange={(e) => setStockAdjustment(parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setStockAdjustment(prev => prev + 1)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Use positive numbers to add stock, negative to remove.
                </p>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="font-medium">New Stock: {selectedItem ? selectedItem.currentStock + stockAdjustment : 0}</p>
                  
                  {selectedItem && selectedItem.currentStock + stockAdjustment <= selectedItem.lowStockThreshold && (
                    <p className="text-amber-600 text-sm flex items-center mt-2">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      This will result in low stock levels
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStockDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateStock}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryStatus;
