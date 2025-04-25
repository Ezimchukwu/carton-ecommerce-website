
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer>
      {/* Newsletter Subscription */}
      <div className="bg-kraft py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-corporate-dark mb-1">Subscribe to Our Newsletter</h3>
              <p className="text-gray-700">Get the latest updates, offers, and insights on packaging solutions</p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-l-md focus:outline-none border-y border-l border-gray-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-corporate hover:bg-corporate-dark text-white px-6 py-3 rounded-r-md flex items-center transition-colors"
                >
                  Subscribe <ArrowRight className="ml-2" size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-corporate-dark text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Company Information */}
            <div>
              <h4 className="text-xl font-bold mb-4">
                <span className="text-kraft">Carton</span>Craft
              </h4>
              <p className="text-gray-300 mb-4">
                We offer premium quality carton and packaging solutions for businesses of all sizes. From standard boxes to custom branded packaging, we've got you covered.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="hover:text-kraft-light transition-colors" aria-label="Follow us on Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" className="hover:text-kraft-light transition-colors" aria-label="Follow us on Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://twitter.com" className="hover:text-kraft-light transition-colors" aria-label="Follow us on Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com" className="hover:text-kraft-light transition-colors" aria-label="Subscribe to our YouTube channel">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> About Us
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Products
                  </Link>
                </li>
                <li>
                  <Link to="/custom-printing" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Custom Printing
                  </Link>
                </li>
                <li>
                  <Link to="/wholesale" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Wholesale
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account & Support */}
            <div>
              <h4 className="text-lg font-bold mb-4">Account & Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/account" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> My Account
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-300 hover:text-kraft-light transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2" /> Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-kraft-light" />
                  <span className="text-gray-300">
                    1234 Packaging Street<br />
                    Boxville, CT 56789<br />
                    United States
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-3 flex-shrink-0 text-kraft-light" />
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-kraft-light transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-3 flex-shrink-0 text-kraft-light" />
                  <a href="mailto:info@cartoncraft.com" className="text-gray-300 hover:text-kraft-light transition-colors">
                    info@cartoncraft.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} CartonCraft. All rights reserved.</p>
            <div className="mt-2 md:mt-0">
              <Link to="/terms" className="hover:text-white transition-colors mr-4">Terms & Conditions</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors mr-4">Privacy Policy</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
