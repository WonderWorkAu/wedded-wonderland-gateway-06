
import { StateCreator } from 'zustand';
import { BenefitsContent } from '../types/benefitsTypes';
import { updateContent } from '@/services/cmsService';

export interface BenefitsSlice {
  benefitsContent: BenefitsContent;
  updateBenefitsContent: (content: BenefitsContent) => void;
}

const initialBenefitsContent: BenefitsContent = {
  title: "Why Top Professionals Join Our Network",
  subtitle: "Unlock unparalleled opportunities to grow your luxury wedding business on a global scale",
  cta: "APPLY TO JOIN TODAY",
  benefits: [
    {
      title: "Global Directory Discovery",
      description: "Get found by high-intent couples and trusted industry professionals through our curated international directory.",
      highlight: "10M+ monthly audience",
      icon: "Globe"
    },
    {
      title: "Elite Network Access",
      description: "Become part of a global network spanning 54+ countries and 7 continents, built on excellence and trust.",
      highlight: "Premium, vetted community",
      icon: "Users"
    },
    {
      title: "Multi-Channel Brand Amplification",
      description: "Gain visibility through strategic features across social media, digital magazines, newsletters, and editorial showcases.",
      highlight: "3M+ social followers",
      icon: "MegaphoneIcon"
    },
    {
      title: "Qualified Referral Concierge",
      description: "Get matched with couples via our personalised vendor recommendation service, designed to drive real results.",
      highlight: "Direct booking opportunities",
      icon: "PhoneCall"
    },
    {
      title: "Prestige By Association",
      description: "Align your business with one of the world's most recognised and respected names in the wedding industry.",
      highlight: "Instant credibility boost",
      icon: "Award"
    }
  ]
};

export const createBenefitsSlice: StateCreator<BenefitsSlice> = (set) => ({
  benefitsContent: initialBenefitsContent,
  updateBenefitsContent: (content) => set((state) => {
    const updatedContent = { ...state.benefitsContent, ...content };
    // Sync with Supabase
    updateContent('benefitsContent', updatedContent);
    return { benefitsContent: updatedContent };
  }),
});
