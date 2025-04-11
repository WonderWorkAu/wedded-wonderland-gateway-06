
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Import all slice types
import { HeroSlice, createHeroSlice } from './slices/heroSlice';
import { StatsSlice, createStatsSlice } from './slices/statsSlice';
import { BenefitsSlice, createBenefitsSlice } from './slices/benefitsSlice';
import { NetworkSlice, createNetworkSlice } from './slices/networkSlice';
import { TestimonialsSlice, createTestimonialsSlice } from './slices/testimonialsSlice';
import { MediaSlice, createMediaSlice } from './slices/mediaSlice';
import { initializeContent, fetchContent } from '@/services/cmsService';

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
      name: 'wedded-cms-storage',
      version: 3, // Increment version to force re-hydration
      partialize: (state) => ({
        heroContent: state.heroContent,
        statsContent: state.statsContent,
        benefitsContent: state.benefitsContent,
        networkContent: state.networkContent,
        testimonials: state.testimonials,
        mediaAssets: state.mediaAssets,
      }),
      onRehydrateStorage: () => {
        return (rehydratedState, error) => {
          if (error) {
            console.error('Error rehydrating store:', error);
            return;
          }
          
          if (rehydratedState) {
            console.log('Store rehydrated from localStorage');
          }
        };
      },
    }
  )
);

// Initialize content from Supabase on app start
export const initializeCMSFromSupabase = async () => {
  console.log('Initializing CMS from Supabase...');
  
  try {
    // Clear local storage first to ensure we're starting fresh
    localStorage.removeItem('wedded-cms-storage');
    
    const contentMap = await initializeContent();
    if (!contentMap) {
      console.log('No content found in Supabase');
      return false;
    }
    
    console.log('Retrieved content map from Supabase:', contentMap);
    const store = useCMSStore.getState();
    let contentUpdated = false;
    
    // Update each content type if available with mandatory strict typing
    if (contentMap.heroContent) {
      console.log('Setting heroContent from Supabase:', contentMap.heroContent);
      await store.updateHeroContent(contentMap.heroContent);
      contentUpdated = true;
    }
    
    if (contentMap.statsContent) {
      console.log('Setting statsContent from Supabase:', contentMap.statsContent);
      await store.updateStatsContent(contentMap.statsContent);
      contentUpdated = true;
    }
    
    if (contentMap.benefitsContent) {
      console.log('Setting benefitsContent from Supabase:', contentMap.benefitsContent);
      await store.updateBenefitsContent(contentMap.benefitsContent);
      contentUpdated = true;
    }
    
    if (contentMap.networkContent) {
      console.log('Setting networkContent from Supabase:', contentMap.networkContent);
      await store.updateNetworkContent(contentMap.networkContent);
      contentUpdated = true;
    }
    
    if (contentMap.testimonials) {
      console.log('Setting testimonials from Supabase:', contentMap.testimonials);
      await store.updateTestimonials(contentMap.testimonials);
      contentUpdated = true;
    }
    
    if (contentMap.mediaAssets && Array.isArray(contentMap.mediaAssets)) {
      console.log('Setting mediaAssets from Supabase:', contentMap.mediaAssets);
      store.setMediaAssets(contentMap.mediaAssets);
      contentUpdated = true;
    }
    
    return contentUpdated;
  } catch (error) {
    console.error('Error initializing from Supabase:', error);
    return false;
  }
};

// Add a function to manually verify a specific content type with proper return typing
export const verifyContentType = async <T>(contentType: string): Promise<T | null> => {
  try {
    console.log(`Manually verifying ${contentType} content...`);
    const data = await fetchContent<T>(contentType as any);
    console.log(`Verification result for ${contentType}:`, data);
    return data;
  } catch (error) {
    console.error(`Error verifying ${contentType}:`, error);
    return null;
  }
};

// Force refresh CMS data from Supabase
export const refreshCMSFromSupabase = async () => {
  console.log('Force refreshing CMS data from Supabase...');
  
  // Clear local storage to prevent conflicts
  localStorage.removeItem('wedded-cms-storage');
  
  // Re-initialize from Supabase
  return await initializeCMSFromSupabase();
};
