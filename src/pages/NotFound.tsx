
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl md:text-9xl font-bold text-kraft-dark mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-corporate-dark">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-corporate hover:bg-corporate-dark text-white">
              <Link to="/" className="flex items-center">
                <Home size={18} className="mr-2" /> Return Home
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/products" className="flex items-center">
                <Search size={18} className="mr-2" /> Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
