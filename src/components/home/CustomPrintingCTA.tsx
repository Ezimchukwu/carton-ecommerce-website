import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CustomPrintingCTA: React.FC = () => {
  return (
    <section className="bg-corporate-dark text-white py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Custom Printing Solutions
            </h2>
            <p className="text-lg mb-8 text-gray-100 leading-relaxed">
              Elevate your brand with customized packaging featuring your logo and design. 
              Our high-quality printing services ensure your products stand out and make 
              a lasting impression on your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-white text-corporate-dark hover:bg-gray-100 font-semibold px-8 py-3"
              >
                <Link to="/custom-printing">
                  Start Designing Now
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-corporate hover:bg-corporate-light border-2 border-white text-white font-semibold px-8 py-3 transition-colors"
              >
                <Link to="/contact">
                  Contact for Bulk Orders
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Left Column */}
              <div className="grid gap-4 md:gap-6">
                <div className="aspect-square overflow-hidden rounded-xl shadow-lg bg-white/5">
                  <img
                    src="/IMAGES/Wholsale 10.jpeg"
                    alt="Custom carton box with logo"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-lg bg-white/5">
                  <img
                    src="/IMAGES/Wholsale 11.jpeg"
                    alt="Custom gift packaging"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="grid gap-4 md:gap-6">
                <div className="aspect-square overflow-hidden rounded-xl shadow-lg bg-white/5">
                  <img
                    src="/IMAGES/Wholsale 15.jpeg"
                    alt="Custom printed boxes"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-lg bg-white/5">
                  <img
                    src="/IMAGES/Wholsale 8.jpeg"
                    alt="Custom packaging example"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-corporate/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-corporate/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPrintingCTA;
