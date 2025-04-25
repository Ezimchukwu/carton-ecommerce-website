
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CustomPrintingCTA from '@/components/home/CustomPrintingCTA';
import TestimonialSection from '@/components/home/TestimonialSection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <CustomPrintingCTA />
      <WhyChooseUs />
      <TestimonialSection />
    </Layout>
  );
};

export default HomePage;
