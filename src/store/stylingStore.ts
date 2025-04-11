
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GlobalStyles {
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface HeroStyles {
  backgroundVideoOpacity: number;
  backgroundImageOpacity: number;
  headingFontSize: {
    mobile: string;
    desktop: string;
  };
  subheadingFontSize: {
    mobile: string;
    desktop: string;
  };
  quoteFontSize: {
    mobile: string;
    desktop: string;
  };
}

export interface StylingStore {
  globalStyles: GlobalStyles;
  heroStyles: HeroStyles;
  
  // Update methods
  updateGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  updateHeroStyles: (styles: Partial<HeroStyles>) => void;
}

export const useStylingStore = create<StylingStore>()(
  persist(
    (set) => ({
      globalStyles: {
        fontFamily: "sans-serif",
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
      },
      heroStyles: {
        backgroundVideoOpacity: 0.4,
        backgroundImageOpacity: 0.05,
        headingFontSize: {
          mobile: "3xl",
          desktop: "7xl",
        },
        subheadingFontSize: {
          mobile: "lg",
          desktop: "2xl",
        },
        quoteFontSize: {
          mobile: "lg",
          desktop: "2xl",
        },
      },
      
      // Update methods
      updateGlobalStyles: (styles) => set((state) => ({
        globalStyles: { ...state.globalStyles, ...styles }
      })),
      updateHeroStyles: (styles) => set((state) => ({
        heroStyles: { ...state.heroStyles, ...styles }
      })),
    }),
    {
      name: 'wedded-styling-storage',
      version: 1,
    }
  )
);
