
import React from 'react';
import { Building, Calendar, Camera, Palette, Shirt, Music, Map, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCMSStore } from '@/store/cmsStore';

const NetworkMembersSection = () => {
  const { networkContent } = useCMSStore();

  // Function to render icon based on string name
  const renderIcon = (iconName: string) => {
    const props = { className: "h-8 w-8" };
    switch (iconName) {
      case 'Building': return <Building {...props} />;
      case 'Calendar': return <Calendar {...props} />;
      case 'Camera': return <Camera {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Shirt': return <Shirt {...props} />;
      case 'Music': return <Music {...props} />;
      case 'Map': return <Map {...props} />;
      case 'Video': return <Video {...props} />;
      default: return <Building {...props} />; // Default icon
    }
  };

  return (
    <div className="section-padding bg-wedding-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 px-3 py-1 bg-wedding-light-gray text-wedding-black border-wedding-medium-gray rounded-none">
            Industry Leaders
          </Badge>
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">{networkContent.title}</h2>
          <div className="w-24 h-0.5 bg-wedding-black mx-auto mb-6"></div>
          <p className="text-lg text-wedding-dark-gray">
            {networkContent.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {networkContent.categories.map((category, index) => (
            <div key={index} className="bg-wedding-white p-6 rounded-none shadow-md hover:shadow-lg transition-shadow duration-300 border border-wedding-light-gray">
              <div className="bg-wedding-light-gray p-4 rounded-none inline-flex text-wedding-black mb-4">
                {renderIcon(category.icon)}
              </div>
              <h3 className="font-semibold text-xl mb-3 text-wedding-black">{category.title}</h3>
              <p className="text-wedding-dark-gray text-sm">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkMembersSection;
