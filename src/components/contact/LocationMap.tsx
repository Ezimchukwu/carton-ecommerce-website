
import React from 'react';

const LocationMap: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="section-title text-center mb-8">Our Location</h2>
        
        <div className="rounded-lg overflow-hidden shadow-md h-[400px] md:h-[500px]">
          {/* Google Maps iframe - updated to show Lagos, Nigeria */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63427.97620267215!2d3.3152319371975757!3d6.637147266774354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228fa2a3999%3A0xd7a8324bddbba1f0!2sOgba%2C%20Ikeja%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1715857535376!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="PAPER PACKAGING COMPANY Location"
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
        
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-corporate-dark">Getting Here</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-1 text-corporate">By Car</h4>
              <p className="text-gray-700 mb-4">
                From Lagos-Abeokuta Expressway, take the Ogba exit. Turn onto Acme Road, 
                then proceed to Adedoyin Street. Our facility will be visible on this street, 
                with customer parking available in front of the building.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-corporate">Public Transportation</h4>
              <p className="text-gray-700 mb-4">
                The nearest bus stop is "Ogba Bus Stop" served by multiple routes, 
                approximately a 10-minute walk from our location. Various taxis and 
                ride-sharing services are readily available throughout the area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
