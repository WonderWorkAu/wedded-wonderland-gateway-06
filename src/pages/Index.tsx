
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
  // Get stores
  const cmsStore = useCMSStore();
  const stylingStore = useStylingStore();
  
  // Re-hydrate the stores on page load to ensure latest data
  // Only run this once when the component mounts, not on every render
  useEffect(() => {
    // This will only run once on initial page load
    const rehydrateStores = () => {
      console.log("Rehydrating stores - one time operation");
      
      // Only trigger updates if the data actually changed
      // This avoids unnecessary re-renders and update loops
      const localHeroContent = JSON.parse(localStorage.getItem('wedded-cms-storage') || '{}')?.state?.heroContent;
      const localGlobalStyles = JSON.parse(localStorage.getItem('wedded-styling-storage') || '{}')?.state?.globalStyles;
      
      if (localHeroContent && JSON.stringify(localHeroContent) !== JSON.stringify(cmsStore.heroContent)) {
        cmsStore.updateHeroContent(localHeroContent);
      }
      
      if (localGlobalStyles && JSON.stringify(localGlobalStyles) !== JSON.stringify(stylingStore.globalStyles)) {
        stylingStore.updateGlobalStyles(localGlobalStyles);
      }
    };
    
    rehydrateStores();
    // Empty dependency array ensures this only runs once on mount
  }, []);
  
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
