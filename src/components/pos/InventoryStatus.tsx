
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Package } from 'lucide-react';

interface InventoryItem {
  _id: string;
  productId: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
}

interface InventoryStatusProps {
  items: InventoryItem[];
  isLoading: boolean;
  onUpdateStock: (id: string, newStock: number) => void;
  emptyMessage?: string;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ 
  items, 
  isLoading, 
  onUpdateStock,
  emptyMessage = "No inventory items found."
}) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [newStock, setNewStock] = useState<number>(0);

  const handleUpdateClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setNewStock(item.currentStock);
    setUpdateDialogOpen(true);
  };

  const handleUpdateStock = () => {
    if (selectedItem && newStock >= 0) {
      onUpdateStock(selectedItem._id, newStock);
      setUpdateDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <Package size={48} className="mb-4 text-gray-400" />
        <p className="text-lg font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[300px]">Product Name</TableHead>
              <TableHead className="text-center">Current Stock</TableHead>
              <TableHead className="text-center">Low Stock Threshold</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const isLowStock = item.currentStock <= item.lowStockThreshold;
              const isOutOfStock = item.currentStock === 0;
              
              return (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${
                      isOutOfStock ? 'text-red-600' : 
                      isLowStock ? 'text-amber-600' : 
                      'text-green-600'
                    }`}>
                      {item.currentStock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{item.lowStockThreshold}</TableCell>
                  <TableCell className="text-center">
                    {isOutOfStock ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        In Stock
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateClick(item)}
                    >
                      Update Stock
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <p><strong>Product:</strong> {selectedItem.productName}</p>
              <p><strong>Current Stock:</strong> {selectedItem.currentStock}</p>
              
              <div className="space-y-2">
                <Label htmlFor="newStock">New Stock Level</Label>
                <Input
                  id="newStock"
                  type="number"
                  min="0"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStock}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryStatus;
