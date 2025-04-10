
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore } from '@/store/cmsStore';

const HeroEditor = () => {
  const { heroContent, updateHeroContent } = useCMSStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    mainHeading: heroContent.mainHeading || "Your Craft Is World-Class. Your Visibility Should Be Too.",
    subHeading: heroContent.subHeading || "Join the exclusive network reaching 10M+ monthly couples across 54+ countries who are actively searching for exceptional wedding professionals like you.",
    quote: heroContent.quote || "You've mastered your craft. Now it's time to master your market.",
    ctaText: heroContent.ctaText || "BECOME A WEDDED PARTNER",
    footerText: heroContent.footerText || "*Limited memberships available for 2025",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroContent(formData);
    toast({
      title: "Changes saved",
      description: "Your hero section has been updated",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-light mb-6">Edit Hero Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Main Heading</label>
          <Textarea
            name="mainHeading"
            value={formData.mainHeading}
            onChange={handleChange}
            className="h-20 rounded-none border-wedding-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Sub Heading</label>
          <Textarea
            name="subHeading"
            value={formData.subHeading}
            onChange={handleChange}
            className="h-24 rounded-none border-wedding-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Quote</label>
          <Input
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            className="rounded-none border-wedding-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">CTA Button Text</label>
          <Input
            name="ctaText"
            value={formData.ctaText}
            onChange={handleChange}
            className="rounded-none border-wedding-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Footer Text</label>
          <Input
            name="footerText"
            value={formData.footerText}
            onChange={handleChange}
            className="rounded-none border-wedding-black"
          />
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit"
            className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeroEditor;
