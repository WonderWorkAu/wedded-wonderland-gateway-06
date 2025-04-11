
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore } from '@/store/cmsStore';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Film } from 'lucide-react';

const HeroEditor = () => {
  const { heroContent, updateHeroContent, mediaAssets } = useCMSStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    mainHeading: "",
    subHeading: "",
    quote: "",
    ctaText: "",
    footerText: "",
    backgroundImage: "",
    backgroundVideo: "",
  });

  // Initialize form data from store whenever heroContent changes
  useEffect(() => {
    console.log("Initializing form with hero content:", heroContent);
    setFormData({
      mainHeading: heroContent.mainHeading || "",
      subHeading: heroContent.subHeading || "",
      quote: heroContent.quote || "",
      ctaText: heroContent.ctaText || "",
      footerText: heroContent.footerText || "",
      backgroundImage: heroContent.backgroundImage || "",
      backgroundVideo: heroContent.backgroundVideo || "",
    });
  }, [heroContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    
    // Make sure we don't accidentally send empty strings if values weren't changed
    const updatedContent = { ...formData };
    
    // Remove any properties with empty strings so they don't override existing values
    Object.keys(updatedContent).forEach(key => {
      if (updatedContent[key as keyof typeof updatedContent] === "") {
        delete updatedContent[key as keyof typeof updatedContent];
      }
    });
    
    console.log("Filtered data to update:", updatedContent);
    updateHeroContent(updatedContent);
    
    toast({
      title: "Changes saved",
      description: "Your hero section has been updated",
    });
  };
  
  const selectMedia = (url: string, type: 'image' | 'video') => {
    if (type === 'image') {
      setFormData(prev => ({ ...prev, backgroundImage: url }));
    } else {
      setFormData(prev => ({ ...prev, backgroundVideo: url }));
    }
  };

  const images = mediaAssets.filter(asset => asset.type === 'image');
  const videos = mediaAssets.filter(asset => asset.type === 'video');

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
        
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-2">Background Media</label>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-wedding-light-gray p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium flex items-center">
                  <Image size={18} className="mr-2" />
                  Background Image
                </h4>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-none border-wedding-black"
                    >
                      Select Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Select Background Image</DialogTitle>
                      <DialogDescription>
                        Choose an image from your media library to use as the hero background
                      </DialogDescription>
                    </DialogHeader>
                    
                    {images.length === 0 ? (
                      <div className="text-center py-8">
                        <p>No images found in your media library.</p>
                        <p className="text-sm text-wedding-dark-gray mt-2">
                          Add images in the Media Library section.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-1">
                        {images.map(image => (
                          <div 
                            key={image.id}
                            className={`
                              border p-2 cursor-pointer transition-all
                              ${formData.backgroundImage === image.url ? 
                                'border-black ring-2 ring-black' : 
                                'border-wedding-light-gray hover:border-wedding-medium-gray'
                              }
                            `}
                            onClick={() => selectMedia(image.url, 'image')}
                          >
                            <div className="aspect-video mb-2 overflow-hidden bg-wedding-light-gray">
                              <img 
                                src={image.url} 
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-sm truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              
              {formData.backgroundImage ? (
                <div className="aspect-video w-full bg-wedding-light-gray flex items-center justify-center overflow-hidden mb-2">
                  <img 
                    src={formData.backgroundImage} 
                    alt="Selected background"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-wedding-light-gray flex items-center justify-center mb-2">
                  <p className="text-wedding-dark-gray">No image selected</p>
                </div>
              )}
              
              <Input
                name="backgroundImage"
                value={formData.backgroundImage}
                onChange={handleChange}
                placeholder="Or paste image URL here"
                className="rounded-none border-wedding-black text-sm"
              />
            </div>
            
            <div className="border border-wedding-light-gray p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium flex items-center">
                  <Film size={18} className="mr-2" />
                  Background Video
                </h4>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-none border-wedding-black"
                    >
                      Select Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Select Background Video</DialogTitle>
                      <DialogDescription>
                        Choose a video from your media library to use as the hero background
                      </DialogDescription>
                    </DialogHeader>
                    
                    {videos.length === 0 ? (
                      <div className="text-center py-8">
                        <p>No videos found in your media library.</p>
                        <p className="text-sm text-wedding-dark-gray mt-2">
                          Add videos in the Media Library section.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-1">
                        {videos.map(video => (
                          <div 
                            key={video.id}
                            className={`
                              border p-2 cursor-pointer transition-all
                              ${formData.backgroundVideo === video.url ? 
                                'border-black ring-2 ring-black' : 
                                'border-wedding-light-gray hover:border-wedding-medium-gray'
                              }
                            `}
                            onClick={() => selectMedia(video.url, 'video')}
                          >
                            <div className="aspect-video mb-2 overflow-hidden bg-wedding-light-gray">
                              <video 
                                src={video.url} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-sm truncate">{video.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              
              {formData.backgroundVideo ? (
                <div className="aspect-video w-full bg-wedding-light-gray flex items-center justify-center overflow-hidden mb-2">
                  <video 
                    src={formData.backgroundVideo} 
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-wedding-light-gray flex items-center justify-center mb-2">
                  <p className="text-wedding-dark-gray">No video selected</p>
                </div>
              )}
              
              <Input
                name="backgroundVideo"
                value={formData.backgroundVideo}
                onChange={handleChange}
                placeholder="Or paste video URL here"
                className="rounded-none border-wedding-black text-sm"
              />
            </div>
          </div>
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
