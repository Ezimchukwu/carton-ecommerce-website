
import React from 'react';

const CompanyStory: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="section-title">Our Story</h2>
            <p className="mb-4 text-gray-700">
              Founded in 2005, CartonCraft began with a simple mission: to provide businesses with high-quality, 
              customizable packaging solutions that enhance their brand presentation while being environmentally responsible.
            </p>
            <p className="mb-4 text-gray-700">
              What started as a small operation in a warehouse has grown into a comprehensive packaging solutions provider, 
              serving businesses of all sizes across multiple industries. Our journey has been marked by continuous innovation, 
              customer-focused service, and a commitment to sustainability.
            </p>
            <p className="mb-4 text-gray-700">
              Today, we're proud to offer one of the most extensive selections of packaging products in the industry, 
              from standard boxes to fully customized packaging solutions. But what truly sets us apart is our dedication 
              to helping each customer find the perfect packaging solution for their specific needs.
            </p>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28" 
              alt="CartonCraft warehouse" 
              className="rounded-lg shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1605164599901-f26e01783e64" 
              alt="Custom printing process" 
              className="rounded-lg shadow-md mt-8"
            />
            <img 
              src="https://images.unsplash.com/photo-1607166452427-7e4477079cb9" 
              alt="Team collaboration" 
              className="rounded-lg shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1573676564797-d2ba6324d13f" 
              alt="Product packaging" 
              className="rounded-lg shadow-md mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
