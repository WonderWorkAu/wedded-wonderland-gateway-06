
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useStylingStore } from '@/store/stylingStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from 'lucide-react';
import { Label } from "@/components/ui/label";

const StylingEditor = () => {
  const { globalStyles, heroStyles, updateGlobalStyles, updateHeroStyles } = useStylingStore();
  const { toast } = useToast();
  
  // Create local state for the form
  const [globalFormData, setGlobalFormData] = useState({...globalStyles});
  const [heroFormData, setHeroFormData] = useState({...heroStyles});
  
  const handleGlobalChange = (field: string, value: string) => {
    setGlobalFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHeroChange = (field: string, value: any) => {
    setHeroFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleHeroSizeChange = (section: string, screen: 'mobile' | 'desktop', value: string) => {
    setHeroFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as object,
        [screen]: value
      }
    }));
  };

  const handleGlobalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalStyles(globalFormData);
    toast({
      title: "Global styles updated",
      description: "Your changes have been saved",
    });
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroStyles(heroFormData);
    toast({
      title: "Hero styles updated",
      description: "Your changes have been saved",
    });
    
    // Force a refresh of the page to see changes
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  // Font families available
  const fontFamilies = [
    "sans-serif",
    "serif",
    "monospace",
    "cursive",
    "system-ui",
    "ui-serif",
    "ui-sans-serif",
    "ui-monospace",
    "ui-rounded"
  ];

  // Font size options
  const fontSizes = [
    "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-light mb-6">Style Controls</h2>
      
      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="global" className="rounded-none">Global Styles</TabsTrigger>
          <TabsTrigger value="hero" className="rounded-none">Hero Section</TabsTrigger>
        </TabsList>
        
        {/* Global Styling Tab */}
        <TabsContent value="global" className="bg-white p-6 border border-wedding-light-gray">
          <form onSubmit={handleGlobalSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Font Family</label>
              <Select 
                value={globalFormData.fontFamily} 
                onValueChange={(value) => handleGlobalChange('fontFamily', value)}
              >
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue placeholder="Select a font family" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <div className="flex gap-3">
                <Input
                  type="color"
                  value={globalFormData.primaryColor}
                  onChange={(e) => handleGlobalChange('primaryColor', e.target.value)}
                  className="w-16 h-10 p-1 rounded-none"
                />
                <Input
                  type="text"
                  value={globalFormData.primaryColor}
                  onChange={(e) => handleGlobalChange('primaryColor', e.target.value)}
                  className="rounded-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <div className="flex gap-3">
                <Input
                  type="color"
                  value={globalFormData.secondaryColor}
                  onChange={(e) => handleGlobalChange('secondaryColor', e.target.value)}
                  className="w-16 h-10 p-1 rounded-none"
                />
                <Input
                  type="text"
                  value={globalFormData.secondaryColor}
                  onChange={(e) => handleGlobalChange('secondaryColor', e.target.value)}
                  className="rounded-none"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none flex items-center gap-2"
              >
                <Save size={16} />
                Save Global Styles
              </Button>
            </div>
          </form>
        </TabsContent>
        
        {/* Hero Section Styling Tab */}
        <TabsContent value="hero" className="bg-white p-6 border border-wedding-light-gray">
          <form onSubmit={handleHeroSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Background Video Opacity ({Math.round(heroFormData.backgroundVideoOpacity * 100)}%)</label>
                <Slider
                  value={[heroFormData.backgroundVideoOpacity * 100]}
                  onValueChange={(value) => handleHeroChange('backgroundVideoOpacity', value[0] / 100)}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Background Image Opacity ({Math.round(heroFormData.backgroundImageOpacity * 100)}%)</label>
                <Slider
                  value={[heroFormData.backgroundImageOpacity * 100]}
                  onValueChange={(value) => handleHeroChange('backgroundImageOpacity', value[0] / 100)}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
            </div>
            
            <div className="pt-6 border-t mt-6">
              <h3 className="text-lg font-medium mb-4">Text Sizes (Mobile vs Desktop)</h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Heading Font Size</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm">Mobile</Label>
                      </div>
                      <Select 
                        value={heroFormData.headingFontSize.mobile} 
                        onValueChange={(value) => handleHeroSizeChange('headingFontSize', 'mobile', value)}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Mobile font size" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizes.map((size) => (
                            <SelectItem key={`heading-mobile-${size}`} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm">Desktop</Label>
                      </div>
                      <Select 
                        value={heroFormData.headingFontSize.desktop} 
                        onValueChange={(value) => handleHeroSizeChange('headingFontSize', 'desktop', value)}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Desktop font size" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizes.map((size) => (
                            <SelectItem key={`heading-desktop-${size}`} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Subheading Font Size</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm">Mobile</Label>
                      </div>
                      <Select 
                        value={heroFormData.subheadingFontSize.mobile} 
                        onValueChange={(value) => handleHeroSizeChange('subheadingFontSize', 'mobile', value)}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Mobile font size" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizes.map((size) => (
                            <SelectItem key={`subheading-mobile-${size}`} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm">Desktop</Label>
                      </div>
                      <Select 
                        value={heroFormData.subheadingFontSize.desktop} 
                        onValueChange={(value) => handleHeroSizeChange('subheadingFontSize', 'desktop', value)}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Desktop font size" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizes.map((size) => (
                            <SelectItem key={`subheading-desktop-${size}`} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Quote Font Size</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm">Mobile</Label>
                      </div>
                      <Select 
                        value={heroFormData.quoteFontSize.mobile} 
                        onValueChange={(value) => handleHeroSizeChange('quoteFontSize', 'mobile', value)}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Mobile font size" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizes.map((size) => (
                            <SelectItem key={`quote-mobile-${size}`} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm">Desktop</Label>
                      </div>
                      <Select 
                        value={heroFormData.quoteFontSize.desktop} 
                        onValueChange={(value) => handleHeroSizeChange('quoteFontSize', 'desktop', value)}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Desktop font size" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizes.map((size) => (
                            <SelectItem key={`quote-desktop-${size}`} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none flex items-center gap-2"
              >
                <Save size={16} />
                Save Hero Styles
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StylingEditor;
