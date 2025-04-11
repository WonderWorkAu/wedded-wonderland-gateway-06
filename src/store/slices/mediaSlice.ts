
import { StateCreator } from 'zustand';
import { MediaAsset } from '../types/mediaTypes'; 
import { updateContent, mediaService } from '@/services/cmsService';

export interface MediaSlice {
  mediaAssets: MediaAsset[];
  setMediaAssets: (assets: MediaAsset[]) => void;
  addMediaAsset: (asset: MediaAsset) => void;
  removeMediaAsset: (id: string) => void;
  uploadMediaFile: (file: File, name?: string) => Promise<MediaAsset | null>;
}

const initialMediaAssets: MediaAsset[] = [];

export const createMediaSlice: StateCreator<MediaSlice> = (set, get) => ({
  mediaAssets: initialMediaAssets,
  
  setMediaAssets: (assets: MediaAsset[]) => {
    set({ mediaAssets: assets });
    // Sync with Supabase
    updateContent('mediaAssets', assets);
  },
  
  addMediaAsset: (asset: MediaAsset) => {
    set((state) => {
      const updatedAssets = [...state.mediaAssets, asset];
      // Sync with Supabase
      updateContent('mediaAssets', updatedAssets);
      return { mediaAssets: updatedAssets };
    });
  },
  
  removeMediaAsset: (id: string) => {
    set((state) => {
      const assetToRemove = state.mediaAssets.find(asset => asset.id === id);
      if (assetToRemove?.storagePath) {
        // Delete from Supabase Storage
        mediaService.deleteFile(assetToRemove.storagePath);
      }
      
      const updatedAssets = state.mediaAssets.filter(asset => asset.id !== id);
      // Sync with Supabase
      updateContent('mediaAssets', updatedAssets);
      return { mediaAssets: updatedAssets };
    });
  },
  
  uploadMediaFile: async (file: File, name?: string) => {
    try {
      const displayName = name || file.name;
      
      // Upload to Supabase Storage
      const uploadResult = await mediaService.uploadFile(file);
      
      if (!uploadResult) {
        throw new Error("Failed to upload file to Supabase Storage");
      }
      
      const newAsset: MediaAsset = {
        id: uploadResult.id,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        url: uploadResult.url,
        name: displayName,
        uploadedAt: new Date().toISOString(),
        storagePath: uploadResult.storagePath
      };
      
      // Add to store which also syncs with Supabase
      get().addMediaAsset(newAsset);
      
      return newAsset;
    } catch (error) {
      console.error("Error uploading media file:", error);
      return null;
    }
  }
});
