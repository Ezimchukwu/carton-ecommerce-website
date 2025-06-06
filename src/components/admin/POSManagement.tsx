
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Receipt, BarChart3, Calculator } from 'lucide-react';

const POSManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">POS Management</h2>
        <p className="text-gray-600">Point of Sale system integration and management</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              POS Dashboard
            </CardTitle>
            <CardDescription>
              Access the full POS system for in-store sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Complete point of sale system with product lookup, cart management, and payment processing.
            </p>
            <Button onClick={() => navigate('/pos')} className="w-full">
              Open POS System
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Sales Reports
            </CardTitle>
            <CardDescription>
              View detailed sales analytics and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Comprehensive sales reporting with daily, weekly, and monthly breakdowns.
            </p>
            <Button variant="outline" onClick={() => navigate('/pos-sales')} className="w-full">
              View Sales Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5" />
              Transaction History
            </CardTitle>
            <CardDescription>
              Browse all POS transactions and receipts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Complete history of all point of sale transactions with receipt details.
            </p>
            <Button variant="outline" className="w-full">
              View Transactions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Inventory Integration
            </CardTitle>
            <CardDescription>
              Real-time inventory updates from POS sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Automatic inventory adjustments when products are sold through the POS system.
            </p>
            <Button variant="outline" onClick={() => navigate('/inventory')} className="w-full">
              Manage Inventory
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>POS System Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Sales Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Product search and lookup</li>
                <li>• Shopping cart management</li>
                <li>• Multiple payment methods</li>
                <li>• Receipt generation and printing</li>
                <li>• Real-time tax calculation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Integration Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automatic inventory updates</li>
                <li>• Sales reporting and analytics</li>
                <li>• Customer data collection</li>
                <li>• Transaction history tracking</li>
                <li>• Admin dashboard integration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default POSManagement;
