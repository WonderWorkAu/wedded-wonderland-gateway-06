
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import BenefitsSection from '@/components/BenefitsSection';
import NetworkMembersSection from '@/components/NetworkMembersSection';
import PricingTables from '@/components/PricingTables';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import { useCMSStore } from '@/store/cmsStore';
import { useStylingStore } from '@/store/stylingStore';

const Index = () => {
  // Force a rerender when the store is updated
  const cmsStore = useCMSStore();
  const stylingStore = useStylingStore();
  
  // Re-hydrate the stores on page load to ensure latest data
  useEffect(() => {
    // Force rehydration of stores
    const rehydrateStores = async () => {
      // This will trigger a re-read from localStorage
      const currentHeroContent = { ...cmsStore.heroContent };
      cmsStore.updateHeroContent(currentHeroContent);
      
      const currentGlobalStyles = { ...stylingStore.globalStyles };
      stylingStore.updateGlobalStyles(currentGlobalStyles);
    };
    
    rehydrateStores();
  }, [cmsStore, stylingStore]);
  
  // Optional: Log stores for debugging
  console.log("Styling Store in Index:", stylingStore);
  
  // Apply custom CSS
  useEffect(() => {
    // Create a style element for custom CSS
    const customCssElement = document.createElement('style');
    customCssElement.id = 'wedded-custom-css';
    customCssElement.textContent = stylingStore.globalStyles.customCSS;
    
    // Remove any existing custom CSS element
    const existingCssElement = document.getElementById('wedded-custom-css');
    if (existingCssElement) {
      existingCssElement.remove();
    }
    
    // Add the new custom CSS to the document head
    document.head.appendChild(customCssElement);
    
    // Clean up on component unmount
    return () => {
      const cssElement = document.getElementById('wedded-custom-css');
      if (cssElement) {
        cssElement.remove();
      }
    };
  }, [stylingStore.globalStyles.customCSS]);

  return (
    <div className="min-h-screen" style={{ fontFamily: stylingStore.globalStyles.fontFamily }}>
      <HeroSection />
      <StatsBar />
      <BenefitsSection />
      <NetworkMembersSection />
      <PricingTables />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
