
import { StateCreator } from 'zustand';
import { HeroContent } from '../types/heroTypes';

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
    set((state) => ({ 
      heroContent: { ...state.heroContent, ...content } 
    }));
  },
});
