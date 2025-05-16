
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Shield } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-corporate text-white py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            <span className="text-sm">Call Us: 08125160761 / 08038855851</span>
          </div>
          <a 
            href="https://wa.me/2348125160761" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-kraft-light transition-colors"
          >
            <MessageSquare size={16} className="mr-1" />
            <span className="text-sm hidden sm:inline">WhatsApp</span>
          </a>
        </div>
        <div className="text-sm">
          <Link 
            to="/checkout" 
            className="group relative inline-flex items-center px-5 py-1.5 bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 text-white rounded-full transition-all duration-300 shadow-lg shadow-black/10 hover:scale-105"
          >
            <span className="relative z-10 flex items-center font-medium tracking-wide">
              <Shield 
                size={16} 
                className="mr-2 transform group-hover:scale-110 transition-transform duration-300" 
              />
              Track Order
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
