
import { StateCreator } from 'zustand';
import { MediaAsset } from '../types/mediaTypes';
import { updateContent, mediaService } from '@/services/cmsService';

export interface MediaSlice {
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: MediaAsset) => void;
  removeMediaAsset: (id: string) => void;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  getMediaAssets: () => MediaAsset[];
  setMediaAssets: (assets: MediaAsset[]) => void;
  uploadMediaFile: (file: File, name?: string) => Promise<MediaAsset | null>;
}

const initialMediaAssets: MediaAsset[] = [
  {
    id: "default-hero-video",
    type: "video",
    url: "https://weddednetwork.com/video/wedded-network-hero-video.mp4",
    name: "Default Hero Video",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "default-hero-image",
    type: "image",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    name: "Default Hero Image",
    uploadedAt: new Date().toISOString(),
  }
];

export const createMediaSlice: StateCreator<MediaSlice> = (set, get) => ({
  mediaAssets: initialMediaAssets,
  
  addMediaAsset: (asset) => {
    set((state) => {
      const newMediaAssets = [...state.mediaAssets, asset];
      // Sync with Supabase
      updateContent('mediaAssets', newMediaAssets);
      return { mediaAssets: newMediaAssets };
    });
  },
  
  removeMediaAsset: (id) => {
    set((state) => {
      // Find asset to get storage path if available
      const assetToRemove = state.mediaAssets.find(asset => asset.id === id);
      
      // First remove from local state
      const newMediaAssets = state.mediaAssets.filter(asset => asset.id !== id);
      
      // Sync with Supabase
      updateContent('mediaAssets', newMediaAssets);
      
      // If this is a Supabase storage file, also delete from storage
      if (assetToRemove?.storagePath) {
        mediaService.deleteFile(assetToRemove.storagePath);
      }
      
      return { mediaAssets: newMediaAssets };
    });
  },
  
  updateMediaAsset: (id, updates) => {
    set((state) => {
      const newMediaAssets = state.mediaAssets.map(asset => 
        asset.id === id ? { ...asset, ...updates } : asset
      );
      
      // Sync with Supabase
      updateContent('mediaAssets', newMediaAssets);
      
      return { mediaAssets: newMediaAssets };
    });
  },
  
  getMediaAssets: () => get().mediaAssets,
  
  setMediaAssets: (assets) => {
    set({ mediaAssets: assets });
  },
  
  uploadMediaFile: async (file, name) => {
    // Upload file to Supabase Storage
    const result = await mediaService.uploadFile(file);
    
    if (!result) return null;
    
    const type = file.type.startsWith('image/') ? 'image' : 'video';
    
    const newAsset: MediaAsset = {
      id: `asset-${Date.now()}`,
      type,
      url: result.url,
      name: name || result.name,
      uploadedAt: new Date().toISOString(),
      storagePath: result.id
    };
    
    // Use addMediaAsset to also update Supabase
    get().addMediaAsset(newAsset);
    
    return newAsset;
  }
});
