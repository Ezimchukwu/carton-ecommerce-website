import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package2, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomPrintingPage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-corporate-dark mb-4">
                Custom Printing Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Elevate your brand with customized packaging featuring your logo and design. Our high-quality printing services ensure your products stand out and make a lasting impression on your customers.
              </p>
              <div className="flex gap-4">
                <Button 
                  asChild
                  variant="outline"
                  className="bg-corporate hover:bg-corporate-light border-2 border-corporate text-white font-semibold transition-colors"
                >
                  <Link to="/contact">
                    Contact for Bulk Orders
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product1.jpeg" 
                alt="Custom carton box with logo" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardHeader>
                <Package2 className="h-10 w-10 text-corporate mb-2" />
                <CardTitle>Custom Designs</CardTitle>
                <CardDescription>Get your logo and branding printed on any packaging solution we offer.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 text-corporate mb-2" />
                <CardTitle>Quick Turnaround</CardTitle>
                <CardDescription>Fast production and delivery times to meet your business needs.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-corporate mb-2" />
                <CardTitle>Expert Support</CardTitle>
                <CardDescription>Our design team will help bring your vision to life.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Gallery Grid */}
          <h2 className="text-2xl font-semibold text-corporate-dark mb-8">Our Custom Printing Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <img src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product8.jpeg" alt="Custom printed box" className="rounded-lg shadow-md aspect-square object-cover" />
            <img src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product12.jpeg" alt="Custom printed box" className="rounded-lg shadow-md aspect-square object-cover" />
            <img src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product15.jpeg" alt="Custom printed box" className="rounded-lg shadow-md aspect-square object-cover" />
            <img src="https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product16.jpeg" alt="Custom printed box" className="rounded-lg shadow-md aspect-square object-cover" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomPrintingPage; 