export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Make a Mono Carton Box",
    excerpt: "Mono carton boxes are widely used in packaging across different industries due to their durability, branding potential, and protective qualities.",
    content: `
      <h2>Introduction</h2>
      <p>Mono carton boxes are essential packaging solutions that combine durability with aesthetic appeal. These boxes are made from a single layer of paperboard, making them lightweight yet sturdy enough to protect various products.</p>
      
      <h2>Key Components</h2>
      <ul>
        <li>High-quality paperboard material</li>
        <li>Precise cutting and scoring tools</li>
        <li>Professional printing equipment</li>
        <li>Assembly and quality control processes</li>
      </ul>
      
      <h2>Manufacturing Process</h2>
      <p>The manufacturing process involves several key steps:</p>
      <ol>
        <li>Material Selection: Choose appropriate paperboard grade</li>
        <li>Design and Planning: Create technical drawings</li>
        <li>Printing: Apply branding and necessary information</li>
        <li>Die-cutting: Cut and score the board</li>
        <li>Quality Control: Inspect for defects</li>
        <li>Assembly: Fold and glue as needed</li>
      </ol>
      
      <h2>Applications</h2>
      <p>Mono carton boxes are used in various industries:</p>
      <ul>
        <li>Pharmaceutical packaging</li>
        <li>Food and beverage containers</li>
        <li>Cosmetic packaging</li>
        <li>Electronics packaging</li>
        <li>Retail product boxes</li>
      </ul>
    `,
    author: "Quantum Packaging",
    date: "March 20, 2024",
    category: "Manufacturing",
    readTime: "5 min read",
    image: "/IMAGES/Wholsale 1.jpeg",
    tags: ["manufacturing", "packaging", "mono carton"]
  },
  {
    id: 2,
    title: "What Materials Are Used To Make Corrugated Boxes?",
    excerpt: "Corrugated boxes are one of the most widely used materials across various industries for packaging solutions.",
    content: `
      <h2>Understanding Corrugated Materials</h2>
      <p>Corrugated boxes are made from several layers of material that work together to provide strength and protection. The main components include:</p>
      
      <ul>
        <li>Outer liner: Provides durability and printability</li>
        <li>Fluting: The wavy middle layer that gives strength</li>
        <li>Inner liner: Protects the contents</li>
      </ul>

      <h2>Material Selection</h2>
      <p>The choice of materials depends on various factors:</p>
      <ul>
        <li>Product weight and size</li>
        <li>Storage conditions</li>
        <li>Transportation requirements</li>
        <li>Cost considerations</li>
      </ul>
    `,
    author: "Quantum Packaging",
    date: "March 15, 2024",
    category: "Materials",
    readTime: "4 min read",
    image: "/IMAGES/Wholsale 2.jpeg",
    tags: ["materials", "corrugated boxes", "manufacturing"]
  },
  {
    id: 3,
    title: "5 Types of 5-Ply Corrugated Boxes Made by Quantum Packaging",
    excerpt: "Quantum Packaging, a leading Corrugated Box Manufacturer in Lagos, stands out as a reliable provider of durable and customizable 5-ply corrugated boxes.",
    content: `
      <h2>Types of 5-Ply Boxes</h2>
      <p>Our range of 5-ply corrugated boxes includes:</p>
      <ol>
        <li>Heavy-duty shipping boxes</li>
        <li>Industrial packaging solutions</li>
        <li>Export-grade containers</li>
        <li>Storage boxes</li>
        <li>Specialty packaging</li>
      </ol>

      <h2>Applications</h2>
      <p>These boxes are perfect for:</p>
      <ul>
        <li>Heavy machinery parts</li>
        <li>Electronic equipment</li>
        <li>Automotive components</li>
        <li>Industrial supplies</li>
      </ul>
    `,
    author: "Quantum Packaging",
    date: "March 10, 2024",
    category: "Products",
    readTime: "6 min read",
    image: "/IMAGES/Wholsale 3.jpeg",
    tags: ["corrugated", "5-ply", "industrial"]
  },
  {
    id: 4,
    title: "10 Advantages of Using Mono Carton Boxes for Packaging",
    excerpt: "In today's competitive market, packaging plays a significant role in creating a lasting impression and ensuring product safety.",
    content: `
      <h2>Key Advantages</h2>
      <ol>
        <li>Cost-effective packaging solution</li>
        <li>Excellent printability</li>
        <li>Lightweight yet sturdy</li>
        <li>Environmentally friendly</li>
        <li>Versatile applications</li>
        <li>Easy storage and transportation</li>
        <li>Professional appearance</li>
        <li>Customizable designs</li>
        <li>Product protection</li>
        <li>Brand enhancement</li>
      </ol>
    `,
    author: "Quantum Packaging",
    date: "March 5, 2024",
    category: "Benefits",
    readTime: "7 min read",
    image: "/IMAGES/Wholsale 5.jpeg",
    tags: ["mono carton", "benefits", "packaging"]
  },
  {
    id: 5,
    title: "6 Reasons Corrugated Boxes Are Essential for E-commerce Packaging",
    excerpt: "When it comes to e-commerce, packaging is more than just a box; it's the first experience customers have with your brand.",
    content: `
      <h2>Why Choose Corrugated Boxes for E-commerce?</h2>
      <ol>
        <li>Superior Protection During Transit</li>
        <li>Cost-Effective Solution</li>
        <li>Customizable Branding Options</li>
        <li>Environmentally Friendly</li>
        <li>Easy Storage and Assembly</li>
        <li>Lightweight Yet Durable</li>
      </ol>

      <h2>Impact on Customer Experience</h2>
      <p>The right packaging can significantly enhance customer satisfaction through:</p>
      <ul>
        <li>Safe product delivery</li>
        <li>Professional presentation</li>
        <li>Brand recognition</li>
        <li>Unboxing experience</li>
      </ul>
    `,
    author: "Quantum Packaging",
    date: "March 1, 2024",
    category: "E-commerce",
    readTime: "5 min read",
    image: "/IMAGES/Wholsale 6.jpeg",
    tags: ["e-commerce", "corrugated", "shipping"]
  },
  {
    id: 6,
    title: "The Benefits of Custom Label Printing",
    excerpt: "In today's fast-paced market, businesses constantly seek ways to stand out from other brands. One effective method is through custom label printing.",
    content: `
      <h2>Advantages of Custom Labels</h2>
      <ul>
        <li>Brand Recognition</li>
        <li>Professional Appearance</li>
        <li>Product Information</li>
        <li>Marketing Opportunities</li>
      </ul>

      <h2>Applications</h2>
      <p>Custom labels are essential for:</p>
      <ul>
        <li>Product packaging</li>
        <li>Shipping labels</li>
        <li>Brand stickers</li>
        <li>Warning labels</li>
      </ul>
    `,
    author: "Quantum Packaging",
    date: "February 25, 2024",
    category: "Printing",
    readTime: "4 min read",
    image: "/IMAGES/Wholsale 8.jpeg",
    tags: ["printing", "labels", "branding"]
  },
  {
    id: 7,
    title: "Why Custom Label Printing is Essential for Nigerian Businesses",
    excerpt: "In the competitive world of branding and marketing, standing out from the crowd is crucial. Custom label printing offers businesses a unique opportunity to enhance their brand identity.",
    content: `
      <h2>The Nigerian Market Context</h2>
      <p>In Nigeria's diverse market, custom labels help businesses:</p>
      <ul>
        <li>Build brand recognition</li>
        <li>Communicate in multiple languages</li>
        <li>Meet regulatory requirements</li>
        <li>Stand out in local markets</li>
      </ul>

      <h2>Implementation Strategies</h2>
      <p>Effective label printing involves:</p>
      <ol>
        <li>Design consideration</li>
        <li>Material selection</li>
        <li>Quality control</li>
        <li>Cost management</li>
      </ol>
    `,
    author: "Quantum Packaging",
    date: "February 20, 2024",
    category: "Printing",
    readTime: "5 min read",
    image: "/IMAGES/Wholsale 9.jpeg",
    tags: ["printing", "nigeria", "business"]
  },
  {
    id: 8,
    title: "The Ultimate Guide to Mono-Carton Boxes",
    excerpt: "Mono-carton boxes, often referred to as single-layer cartons, are packaging solutions crafted from a single sheet of material, typically paperboard or cardboard.",
    content: `
      <h2>Understanding Mono-Carton Boxes</h2>
      <p>These versatile packaging solutions offer:</p>
      <ul>
        <li>Cost-effective packaging</li>
        <li>Professional presentation</li>
        <li>Product protection</li>
        <li>Easy customization</li>
      </ul>

      <h2>Applications</h2>
      <p>Common uses include:</p>
      <ul>
        <li>Retail packaging</li>
        <li>Food packaging</li>
        <li>Pharmaceutical boxes</li>
        <li>Consumer goods</li>
      </ul>
    `,
    author: "Quantum Packaging",
    date: "February 15, 2024",
    category: "Guide",
    readTime: "6 min read",
    image: "/IMAGES/Wholsale 10.jpeg",
    tags: ["guide", "mono carton", "packaging"]
  },
  {
    id: 9,
    title: "The Importance of Strong Corrugated Boxes for Safe Shipping",
    excerpt: "In today's fast-paced business world, it is important to rely heavily on efficient and reliable carton packaging to transport your goods safely from one place to another.",
    content: `
      <h2>Why Strong Boxes Matter</h2>
      <p>Key benefits include:</p>
      <ul>
        <li>Product protection</li>
        <li>Reduced damage rates</li>
        <li>Cost savings</li>
        <li>Customer satisfaction</li>
      </ul>

      <h2>Choosing the Right Box</h2>
      <p>Consider these factors:</p>
      <ol>
        <li>Product weight</li>
        <li>Shipping distance</li>
        <li>Storage conditions</li>
        <li>Handling requirements</li>
      </ol>
    `,
    author: "Quantum Packaging",
    date: "February 10, 2024",
    category: "Shipping",
    readTime: "5 min read",
    image: "/IMAGES/Wholsale 11.jpeg",
    tags: ["shipping", "corrugated", "safety"]
  },
  {
    id: 10,
    title: "Catering to Diverse Demands: An In-Depth Look at Mono Cartons",
    excerpt: "In the packaging industry, one size does not fit all. Different industries have unique requirements when it comes to packaging their products, and this is where mono cartons shine.",
    content: `
      <h2>Industry-Specific Solutions</h2>
      <p>Mono cartons serve various sectors:</p>
      <ul>
        <li>Pharmaceutical industry</li>
        <li>Food and beverage</li>
        <li>Cosmetics</li>
        <li>Electronics</li>
      </ul>

      <h2>Customization Options</h2>
      <p>Available features include:</p>
      <ul>
        <li>Size variations</li>
        <li>Material grades</li>
        <li>Printing options</li>
        <li>Special finishes</li>
      </ul>
    `,
    author: "Quantum Packaging",
    date: "February 5, 2024",
    category: "Products",
    readTime: "6 min read",
    image: "/IMAGES/Wholsale 12.jpeg",
    tags: ["mono carton", "customization", "industry"]
  }
];

// Export the blog posts data for use in components 