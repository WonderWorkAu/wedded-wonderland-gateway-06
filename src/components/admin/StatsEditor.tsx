
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore } from '@/store/cmsStore';

const StatsEditor = () => {
  const { statsContent, updateStatsContent } = useCMSStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    heading: statsContent.heading || "Recognized and Trusted By",
    brands: statsContent.brands || ["VOGUE", "HARPER'S", "BRIDES", "ELLE", "BAZAAR"],
    stats: statsContent.stats || [
      { value: "54+", label: "Countries With Active Members", detail: "Global Network Access" },
      { value: "10M+", label: "Monthly Audience Reach", detail: "High-Intent Couples" },
      { value: "3M+", label: "Social Media Following", detail: "Multi-Channel Visibility" }
    ]
  });

  const handleBrandChange = (index: number, value: string) => {
    const updatedBrands = [...formData.brands];
    updatedBrands[index] = value;
    setFormData({...formData, brands: updatedBrands});
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const updatedStats = [...formData.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setFormData({...formData, stats: updatedStats});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatsContent(formData);
    toast({
      title: "Changes saved",
      description: "Stats bar has been updated",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-light mb-6">Edit Stats Bar</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Heading</label>
          <Input
            value={formData.heading}
            onChange={(e) => setFormData({...formData, heading: e.target.value})}
            className="rounded-none border-wedding-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-4">Brand Mentions</label>
          <div className="space-y-3">
            {formData.brands.map((brand, index) => (
              <Input
                key={index}
                value={brand}
                onChange={(e) => handleBrandChange(index, e.target.value)}
                className="rounded-none border-wedding-black"
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium">Statistics</label>
          
          {formData.stats.map((stat, index) => (
            <div key={index} className="border border-wedding-light-gray p-4 rounded-none">
              <h4 className="font-medium mb-2">Stat #{index + 1}</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1">Value</label>
                  <Input
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    className="rounded-none border-wedding-black"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Label</label>
                  <Input
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="rounded-none border-wedding-black"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Detail</label>
                  <Input
                    value={stat.detail}
                    onChange={(e) => handleStatChange(index, 'detail', e.target.value)}
                    className="rounded-none border-wedding-black"
                  />
                </div>
              </div>
            </div>
          ))}
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

export default StatsEditor;
