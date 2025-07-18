import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-corporate-dark to-corporate text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607166452427-7e4477079cb9')] bg-cover bg-center opacity-20"></div>
      
      <div className="container relative z-10 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
            Premium Packaging Solutions for Your Business
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-100 leading-relaxed">
            From standard cartons to custom-designed packaging, we deliver quality, eco-friendly solutions that elevate your brand.
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            <Button 
              asChild
              className="bg-kraft hover:bg-kraft-dark text-corporate-dark font-semibold px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 text-sm sm:text-base md:text-lg min-h-[44px]"
            >
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-white font-semibold px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 text-sm sm:text-base md:text-lg min-h-[44px]"
            >
              <Link to="/custom-printing" className="flex items-center justify-center">
                <span>Custom Solutions</span>
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">1000+</div>
              <div className="text-xs sm:text-sm">Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">98%</div>
              <div className="text-xs sm:text-sm">Customer Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">24/7</div>
              <div className="text-xs sm:text-sm">Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">48hr</div>
              <div className="text-xs sm:text-sm">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
