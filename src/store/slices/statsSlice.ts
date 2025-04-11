
import { StateCreator } from 'zustand';
import { StatsContent } from '../types/statsTypes';

export interface StatsSlice {
  statsContent: StatsContent;
  updateStatsContent: (content: StatsContent) => void;
}

const initialStatsContent: StatsContent = {
  heading: "Recognized and Trusted By",
  brands: ["VOGUE", "HARPER'S", "BRIDES", "ELLE", "BAZAAR"],
  stats: [
    { value: "54+", label: "Countries With Active Members", detail: "Global Network Access" },
    { value: "10M+", label: "Monthly Audience Reach", detail: "High-Intent Couples" },
    { value: "3M+", label: "Social Media Following", detail: "Multi-Channel Visibility" }
  ],
  brandLogos: [
    "https://weddednetwork.com/images/brand-logos/vogue.svg",
    "https://weddednetwork.com/images/brand-logos/harpers.svg",
    "https://weddednetwork.com/images/brand-logos/brides.svg",
    "https://weddednetwork.com/images/brand-logos/elle.svg",
    "https://weddednetwork.com/images/brand-logos/bazaar.svg"
  ],
};

export const createStatsSlice: StateCreator<StatsSlice> = (set) => ({
  statsContent: initialStatsContent,
  updateStatsContent: (content) => set((state) => ({ 
    statsContent: { ...state.statsContent, ...content } 
  })),
});
