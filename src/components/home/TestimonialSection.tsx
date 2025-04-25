
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  name, 
  company, 
  image, 
  quote,
  rating
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {/* Generate stars based on rating */}
        <div className="flex text-amber-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={18}
              fill={i < rating ? "currentColor" : "none"}
              className={i < rating ? "text-amber-400" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="text-gray-600">{rating.toFixed(1)}</span>
      </div>
      
      <blockquote className="mb-6">
        <p className="text-gray-700 italic">"{quote}"</p>
      </blockquote>
      
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Tasty Delights Bakery",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "The custom printed cake boxes from CartonCraft completely transformed our brand presentation. Our customers love the professional look, and we've seen a significant increase in repeat business.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Pacific Movers",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      quote: "As a moving company, we need reliable, sturdy boxes. CartonCraft delivers exactly what we need, on time and at great prices. Their bulk discounts have helped us improve our margins.",
      rating: 4.5
    },
    {
      name: "Jessica Thompson",
      company: "Artisan Gift Shop",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      quote: "The quality of their gift packaging is outstanding. Our products look so much more premium in these boxes, and we've received countless compliments from customers.",
      rating: 5
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="section-title text-center">What Our Customers Say</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          We're proud to work with businesses of all sizes, helping them present their products in the best possible packaging.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              company={testimonial.company}
              image={testimonial.image}
              quote={testimonial.quote}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
