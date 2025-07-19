import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Package2, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const WholesalePage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-corporate-dark mb-4">
                Wholesale Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Get the best deals on bulk orders for your business. We offer competitive wholesale rates and custom packaging solutions for large quantities.
              </p>
              <div className="flex gap-4">
                <Button 
                  asChild 
                  className="bg-corporate hover:bg-corporate-dark"
                >
                  <Link to="/contact">
                    Contact Us Now!
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product15.jpeg" 
                alt="Wholesale carton boxes" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardHeader>
                <Package2 className="h-10 w-10 text-corporate mb-2" />
                <CardTitle>Bulk Discounts</CardTitle>
                <CardDescription>Save up to 40% on large orders with our wholesale pricing structure.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 text-corporate mb-2" />
                <CardTitle>Fast Delivery</CardTitle>
                <CardDescription>Quick turnaround times and nationwide shipping for wholesale orders.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-corporate mb-2" />
                <CardTitle>Dedicated Support</CardTitle>
                <CardDescription>Personal account manager for all our wholesale clients.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Product Categories */}
          <h2 className="text-2xl font-semibold text-corporate-dark mb-8">Our Wholesale Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/Wholsale 2.jpeg" 
                  alt="Shipping Boxes" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Shipping Boxes</h3>
                <p className="text-gray-600">Bulk shipping boxes for e-commerce and retail businesses.</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/Wholsale 1.jpeg" 
                  alt="Food Packaging" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Food Packaging</h3>
                <p className="text-gray-600">Wholesale food-grade packaging solutions.</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/Wholsale 10.jpeg" 
                  alt="Custom Boxes" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Custom Boxes</h3>
                <p className="text-gray-600">Bulk custom-printed boxes for your brand.</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-corporate-dark mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact our wholesale team today to discuss your requirements and get a customized quote for your business.
            </p>
            <Button 
              asChild
              className="bg-corporate hover:bg-corporate-dark text-lg px-8 py-6"
            >
              <Link to="/contact">
                Contact Wholesale Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WholesalePage; 