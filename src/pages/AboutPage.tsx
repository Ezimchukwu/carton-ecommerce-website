
import React from 'react';
import Layout from '@/components/layout/Layout';
import AboutHero from '@/components/about/AboutHero';
import CompanyStory from '@/components/about/CompanyStory';
import MissionValues from '@/components/about/MissionValues';
import TeamSection from '@/components/about/TeamSection';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <AboutHero />
      <CompanyStory />
      <MissionValues />
      <TeamSection />
    </Layout>
  );
};

export default AboutPage;
