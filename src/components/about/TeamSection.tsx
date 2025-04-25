
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-corporate-dark">{name}</h3>
        <p className="text-corporate font-medium mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
};

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "David Chen",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "With over 20 years of experience in the packaging industry, David founded CartonCraft with a vision to revolutionize sustainable packaging solutions."
    },
    {
      name: "Sophia Martinez",
      role: "Chief Operations Officer",
      image: "https://randomuser.me/api/portraits/women/39.jpg",
      bio: "Sophia oversees all operational aspects of CartonCraft, ensuring efficient production processes and consistent quality standards."
    },
    {
      name: "James Wilson",
      role: "Head of Design",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      bio: "James leads our creative team, bringing innovative designs and customization options to our packaging solutions."
    },
    {
      name: "Aisha Johnson",
      role: "Sustainability Director",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      bio: "Aisha champions our environmental initiatives, researching and implementing sustainable practices across all operations."
    }
  ];

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="section-title text-center">Meet Our Leadership Team</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Our dedicated team combines decades of industry experience with a passion for innovation and sustainability.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
