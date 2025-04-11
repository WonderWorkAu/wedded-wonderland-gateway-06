
import { StateCreator } from 'zustand';
import { HeroContent } from '../types/heroTypes';
import { updateContent } from '@/services/cmsService';

export interface HeroSlice {
  heroContent: HeroContent;
  updateHeroContent: (content: HeroContent) => void;
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

export const createHeroSlice: StateCreator<HeroSlice> = (set) => ({
  heroContent: initialHeroContent,
  updateHeroContent: (content) => {
    console.log("Store updating hero content with:", content);
    
    // Make sure we have a complete hero content object by merging with current state
    set((state) => {
      const updatedContent = { ...state.heroContent, ...content };
      
      // Verify we have the background video before sending to Supabase
      console.log("Final hero content to be saved:", updatedContent);
      
      // Sync with Supabase - wrap in try/catch for better error handling
      try {
        updateContent('heroContent', updatedContent)
          .then(success => {
            if (!success) {
              console.error("Failed to update hero content in Supabase");
            }
          })
          .catch(error => {
            console.error("Error updating hero content:", error);
          });
      } catch (error) {
        console.error("Exception during hero content update:", error);
      }
      
      return { heroContent: updatedContent };
    });
  },
});
