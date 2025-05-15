import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const ContactHero: React.FC = () => {
  return (
    <div className="relative bg-corporate text-white py-16">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Have questions or need assistance? Reach out to our friendly team for support with your packaging needs.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start">
              <Phone className="mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p>08125160761</p>
                <p>08038855851</p>
                <p className="text-sm text-white/80 mt-1">Mon-Fri, 9am-5pm</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MessageSquare className="mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <p>08125160761</p>
                <a 
                  href="https://wa.me/2348125160761" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-kraft-light transition-colors block mt-1 text-sm"
                >
                  Chat with us now
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p>CartonsProducer@gmail.com</p>
                <p className="text-sm text-white/80 mt-1">We respond within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p>57 Adedoyin Street, Ogba-Ikeja, Ogba, Lagos,
                Nigeria.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday: 10am - 2pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
