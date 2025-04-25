
import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <div className="relative bg-corporate-dark text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28')] bg-cover bg-center opacity-20"></div>
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About CartonCraft</h1>
          <p className="text-lg md:text-xl text-gray-100">
            Transforming the packaging industry with innovative, sustainable solutions since 2005.
            We're committed to quality, reliability, and customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
