
import { StateCreator } from 'zustand';
import { HeroContent } from '../types/heroTypes';
import { updateContent } from '@/services/cmsService';

export interface HeroSlice {
  heroContent: HeroContent;
  updateHeroContent: (content: Partial<HeroContent>) => Promise<boolean>;
}

const initialHeroContent: HeroContent = {
  mainHeading: "Your Craft Is World-Class. Your Visibility Should Be Too.",
  subHeading: "Join the exclusive network reaching 10M+ monthly couples across 54+ countries who are actively searching for exceptional wedding professionals like you.",
  quote: "You've mastered your craft. Now it's time to master your market.",
  ctaText: "BECOME A WEDDED PARTNER",
  footerText: "*Limited memberships available for 2025",
  backgroundVideo: "https://weddednetwork.com/video/wedded-network-hero-video.mp4",
  backgroundImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
};

export const createHeroSlice: StateCreator<HeroSlice> = (set, get) => ({
  heroContent: initialHeroContent,
  updateHeroContent: async (content) => {
    console.log("Store updating hero content with:", content);
    
    let success = false;
    
    // Make sure we have a complete hero content object by merging with current state
    set((state) => {
      const updatedContent = { ...state.heroContent, ...content };
      
      // Log the full content that will be saved
      console.log("Full hero content to be saved:", updatedContent);
      
      return { heroContent: updatedContent };
    });
    
    // Get the updated content from the store after the state update
    const currentContent = get().heroContent;
    
    // Sync with Supabase using async/await for better error handling
    try {
      success = await updateContent('heroContent', currentContent);
      
      if (!success) {
        console.error("Failed to update hero content in Supabase");
      } else {
        console.log("Successfully updated hero content in Supabase:", currentContent);
      }
    } catch (error) {
      console.error("Exception during hero content update:", error);
      success = false;
    }
    
    return success;
  },
});
