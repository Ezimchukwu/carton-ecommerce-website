
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PosHeader from '@/components/pos/PosHeader';
import PosCart from '@/components/pos/PosCart';
import ProductsSection from '@/components/pos/ProductsSection';
import PaymentProcessor from '@/components/pos/PaymentProcessor';
import InventoryStatus from '@/components/pos/InventoryStatus';
import { useCartManagement } from '@/hooks/useCartManagement';
import { useProductSearch } from '@/hooks/useProductSearch';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, ShoppingBag, AlertTriangle } from 'lucide-react';

const POSDashboard = () => {
  // Use our custom hooks
  const { 
    cart, 
    subtotal, 
    tax, 
    total, 
    handleAddToCart, 
    handleRemoveFromCart, 
    handleUpdateQuantity, 
    handleClearCart,
    setCart
  } = useCartManagement();
  
  const {
    products,
    categories,
    isLoading: productsLoading,
    error: productsError,
    handleSearch,
    handleCategoryChange
  } = useProductSearch();

  const {
    inventoryItems,
    inventoryHistory,
    isLoading: inventoryLoading,
    error: inventoryError,
    updateInventoryItem
  } = useInventoryStatus();

  // For sales summary
  const [salesSummary, setSalesSummary] = useState({
    today: { count: 0, total: 0 },
    week: { count: 0, total: 0 },
    month: { count: 0, total: 0 },
  });

  // Mock sales data
  useEffect(() => {
    setTimeout(() => {
      setSalesSummary({
        today: { count: 12, total: 459.97 },
        week: { count: 47, total: 1862.50 },
        month: { count: 189, total: 7125.35 },
      });
    }, 1000);
  }, []);

  // Handle order completion (clear cart)
  const handleOrderComplete = () => {
    // Update inventory when order is completed
    cart.forEach(item => {
      const product = item.product;
      const inventoryItem = inventoryItems.find(invItem => 
        invItem._id === product._id || 
        (typeof invItem.product === 'object' && invItem.product._id === product._id)
      );
      
      if (inventoryItem) {
        const newStock = Math.max(0, inventoryItem.currentStock - item.quantity);
        updateInventoryItem(inventoryItem._id, newStock);
      }
    });
    
    // Clear cart
    setCart([]);
    
    // Update sales summary (simple mock update)
    setSalesSummary(prev => ({
      ...prev,
      today: {
        count: prev.today.count + 1,
        total: prev.today.total + total
      }
    }));
  };

  // Handle any errors
  if (productsError || inventoryError) {
    return (
      <div className="text-center p-8">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
        <p className="text-gray-600 mb-4">{productsError?.toString() || inventoryError?.toString()}</p>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  // Count low stock items
  const lowStockCount = inventoryItems.filter(item => 
    item.currentStock <= item.lowStockThreshold
  ).length;

  return (
    <Layout>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden">
        <PosHeader onClearCart={handleClearCart} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side: Products Section + Inventory Status */}
          <div className="w-2/3 flex flex-col overflow-hidden">
            <Tabs defaultValue="products" className="w-full flex flex-col h-full">
              <div className="px-4 pt-2">
                <TabsList className="mb-2">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="products" className="flex-1 overflow-hidden px-4 pb-4">
                <ProductsSection
                  products={products || []}
                  isLoading={productsLoading}
                  categories={categories || []}
                  onAddToCart={handleAddToCart}
                  onSearch={handleSearch}
                  onCategoryChange={handleCategoryChange}
                />
              </TabsContent>
              
              <TabsContent value="inventory" className="h-full overflow-auto px-4 pb-4">
                <InventoryStatus 
                  items={inventoryItems} 
                  isLoading={inventoryLoading}
                  onUpdateStock={updateInventoryItem}
                />
              </TabsContent>

              <TabsContent value="dashboard" className="flex-1 overflow-auto px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Today's Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold">${salesSummary.today.total.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">{salesSummary.today.count} orders</div>
                        </div>
                        <BarChart3 className="h-8 w-8 text-primary opacity-80" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Weekly Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold">${salesSummary.week.total.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">{salesSummary.week.count} orders</div>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500 opacity-80" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Monthly Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold">${salesSummary.month.total.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">{salesSummary.month.count} orders</div>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-blue-500 opacity-80" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Inventory Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Total Products:</span>
                          <span className="font-semibold">{inventoryItems.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Low Stock Items:</span>
                          <span className={`font-semibold ${lowStockCount > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                            {lowStockCount}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Out of Stock Items:</span>
                          <span className="font-semibold text-red-600">
                            {inventoryItems.filter(item => item.currentStock === 0).length}
                          </span>
                        </div>
                      </div>
                      
                      {lowStockCount > 0 && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm">
                          <div className="flex items-center text-amber-600 font-medium mb-2">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Low Stock Alerts
                          </div>
                          <ul className="space-y-1 pl-5 list-disc">
                            {inventoryItems
                              .filter(item => item.currentStock <= item.lowStockThreshold)
                              .slice(0, 5)
                              .map(item => (
                                <li key={item._id} className="text-sm">
                                  {item.productName} ({item.currentStock} left)
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Stock Changes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {inventoryHistory && inventoryHistory.length > 0 ? (
                        <div className="space-y-3">
                          {inventoryHistory.slice(0, 5).map((entry) => (
                            <div key={entry.id} className="flex justify-between items-center border-b pb-2">
                              <div>
                                <p className="font-medium">{entry.productName}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(entry.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className={`font-medium ${
                                  entry.changeType === 'add' ? 'text-green-600' : 
                                  entry.changeType === 'remove' ? 'text-red-600' : 'text-blue-600'
                                }`}>
                                  {entry.changeType === 'add' ? '+' : ''}{entry.quantityChange}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {entry.previousStock} → {entry.newStock}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">No recent stock changes</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Side: Cart Section */}
          <div className="w-1/3 border-l border-gray-200 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <PosCart 
                  items={cart}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  onRemoveItem={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onCheckout={() => {}} // We'll handle checkout in PaymentProcessor
                />
              </div>
              
              {/* Payment Processor */}
              <div className="p-4 bg-white border-t border-gray-200">
                <PaymentProcessor
                  cart={cart}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  onOrderComplete={handleOrderComplete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default POSDashboard;
