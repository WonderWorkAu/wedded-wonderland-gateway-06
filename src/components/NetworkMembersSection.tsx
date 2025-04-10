
import React from 'react';
import { Building, Calendar, Camera, Palette, Shirt, Music, Map, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const memberCategories = [
  {
    icon: <Building className="h-8 w-8" />,
    title: "Venues",
    description: "Luxury hotels, iconic venues, and destination properties delivering exceptional experiences and bespoke packages for couples and industry partners worldwide."
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Planners & Stylists",
    description: "Experts in crafting seamless, stylish, and culturally rich weddings across the globe."
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: "Photographers & Videographers",
    description: "Visual storytellers capturing weddings with editorial flair and timeless sophistication."
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Florists, Designers & Production Teams",
    description: "Creative professionals transforming spaces into immersive, one-of-a-kind wedding environments."
  },
  {
    icon: <Shirt className="h-8 w-8" />,
    title: "Fashion, Beauty & Lifestyle Brands",
    description: "Bridalwear designers, beauty experts, and lifestyle-focused brands that help couples look and feel their best."
  },
  {
    icon: <Music className="h-8 w-8" />,
    title: "Entertainers & Taste Makers",
    description: "Performers, musicians, and cultural artists bringing energy, meaning, and magic to every celebration."
  },
  {
    icon: <Map className="h-8 w-8" />,
    title: "Tourism Boards & Destination Partners",
    description: "Leaders in wedding tourism connecting couples to extraordinary locations and regional experiences."
  },
  {
    icon: <Video className="h-8 w-8" />,
    title: "Content Creators & Media Partners",
    description: "Storytellers, influencers, and publishers amplifying the world of weddings through digital media and authentic narratives."
  }
];

const NetworkMembersSection = () => {
  return (
    <div className="section-padding bg-wedding-light-purple/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 px-3 py-1 bg-wedding-deep-purple/10 text-wedding-deep-purple border-wedding-deep-purple/30 backdrop-blur-sm">
            Industry Leaders
          </Badge>
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">Who Belongs in the Network</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            The Wedded Network is a global collective of the most talented, trusted, and forward-thinking professionals in weddings, events, and celebrations. If you're elevating the industry through excellence, innovation, or inspiration — you belong here.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {memberCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-wedding-light-purple/20 p-4 rounded-full inline-flex text-wedding-deep-purple mb-4">
                {category.icon}
              </div>
              <h3 className="font-semibold text-xl mb-3 text-wedding-deep-purple">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkMembersSection;
