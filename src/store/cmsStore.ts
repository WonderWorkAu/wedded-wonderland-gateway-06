import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the types for our store
export interface HeroContent {
  mainHeading?: string;
  subHeading?: string;
  quote?: string;
  ctaText?: string;
  footerText?: string;
  backgroundVideo?: string;
  backgroundImage?: string;
}

export interface StatsContent {
  heading?: string;
  brands?: string[];
  stats?: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
  brandLogos?: string[];
}

export interface Benefit {
  title: string;
  description: string;
  highlight: string;
  icon: string;
  image?: string;
}

export interface BenefitsContent {
  title?: string;
  subtitle?: string;
  cta?: string;
  benefits: Benefit[];
  backgroundImage?: string;
}

export interface NetworkCategory {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface NetworkContent {
  title?: string;
  description?: string;
  categories: NetworkCategory[];
  backgroundImage?: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  role: string;
  highlight: string;
  transform: string;
  image?: string;
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  uploadedAt: string;
}

export interface CMSStore {
  heroContent: HeroContent;
  statsContent: StatsContent;
  benefitsContent: BenefitsContent;
  networkContent: NetworkContent;
  testimonials: Testimonial[];
  mediaAssets: MediaAsset[];
  
  // Update methods
  updateHeroContent: (content: HeroContent) => void;
  updateStatsContent: (content: StatsContent) => void;
  updateBenefitsContent: (content: BenefitsContent) => void;
  updateNetworkContent: (content: NetworkContent) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  
  // Media asset management
  addMediaAsset: (asset: MediaAsset) => void;
  removeMediaAsset: (id: string) => void;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  getMediaAssets: () => MediaAsset[];
}

// Create the store with persist middleware to save to localStorage
export const useCMSStore = create<CMSStore>()(
  persist(
    (set, get) => ({
      heroContent: {
        mainHeading: "Your Craft Is World-Class. Your Visibility Should Be Too.",
        subHeading: "Join the exclusive network reaching 10M+ monthly couples across 54+ countries who are actively searching for exceptional wedding professionals like you.",
        quote: "You've mastered your craft. Now it's time to master your market.",
        ctaText: "BECOME A WEDDED PARTNER",
        footerText: "*Limited memberships available for 2025",
        backgroundVideo: "https://weddednetwork.com/video/wedded-network-hero-video.mp4",
        backgroundImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
      },
      
      statsContent: {
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
      },
      
      benefitsContent: {
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
      },
      
      networkContent: {
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
      },
      
      testimonials: [
        {
          name: "Nagam",
          quote: "Wedded Wonderland isn't just a platform—it's a powerhouse. They connect the dots across the world, not just between vendors and couples, but between cultures, creativity, and commerce. Since joining, we've expanded into three new countries.",
          role: "Luxury Wedding Planner",
          highlight: "Global expansion",
          transform: "3 new market countries opened"
        },
        {
          name: "Erin Holland",
          quote: "The Wedded Network connected me with the most incredible vendors for my special day. Their curated directory made finding trusted professionals so much easier. But what surprised me most was how they understood exactly what I was looking for before I could even articulate it.",
          role: "Media Personality & Bride",
          highlight: "Perfect match connections",
          transform: "Saved 40+ hours of research"
        },
        {
          name: "Sarah Jane",
          quote: "Thank you so much for all of your help on the wedding front! As an upcoming bride I can honestly say you've been the driving force having our wedding work! The vendors you connected us with understood our vision perfectly.",
          role: "Executive Bride",
          highlight: "Expert guidance",
          transform: "Vision brought to life"
        },
        {
          name: "Lindsey",
          quote: "Being part of the Wedded Network has transformed our business. The quality of leads and the industry connections we've made have been invaluable to our growth. We've doubled our bookings in the premium segment and expanded our team since joining.",
          role: "Wedding Planner",
          highlight: "Business transformation",
          transform: "100% growth in premium bookings"
        },
        {
          name: "Alejandra",
          quote: "The Wedded Concierge service matched us with clients who were perfect for our brand. It's been the most effective marketing channel for our venue. We've had a 70% conversion rate from referrals, compared to just 20% from other platforms.",
          role: "Luxury Venue Owner",
          highlight: "High conversion referrals",
          transform: "70% booking conversion rate"
        },
        {
          name: "Srikant",
          quote: "The B2B community has been a game-changer for our destination wedding planning business. We've formed partnerships across the globe that have opened doors we never thought possible. Our revenue from international clients has tripled.",
          role: "Destination Wedding Specialist",
          highlight: "Revenue-driving partnerships",
          transform: "3x international client revenue"
        }
      ],
      
      mediaAssets: [
        {
          id: "default-hero-video",
          type: "video",
          url: "https://weddednetwork.com/video/wedded-network-hero-video.mp4",
          name: "Default Hero Video",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "default-hero-image",
          type: "image",
          url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
          name: "Default Hero Image",
          uploadedAt: new Date().toISOString(),
        }
      ],
      
      // Update methods
      updateHeroContent: (content) => {
        console.log("Store updating hero content with:", content);
        set((state) => ({ 
          heroContent: { ...state.heroContent, ...content } 
        }));
      },
      
      updateStatsContent: (content) => set((state) => ({ 
        statsContent: { ...state.statsContent, ...content } 
      })),
      
      updateBenefitsContent: (content) => set((state) => ({ 
        benefitsContent: { ...state.benefitsContent, ...content } 
      })),
      
      updateNetworkContent: (content) => set((state) => ({ 
        networkContent: { ...state.networkContent, ...content } 
      })),
      
      updateTestimonials: (testimonials) => set({ testimonials }),
      
      // Media asset management
      addMediaAsset: (asset) => set((state) => ({
        mediaAssets: [...state.mediaAssets, asset]
      })),
      
      removeMediaAsset: (id) => set((state) => ({
        mediaAssets: state.mediaAssets.filter(asset => asset.id !== id)
      })),
      
      updateMediaAsset: (id, updates) => set((state) => ({
        mediaAssets: state.mediaAssets.map(asset => 
          asset.id === id ? { ...asset, ...updates } : asset
        )
      })),
      
      getMediaAssets: () => get().mediaAssets,
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
