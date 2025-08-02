
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { FileText, Package, Truck, CheckCircle, Clock } from 'lucide-react';

// Mock data for orders until backend is connected
const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    date: '2025-05-15',
    status: 'delivered',
    total: 12550,
    items: [
      { id: 1, name: 'Medium Pizza Box', quantity: 5, price: 1150, image: '/IMAGES/product2.jpeg' },
      { id: 2, name: 'Gift Bag (Large)', quantity: 2, price: 3500, image: '/IMAGES/product9.jpeg' }
    ]
  },
  {
    id: 'ORD-002',
    date: '2025-05-10',
    status: 'processing',
    total: 9800,
    items: [
      { id: 3, name: 'Mailer Box (Small)', quantity: 10, price: 850, image: '/IMAGES/product3.jpeg' },
      { id: 4, name: 'Wrapping Paper Roll', quantity: 1, price: 1300, image: '/IMAGES/product6.jpeg' }
    ]
  }
];

const MyOrdersPage = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      toast.error("Please login to view your orders");
      navigate('/');
    }
    
    // In a real app, fetch orders from API
    // const fetchOrders = async () => {
    //   const response = await fetch('/api/orders');
    //   const data = await response.json();
    //   setOrders(data);
    // };
    // fetchOrders();
  }, [isAuthenticated, navigate]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'processing':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-indigo-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-corporate-dark mb-6">My Orders</h1>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">No Orders Yet</h2>
              <p className="text-gray-500 mt-2 mb-6">You haven't placed any orders yet.</p>
              <Button onClick={() => navigate('/products')}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id} className="overflow-hidden">
                <div className="bg-gray-50 p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="font-semibold text-lg">Order #{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦{order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">${(order.total / 1550).toFixed(2)}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Order Items</h3>
                  
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₦{item.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">${(item.price / 1550).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline">Track Order</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrdersPage;
