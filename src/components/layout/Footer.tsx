
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
      <div className="bg-kraft py-6 sm:py-8 md:py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-corporate-dark mb-1 sm:mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-sm sm:text-base text-gray-700">Get the latest updates, offers, and insights on packaging solutions</p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <form className="flex flex-col xs:flex-row gap-2 xs:gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-3 py-3 sm:px-4 sm:py-3 rounded-md xs:rounded-l-md xs:rounded-r-none focus:outline-none border border-gray-300 text-sm sm:text-base min-h-[44px]"
                  required
                />
                <button
                  type="submit"
                  className="bg-corporate hover:bg-corporate-dark text-white px-4 py-3 sm:px-6 sm:py-3 rounded-md xs:rounded-l-none xs:rounded-r-md flex items-center justify-center transition-colors text-sm sm:text-base min-h-[44px]"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-corporate-dark text-white py-8 sm:py-10 md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Information */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                <span className="text-kraft">PAPER</span> PACKAGING COMPANY
              </h4>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                We offer premium quality carton and packaging solutions for businesses of all sizes. From standard boxes to custom branded packaging, we've got you covered.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="hover:text-kraft-light transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Follow us on Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" className="hover:text-kraft-light transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Follow us on Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://twitter.com" className="hover:text-kraft-light transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Follow us on Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com" className="hover:text-kraft-light transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Subscribe to our YouTube channel">
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

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-kraft-light" />
                  <span className="text-gray-300">
                    57 Adedoyin Street<br />
                    Ogba-Ikeja, Lagos<br />
                    Nigeria
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-3 flex-shrink-0 text-kraft-light" />
                  <div className="flex flex-col">
                    <a href="tel:+2348125160761" className="text-gray-300 hover:text-kraft-light transition-colors">
                      08125160761
                    </a>
                    <a href="tel:+2348038855851" className="text-gray-300 hover:text-kraft-light transition-colors">
                      08038855851
                    </a>
                  </div>
                </li>
                <li className="flex items-center">
                  <a 
                    href="https://wa.me/2348125160761" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-kraft-light transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0 text-kraft-light" width="18" height="18">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M9.5 15.5c1.333.667 3.667.667 5 0" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-3 flex-shrink-0 text-kraft-light" />
                  <a href="mailto:CartonsProducer@gmail.com" className="text-gray-300 hover:text-kraft-light transition-colors">
                    CartonsProducer@gmail.com
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
            <p>© {new Date().getFullYear()} PAPER PACKAGING COMPANY. All rights reserved.</p>
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
