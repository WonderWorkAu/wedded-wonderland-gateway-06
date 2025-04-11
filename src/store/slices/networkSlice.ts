
import { StateCreator } from 'zustand';
import { NetworkContent } from '../types/networkTypes';
import { updateContent } from '@/services/cmsService';

export interface NetworkSlice {
  networkContent: NetworkContent;
  updateNetworkContent: (content: NetworkContent) => void;
}

const initialNetworkContent: NetworkContent = {
  title: "Who Belongs in the Network",
  description: "The Wedded Network is a global collective of the most talented, trusted, and forward-thinking professionals in weddings, events, and celebrations. If you're elevating the industry through excellence, innovation, or inspiration — you belong here.",
  categories: [
    {
      title: "Venues",
      description: "Luxury hotels, iconic venues, and destination properties delivering exceptional experiences and bespoke packages for couples and industry partners worldwide.",
      icon: "Building"
    },
    {
      title: "Planners & Stylists",
      description: "Experts in crafting seamless, stylish, and culturally rich weddings across the globe.",
      icon: "Calendar"
    },
    {
      title: "Photographers & Videographers",
      description: "Visual storytellers capturing weddings with editorial flair and timeless sophistication.",
      icon: "Camera"
    },
    {
      title: "Florists, Designers & Production Teams",
      description: "Creative professionals transforming spaces into immersive, one-of-a-kind wedding environments.",
      icon: "Palette"
    },
    {
      title: "Fashion, Beauty & Lifestyle Brands",
      description: "Bridalwear designers, beauty experts, and lifestyle-focused brands that help couples look and feel their best.",
      icon: "Shirt"
    },
    {
      title: "Entertainers & Taste Makers",
      description: "Performers, musicians, and cultural artists bringing energy, meaning, and magic to every celebration.",
      icon: "Music"
    },
    {
      title: "Tourism Boards & Destination Partners",
      description: "Leaders in wedding tourism connecting couples to extraordinary locations and regional experiences.",
      icon: "Map"
    },
    {
      title: "Content Creators & Media Partners",
      description: "Storytellers, influencers, and publishers amplifying the world of weddings through digital media and authentic narratives.",
      icon: "Video"
    }
  ]
};

export const createNetworkSlice: StateCreator<NetworkSlice> = (set) => ({
  networkContent: initialNetworkContent,
  updateNetworkContent: (content) => set((state) => {
    const updatedContent = { ...state.networkContent, ...content };
    // Sync with Supabase
    updateContent('networkContent', updatedContent);
    return { networkContent: updatedContent };
  }),
});
