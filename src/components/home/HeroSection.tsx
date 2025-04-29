import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-corporate-dark to-corporate text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607166452427-7e4477079cb9')] bg-cover bg-center opacity-20"></div>
      
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Premium Packaging Solutions for Your Business
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            From standard cartons to custom-designed packaging, we deliver quality, eco-friendly solutions that elevate your brand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="bg-kraft hover:bg-kraft-dark text-corporate-dark font-semibold px-8 py-6 text-lg"
            >
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-white font-semibold px-8 py-6 text-lg"
            >
              <Link to="/custom-printing" className="flex items-center">
                Custom Solutions <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm">Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">Customer Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">48hr</div>
              <div className="text-sm">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
