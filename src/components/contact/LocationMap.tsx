
import React from 'react';

const LocationMap: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="section-title text-center mb-8">Our Location</h2>
        
        <div className="rounded-lg overflow-hidden shadow-md h-[400px] md:h-[500px]">
          {/* Google Maps iframe - in a real implementation replace with actual API integration */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175903766455!2d-73.9867379!3d40.7484445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635181410061!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="CartonCraft Location"
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
                From Highway 101, take the Main Street exit. Turn right onto Oak Avenue, 
                then left onto Packaging Street. Our facility will be on the right side, 
                with customer parking available in front of the building.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-corporate">Public Transportation</h4>
              <p className="text-gray-700 mb-4">
                The nearest bus stop is "Oak & Main" on routes 12 and 15, approximately 
                a 5-minute walk from our location. The Boxville Metro Station is a 15-minute 
                walk or a short taxi ride away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
