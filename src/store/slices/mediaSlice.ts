
import { StateCreator } from 'zustand';
import { MediaAsset } from '../types/mediaTypes';

export interface MediaSlice {
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: MediaAsset) => void;
  removeMediaAsset: (id: string) => void;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  getMediaAssets: () => MediaAsset[];
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
  addMediaAsset: (asset) => set((state) => ({
    mediaAssets: [...state.mediaAssets, asset]
  })),
  removeMediaAsset: (id) => set((state) => ({
    mediaAssets: state.mediaAssets.filter(asset => asset.id !== id)
  })),
  updateMediaAsset: (id, updates) => set((state) => ({
    mediaAssets: state.mediaAssets.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    )
  })),
  getMediaAssets: () => get().mediaAssets,
});
