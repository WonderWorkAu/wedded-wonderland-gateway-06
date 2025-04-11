
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Import all slice types
import { HeroSlice, createHeroSlice } from './slices/heroSlice';
import { StatsSlice, createStatsSlice } from './slices/statsSlice';
import { BenefitsSlice, createBenefitsSlice } from './slices/benefitsSlice';
import { NetworkSlice, createNetworkSlice } from './slices/networkSlice';
import { TestimonialsSlice, createTestimonialsSlice } from './slices/testimonialsSlice';
import { MediaSlice, createMediaSlice } from './slices/mediaSlice';
import { initializeContent } from '@/services/cmsService';

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

// Create the store with persist middleware
// We're still using persist for offline capability and faster initial loads
// But we'll sync with Supabase whenever possible
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
      name: 'wedded-cms-storage', // keep the same storage key for backward compatibility
      version: 1,
      partialize: (state) => ({
        heroContent: state.heroContent,
        statsContent: state.statsContent,
        benefitsContent: state.benefitsContent,
        networkContent: state.networkContent,
        testimonials: state.testimonials,
        mediaAssets: state.mediaAssets,
      }),
      // Add an onRehydrate callback to sync with Supabase after loading from localStorage
      onRehydrateStorage: (state) => {
        return (rehydratedState, error) => {
          if (error) {
            console.error('Error rehydrating store:', error);
            return;
          }
          
          if (rehydratedState) {
            console.log('Store rehydrated from localStorage, now syncing with Supabase');
            
            // After local rehydration, fetch fresh data from Supabase
            initializeContent().then((contentMap) => {
              if (!contentMap) return;
              
              const store = useCMSStore.getState();
              
              // Update each content type if available in Supabase
              if (contentMap.heroContent) store.updateHeroContent(contentMap.heroContent);
              if (contentMap.statsContent) store.updateStatsContent(contentMap.statsContent);
              if (contentMap.benefitsContent) store.updateBenefitsContent(contentMap.benefitsContent);
              if (contentMap.networkContent) store.updateNetworkContent(contentMap.networkContent);
              if (contentMap.testimonials) store.updateTestimonials(contentMap.testimonials);
              if (contentMap.mediaAssets) {
                // For media assets, we need special handling to maintain backward compatibility
                if (Array.isArray(contentMap.mediaAssets)) {
                  store.setMediaAssets(contentMap.mediaAssets);
                }
              }
              
              console.log('Supabase sync complete');
            });
          }
        };
      },
    }
  )
);

// Initialize content from Supabase on app start
// This is separate from the onRehydrateStorage callback to handle cases where
// the localStorage is empty or corrupted
export const initializeCMSFromSupabase = async () => {
  console.log('Initializing CMS from Supabase...');
  const contentMap = await initializeContent();
  if (!contentMap) return false;
  
  const store = useCMSStore.getState();
  
  // Update each content type if available
  if (contentMap.heroContent) store.updateHeroContent(contentMap.heroContent);
  if (contentMap.statsContent) store.updateStatsContent(contentMap.statsContent);
  if (contentMap.benefitsContent) store.updateBenefitsContent(contentMap.benefitsContent);
  if (contentMap.networkContent) store.updateNetworkContent(contentMap.networkContent);
  if (contentMap.testimonials) store.updateTestimonials(contentMap.testimonials);
  if (contentMap.mediaAssets && Array.isArray(contentMap.mediaAssets)) {
    store.setMediaAssets(contentMap.mediaAssets);
  }
  
  return true;
};
