
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore } from '@/store/cmsStore';
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';

const NetworkMembersEditor = () => {
  const { networkContent, updateNetworkContent } = useCMSStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: networkContent.title || "Who Belongs in the Network",
    description: networkContent.description || "The Wedded Network is a global collective of the most talented, trusted, and forward-thinking professionals in weddings, events, and celebrations. If you're elevating the industry through excellence, innovation, or inspiration — you belong here.",
    categories: networkContent.categories || []
  });
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCategoryChange = (index: number, field: string, value: string) => {
    const updatedCategories = [...formData.categories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [field]: value
    };
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleAddNew = () => {
    const newCategory = {
      title: "New Category",
      description: "Description of the new category",
      icon: "Building"
    };
    
    setFormData({ 
      ...formData, 
      categories: [...formData.categories, newCategory] 
    });
    
    setExpandedIndex(formData.categories.length);
    
    // Scroll to the bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleRemove = (index: number) => {
    const updatedCategories = [...formData.categories];
    updatedCategories.splice(index, 1);
    setFormData({ ...formData, categories: updatedCategories });
    setExpandedIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNetworkContent(formData);
    toast({
      title: "Changes saved",
      description: "Network members section has been updated",
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-2xl font-light mb-6">Edit Network Members</h2>
      
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
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="h-24 rounded-none border-wedding-black"
          />
        </div>
        
        <div className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Member Categories</h3>
            <Button
              type="button"
              className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none flex items-center gap-2"
              onClick={handleAddNew}
            >
              <Plus size={16} />
              Add New Category
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.categories.map((category, index) => (
              <Card key={index} className="border border-wedding-light-gray rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="flex justify-between items-center p-4 bg-wedding-off-white cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="font-medium">{category.title}</div>
                    <div className="flex items-center">
                      {expandedIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                  
                  {expandedIndex === index && (
                    <div className="p-4 space-y-4 border-t border-wedding-light-gray">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input
                          value={category.title}
                          onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
                          className="rounded-none border-wedding-black"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          value={category.description}
                          onChange={(e) => handleCategoryChange(index, 'description', e.target.value)}
                          className="h-24 rounded-none border-wedding-black"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Icon Name</label>
                        <Input
                          value={category.icon}
                          onChange={(e) => handleCategoryChange(index, 'icon', e.target.value)}
                          className="rounded-none border-wedding-black"
                          placeholder="Building, Camera, Palette, etc."
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Use lucide-react icon names (Building, Camera, Palette, etc.)
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
                          Remove Category
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

export default NetworkMembersEditor;
