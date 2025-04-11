
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Import all slice types
import { HeroSlice, createHeroSlice } from './slices/heroSlice';
import { StatsSlice, createStatsSlice } from './slices/statsSlice';
import { BenefitsSlice, createBenefitsSlice } from './slices/benefitsSlice';
import { NetworkSlice, createNetworkSlice } from './slices/networkSlice';
import { TestimonialsSlice, createTestimonialsSlice } from './slices/testimonialsSlice';
import { MediaSlice, createMediaSlice } from './slices/mediaSlice';

// Re-export all types for convenience
export * from './types/heroTypes';
export * from './types/statsTypes';
export * from './types/benefitsTypes';
export * from './types/networkTypes';
export * from './types/testimonialTypes';
export * from './types/mediaTypes';

// Define the complete store type
export type CMSStore = 
  HeroSlice & 
  StatsSlice & 
  BenefitsSlice & 
  NetworkSlice & 
  TestimonialsSlice &
  MediaSlice;

// Create the store with persist middleware to save to localStorage
export const useCMSStore = create<CMSStore>()(
  persist(
    (...a) => ({
      ...createHeroSlice(...a),
      ...createStatsSlice(...a),
      ...createBenefitsSlice(...a),
      ...createNetworkSlice(...a),
      ...createTestimonialsSlice(...a),
      ...createMediaSlice(...a),
    }),
    {
      name: 'wedded-cms-storage', // name of the item in localStorage
      version: 1, // version number for potential future migrations
      partialize: (state) => ({
        heroContent: state.heroContent,
        statsContent: state.statsContent,
        benefitsContent: state.benefitsContent,
        networkContent: state.networkContent,
        testimonials: state.testimonials,
        mediaAssets: state.mediaAssets,
      }),
    }
  )
);
