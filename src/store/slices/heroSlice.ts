
import { StateCreator } from 'zustand';
import { HeroContent } from '../types/heroTypes';
import { updateContent } from '@/services/cmsService';

export interface HeroSlice {
  heroContent: HeroContent;
  updateHeroContent: (content: Partial<HeroContent>) => Promise<boolean>;
  forceHeroRefresh: () => void;
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
    // Update state first to ensure UI is responsive
    set((state) => {
      const updatedContent: HeroContent = { ...state.heroContent, ...content };
      
      // Log the full content that will be saved
      console.log("Full hero content to be saved:", updatedContent);
      
      return { heroContent: updatedContent };
    });
    
    // Get the updated content from the store after the state update
    const currentContent = get().heroContent;
    
    // Sync with Supabase using async/await for better error handling
    try {
      // Make 5 attempts to update the content with exponential backoff
      for (let attempt = 0; attempt < 5; attempt++) {
        if (attempt > 0) {
          console.log(`Retrying update (attempt ${attempt + 1})...`);
          // Wait longer between each retry
          await new Promise(resolve => setTimeout(resolve, attempt * 1500));
        }
        
        success = await updateContent('heroContent', currentContent);
        
        if (success) {
          console.log("Successfully updated hero content in Supabase:", currentContent);
          break;
        } else {
          console.error("Failed to update hero content in Supabase (attempt " + (attempt + 1) + ")");
        }
      }
    } catch (error) {
      console.error("Exception during hero content update:", error);
      success = false;
    }
    
    return success;
  },
  
  forceHeroRefresh: () => {
    // Force a refresh by cloning and re-applying the current content
    const current = get().heroContent;
    set({ heroContent: { ...current } });
  },
});
