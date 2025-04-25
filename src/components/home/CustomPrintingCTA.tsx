
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CustomPrintingCTA: React.FC = () => {
  return (
    <section className="py-16 bg-corporate text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-4">Custom Printing Solutions</h2>
            <p className="text-lg mb-8 text-white/90">
              Elevate your brand with customized packaging featuring your logo and design. 
              Our high-quality printing services ensure your products stand out and make a 
              lasting impression on your customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-white hover:bg-gray-100 text-corporate-dark font-semibold px-6 py-2"
              >
                <Link to="/custom-printing">
                  Start Designing Now
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white font-semibold px-6 py-2"
              >
                <Link to="/contact">
                  Contact for Bulk Orders
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1601195503754-80c3c740c5a3?q=80&w=300" 
                alt="Custom pizza box" 
                className="rounded-md max-h-full"
              />
            </div>
            <div className="aspect-square bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=300" 
                alt="Custom mailer box" 
                className="rounded-md max-h-full"
              />
            </div>
            <div className="aspect-square bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=300" 
                alt="Custom gift bag" 
                className="rounded-md max-h-full"
              />
            </div>
            <div className="aspect-square bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=300" 
                alt="Custom food packaging" 
                className="rounded-md max-h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPrintingCTA;
