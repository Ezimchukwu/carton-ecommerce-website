
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What is the minimum order quantity?",
      answer: "Our minimum order quantities vary by product type. For standard stock items, there's typically no minimum order. For custom printed items, minimums generally start at 250-500 units, depending on the specific product and printing requirements."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. For custom printed products, please allow 7-10 business days for production plus shipping time. Expedited shipping options are available for an additional fee."
    },
    {
      question: "Do you offer samples before placing a bulk order?",
      answer: "Yes! We offer sample kits for many of our standard products. For custom items, we can provide digital proofs for design approval before production. Physical samples of custom items may require a nominal fee."
    },
    {
      question: "What file formats do you accept for custom printing?",
      answer: "We accept high-resolution files in AI, PDF, PSD, or EPS formats. For best results, please convert all text to outlines/paths and ensure all images are at least 300 DPI. Our design team can provide a template for your specific product."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account on our website to view order status and tracking details."
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to commonly asked questions about our products, ordering process, and more.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-8">
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="px-6 hover:text-corporate">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center">
          <Link 
            to="/faq" 
            className="inline-flex items-center text-corporate hover:text-corporate-dark transition-colors"
          >
            View all frequently asked questions <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
