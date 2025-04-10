
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore } from '@/store/cmsStore';
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';

const TestimonialsEditor = () => {
  const { testimonials, updateTestimonials } = useCMSStore();
  const { toast } = useToast();
  
  const [editingTestimonials, setEditingTestimonials] = useState(testimonials);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedTestimonials = [...editingTestimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    setEditingTestimonials(updatedTestimonials);
  };

  const handleAddNew = () => {
    const newTestimonial = {
      name: "New Testimonial",
      quote: "Enter the testimonial quote here",
      role: "Role/Title",
      highlight: "Key highlight",
      transform: "Transformation result"
    };
    
    setEditingTestimonials([...editingTestimonials, newTestimonial]);
    setExpandedIndex(editingTestimonials.length);
    
    // Scroll to the bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleRemove = (index: number) => {
    const updatedTestimonials = [...editingTestimonials];
    updatedTestimonials.splice(index, 1);
    setEditingTestimonials(updatedTestimonials);
    setExpandedIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTestimonials(editingTestimonials);
    toast({
      title: "Changes saved",
      description: "Testimonials have been updated",
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light">Edit Testimonials</h2>
        <Button
          type="button"
          className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none flex items-center gap-2"
          onClick={handleAddNew}
        >
          <Plus size={16} />
          Add New Testimonial
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {editingTestimonials.map((testimonial, index) => (
            <Card key={index} className="border border-wedding-light-gray rounded-none overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="flex justify-between items-center p-4 bg-wedding-off-white cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="font-medium">{testimonial.name} - {testimonial.role}</div>
                  <div className="flex items-center">
                    {expandedIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
                
                {expandedIndex === index && (
                  <div className="p-4 space-y-4 border-t border-wedding-light-gray">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        className="rounded-none border-wedding-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Quote</label>
                      <Textarea
                        value={testimonial.quote}
                        onChange={(e) => handleChange(index, 'quote', e.target.value)}
                        className="h-32 rounded-none border-wedding-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Role/Title</label>
                      <Input
                        value={testimonial.role}
                        onChange={(e) => handleChange(index, 'role', e.target.value)}
                        className="rounded-none border-wedding-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Highlight</label>
                      <Input
                        value={testimonial.highlight}
                        onChange={(e) => handleChange(index, 'highlight', e.target.value)}
                        className="rounded-none border-wedding-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Transformation</label>
                      <Input
                        value={testimonial.transform}
                        onChange={(e) => handleChange(index, 'transform', e.target.value)}
                        className="rounded-none border-wedding-black"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="destructive"
                        className="rounded-none flex items-center gap-2"
                        onClick={() => handleRemove(index)}
                      >
                        <Trash2 size={16} />
                        Remove Testimonial
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6">
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

export default TestimonialsEditor;
