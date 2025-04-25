
import React from 'react';
import Layout from '@/components/layout/Layout';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import LocationMap from '@/components/contact/LocationMap';
import FAQSection from '@/components/contact/FAQSection';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <ContactHero />
      <ContactForm />
      <LocationMap />
      <FAQSection />
    </Layout>
  );
};

export default ContactPage;
