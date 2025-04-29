import React from 'react';

const CompanyStory: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-start">
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
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square w-full">
                <img 
                  src="/IMAGES/product5.jpeg" 
                  alt="Premium packaging solutions" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square w-full translate-y-12">
                <img 
                  src="/IMAGES/product9.jpeg" 
                  alt="Custom printed packaging" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square w-full -translate-y-12">
                <img 
                  src="/IMAGES/product15.jpeg" 
                  alt="Innovative box designs" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square w-full">
                <img 
                  src="/IMAGES/product20.jpeg" 
                  alt="Sustainable packaging" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
