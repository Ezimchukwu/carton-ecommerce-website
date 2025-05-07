
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { POSOrder } from '@/types/pos.types';

const PosSalesPage = () => {
  // Get today's date in ISO format for API query
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Fetch today's sales data
  const { data: salesData, isLoading, error } = useQuery({
    queryKey: ['pos-sales', todayStr],
    queryFn: async () => {
      const response = await fetch(`/api/pos/orders?startDate=${todayStr}&endDate=${todayStr}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sales data');
      }
      return response.json();
    }
  });

  // Prepare chart data
  const hourlyData = React.useMemo(() => {
    if (!salesData?.orders) return [];

    const hourlyMap = new Map();
    
    // Initialize all hours of the day with 0 sales
    for (let i = 0; i < 24; i++) {
      hourlyMap.set(i, { hour: i, sales: 0, orders: 0 });
    }

    // Aggregate sales data by hour
    salesData.orders.forEach((order: POSOrder) => {
      const orderDate = new Date(order.createdAt);
      const hour = orderDate.getHours();
      
      const current = hourlyMap.get(hour);
      hourlyMap.set(hour, {
        hour,
        sales: current.sales + order.totalAmount,
        orders: current.orders + 1
      });
    });

    // Convert map to array and format hours
    return Array.from(hourlyMap.values()).map(item => ({
      ...item,
      hourFormatted: format(new Date().setHours(item.hour, 0, 0, 0), 'ha')
    }));
  }, [salesData]);

  // Calculate totals
  const totalSales = React.useMemo(() => {
    if (!salesData?.orders) return 0;
    return salesData.orders.reduce((sum: number, order: POSOrder) => sum + order.totalAmount, 0);
  }, [salesData]);

  const totalOrders = salesData?.orders?.length || 0;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // Handle print sales report
  const handlePrintReport = () => {
    window.print();
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    if (!salesData?.orders) return;
    
    const headers = ['Order #', 'Time', 'Items', 'Total', 'Payment Method'];
    const rows = salesData.orders.map((order: POSOrder) => [
      order.orderNumber,
      new Date(order.createdAt).toLocaleTimeString(),
      order.items.length,
      `$${order.totalAmount.toFixed(2)}`,
      order.paymentMethod
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_${todayStr}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Loading sales data...</h1>
          </div>
          <div className="grid gap-4 grid-cols-3 mb-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-20 bg-gray-100" />
                <CardContent className="h-10 bg-gray-50" />
              </Card>
            ))}
          </div>
          <Card className="animate-pulse">
            <div className="h-80 bg-gray-100" />
          </Card>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500">Error loading sales data</h1>
          <p className="mb-4">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
          <Link to="/pos">
            <Button>Return to POS</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 print:p-4">
        <div className="flex items-center justify-between mb-6 print:mb-4">
          <div className="flex items-center space-x-4">
            <Link to="/pos" className="print:hidden">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Today's Sales</h1>
            <p className="text-gray-500">{format(today, 'MMMM d, yyyy')}</p>
          </div>
          
          <div className="flex space-x-2 print:hidden">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={handlePrintReport}>
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Orders Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sales by Hour</CardTitle>
            <CardDescription>Hourly sales performance for today</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hourlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hourFormatted" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" name="Sales ($)" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="orders" name="# of Orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>List of today's transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Order #</th>
                    <th className="text-left py-2 px-4">Time</th>
                    <th className="text-left py-2 px-4">Items</th>
                    <th className="text-right py-2 px-4">Total</th>
                    <th className="text-left py-2 px-4">Payment</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData?.orders?.length > 0 ? (
                    salesData.orders.map((order: POSOrder) => (
                      <tr key={order._id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{order.orderNumber}</td>
                        <td className="py-2 px-4">{format(new Date(order.createdAt), 'h:mm a')}</td>
                        <td className="py-2 px-4">{order.items.length}</td>
                        <td className="py-2 px-4 text-right">${order.totalAmount.toFixed(2)}</td>
                        <td className="py-2 px-4 capitalize">{order.paymentMethod}</td>
                        <td className="py-2 px-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            order.paymentStatus === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : order.paymentStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                        No sales recorded today
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PosSalesPage;
