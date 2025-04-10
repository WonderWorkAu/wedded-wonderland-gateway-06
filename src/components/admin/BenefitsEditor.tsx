
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore } from '@/store/cmsStore';
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';

const BenefitsEditor = () => {
  const { benefitsContent, updateBenefitsContent } = useCMSStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: benefitsContent.title || "Why Top Professionals Join Our Network",
    subtitle: benefitsContent.subtitle || "Unlock unparalleled opportunities to grow your luxury wedding business on a global scale",
    cta: benefitsContent.cta || "APPLY TO JOIN TODAY",
    benefits: benefitsContent.benefits || []
  });
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBenefitChange = (index: number, field: string, value: string) => {
    const updatedBenefits = [...formData.benefits];
    updatedBenefits[index] = {
      ...updatedBenefits[index],
      [field]: value
    };
    setFormData({ ...formData, benefits: updatedBenefits });
  };

  const handleAddNew = () => {
    const newBenefit = {
      title: "New Benefit",
      description: "Description of the new benefit",
      highlight: "Key highlight",
      icon: "Globe"
    };
    
    setFormData({ 
      ...formData, 
      benefits: [...formData.benefits, newBenefit] 
    });
    
    setExpandedIndex(formData.benefits.length);
    
    // Scroll to the bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleRemove = (index: number) => {
    const updatedBenefits = [...formData.benefits];
    updatedBenefits.splice(index, 1);
    setFormData({ ...formData, benefits: updatedBenefits });
    setExpandedIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBenefitsContent(formData);
    toast({
      title: "Changes saved",
      description: "Benefits section has been updated",
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-2xl font-light mb-6">Edit Benefits Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <Input
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="rounded-none border-wedding-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <Textarea
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="rounded-none border-wedding-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">CTA Button Text</label>
          <Input
            value={formData.cta}
            onChange={(e) => handleChange('cta', e.target.value)}
            className="rounded-none border-wedding-black"
          />
        </div>
        
        <div className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Benefits</h3>
            <Button
              type="button"
              className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none flex items-center gap-2"
              onClick={handleAddNew}
            >
              <Plus size={16} />
              Add New Benefit
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.benefits.map((benefit, index) => (
              <Card key={index} className="border border-wedding-light-gray rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 bg-wedding-off-white cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="font-medium">{benefit.title}</div>
                    <div className="flex items-center">
                      {expandedIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                  
                  {expandedIndex === index && (
                    <div className="p-4 space-y-4 border-t border-wedding-light-gray">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input
                          value={benefit.title}
                          onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                          className="rounded-none border-wedding-black"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          value={benefit.description}
                          onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                          className="h-24 rounded-none border-wedding-black"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Highlight</label>
                        <Input
                          value={benefit.highlight}
                          onChange={(e) => handleBenefitChange(index, 'highlight', e.target.value)}
                          className="rounded-none border-wedding-black"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Icon Name</label>
                        <Input
                          value={benefit.icon}
                          onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                          className="rounded-none border-wedding-black"
                          placeholder="Globe, Users, Award, etc."
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Use lucide-react icon names (Globe, Users, Award, etc.)
                        </p>
                      </div>
                      
                      <div className="pt-2">
                        <Button
                          type="button"
                          variant="destructive"
                          className="rounded-none flex items-center gap-2"
                          onClick={() => handleRemove(index)}
                        >
                          <Trash2 size={16} />
                          Remove Benefit
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit"
            className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none flex items-center gap-2"
          >
            <Save size={16} />
            Save All Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BenefitsEditor;
