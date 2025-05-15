import React from 'react';

const CompanyStory: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/2">
            <h2 className="section-title">Our Story</h2>
            <p className="mb-4 text-gray-700">
            We are Boxes Corrugated and Cartons Producers! We started in Nigeria, supporting other organizations with technical-know-how on packaging using corrugated cartons for both local and international markets. Our plan is largely to contribute to Nigerians economy!
At its best;
Corrugated Cartons for all forms, shapes and colours. Technology powered systems, automated machines, best of visual outputs, warehouses, robust and wide delivery systems. Products Includes; Cartons Packaging for all Products -Pizza Cartons, Archive Boxes, Foods Packs, Special Packs, Fan Cartons, Batteries Cartons, Moving Boxes, Foil Packs and all boxes types you can ever imagine! Our printing, branding to fit and give best of looks.... we are the best in around! We are the foremost. The best all the time to any location in Nigeria and other Countries in West Africa. Wide Coverage; Both local and international markets, to all states in Nigeria and some countries in West Africa at its best in quality and affordable prices. We produce all sizes of cartons for manufacturers. We bridged the gap in packaging products for Small and Medium-Scale Enterprises (SME) including agro-allied sector; We produces and set up online stores for cartons packaging and make ordering process easy for existing and potential customers from anywhere across the globe. Our production based is well structured and standard of our factory meets the required standards. We are member of Nigeria Association of Small Scale Industrialists (NASSI) in Nigeria. We are well known online as Cartons Producer. Success is guaranteed in your dealings with us. Global Coverages & Partnerships:
We constantly and carefully in searching for partners across the globe to enable us start operations in many countries. We welcome interests; cartonsproducer@gmail.com, +2348125160761. Our e-commerce is powered by notable experts (PriceOkay.com).


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
