
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useCMSStore, MediaAsset } from '@/store/cmsStore';
import { Trash2, Upload, Copy, Check } from 'lucide-react';

const MediaLibrary = () => {
  const { mediaAssets, addMediaAsset, removeMediaAsset } = useCMSStore();
  const { toast } = useToast();
  const [uploadName, setUploadName] = useState("");
  const [selectedTab, setSelectedTab] = useState<"images" | "videos">("images");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const type = file.type.startsWith('image/') ? 'image' : 'video';
    
    if ((type === 'image' && selectedTab !== 'images') || 
        (type === 'video' && selectedTab !== 'videos')) {
      toast({
        title: "Wrong file type",
        description: `Please upload ${selectedTab} in this tab.`,
        variant: "destructive",
      });
      return;
    }
    
    // Create object URL for preview
    const url = URL.createObjectURL(file);
    
    const name = uploadName || file.name;
    
    // In a real app, we'd upload to a real storage service here
    // For demo purposes, we'll just use the object URL
    const newAsset: MediaAsset = {
      id: `asset-${Date.now()}`,
      type,
      url,
      name,
      uploadedAt: new Date().toISOString(),
    };
    
    addMediaAsset(newAsset);
    setUploadName("");
    toast({
      title: "Upload successful",
      description: `${type} "${name}" has been added to your library`,
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDelete = (id: string) => {
    removeMediaAsset(id);
    toast({
      title: "Media deleted",
      description: "The media asset has been removed from your library",
    });
  };
  
  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      toast({
        title: "URL copied",
        description: "Media URL has been copied to clipboard",
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopiedId(null), 2000);
    });
  };
  
  const filteredAssets = mediaAssets.filter(asset => 
    (selectedTab === 'images' && asset.type === 'image') || 
    (selectedTab === 'videos' && asset.type === 'video')
  );
  
  return (
    <div>
      <h2 className="text-2xl font-light mb-6">Media Library</h2>
      
      <Tabs 
        defaultValue="images" 
        className="w-full"
        onValueChange={(value) => setSelectedTab(value as "images" | "videos")}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="images" className="rounded-none">Images</TabsTrigger>
          <TabsTrigger value="videos" className="rounded-none">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="images">
          <div className="mb-8">
            <h3 className="text-xl font-light mb-4">Upload Image</h3>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <Input
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                placeholder="Image name (optional)"
                className="rounded-none border-wedding-black flex-1"
              />
              <div className="flex gap-2">
                <input 
                  type="file" 
                  id="image-upload" 
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
                <Button 
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none"
                >
                  <Upload size={18} className="mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="mb-8">
            <h3 className="text-xl font-light mb-4">Upload Video</h3>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <Input
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                placeholder="Video name (optional)"
                className="rounded-none border-wedding-black flex-1"
              />
              <div className="flex gap-2">
                <input 
                  type="file" 
                  id="video-upload" 
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
                <Button 
                  onClick={() => document.getElementById('video-upload')?.click()}
                  className="bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none"
                >
                  <Upload size={18} className="mr-2" />
                  Upload Video
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <h3 className="text-xl font-light mb-4">My {selectedTab === 'images' ? 'Images' : 'Videos'}</h3>
      
      {filteredAssets.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-wedding-medium-gray">
          <p className="text-wedding-dark-gray">
            No {selectedTab} found. Upload some to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div 
              key={asset.id} 
              className="border border-wedding-light-gray p-4 relative group"
            >
              <div className="aspect-video w-full bg-wedding-light-gray flex items-center justify-center overflow-hidden">
                {asset.type === 'image' ? (
                  <img 
                    src={asset.url} 
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={asset.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              
              <div className="mt-3">
                <h4 className="font-medium truncate">{asset.name}</h4>
                <p className="text-sm text-wedding-dark-gray">
                  {new Date(asset.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none border-wedding-black px-2 py-1 text-xs flex-1"
                  onClick={() => copyToClipboard(asset.url, asset.id)}
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check size={14} className="mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1" />
                      Copy URL
                    </>
                  )}
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-none px-2 py-1 text-xs"
                  onClick={() => handleDelete(asset.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
