
import React, { useEffect, useState, useRef } from 'react';
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
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  // Get stores
  const cmsStore = useCMSStore();
  const stylingStore = useStylingStore();
  const { toast } = useToast();
  
  // Add a version state to force component updates when CMS data changes
  const [version, setVersion] = useState(0);
  const initialLoadDone = useRef(false);
  
  // Re-hydrate the stores on page load to ensure latest data
  // Only run this once when the component mounts, not on every render
  useEffect(() => {
    // This will only run once on initial page load
    const rehydrateStores = async () => {
      console.log("Rehydrating stores - one time operation");
      
      try {
        // Clear any browser cache for the localStorage
        const timestamp = Date.now();
        
        // Force a fresh read from localStorage with cache busting
        const localCmsStorage = JSON.parse(
          localStorage.getItem(`wedded-cms-storage?t=${timestamp}`) || 
          localStorage.getItem('wedded-cms-storage') || 
          '{}'
        );
        const localStylingStorage = JSON.parse(
          localStorage.getItem(`wedded-styling-storage?t=${timestamp}`) || 
          localStorage.getItem('wedded-styling-storage') || 
          '{}'
        );
        
        const localHeroContent = localCmsStorage?.state?.heroContent;
        const localGlobalStyles = localStylingStorage?.state?.globalStyles;
        
        let updatesApplied = false;
        
        // Only trigger updates if we actually have data and it's different
        if (localHeroContent && JSON.stringify(localHeroContent) !== JSON.stringify(cmsStore.heroContent)) {
          console.log("Updating hero content from localStorage:", localHeroContent);
          cmsStore.updateHeroContent(localHeroContent);
          updatesApplied = true;
        }
        
        if (localGlobalStyles && JSON.stringify(localGlobalStyles) !== JSON.stringify(stylingStore.globalStyles)) {
          console.log("Updating global styles from localStorage:", localGlobalStyles);
          stylingStore.updateGlobalStyles(localGlobalStyles);
          updatesApplied = true;
        }
        
        // Force component update after rehydration if changes were made
        if (updatesApplied) {
          setVersion(v => v + 1);
          
          toast({
            title: "Content Updated",
            description: "The latest content has been loaded from your CMS",
          });
        }
      } catch (error) {
        console.error("Error rehydrating stores:", error);
        toast({
          title: "Error Loading Content",
          description: "There was an issue loading the latest content",
          variant: "destructive"
        });
      }
      
      initialLoadDone.current = true;
    };
    
    if (!initialLoadDone.current) {
      rehydrateStores();
    }
    
    // Add event listener for localStorage changes from other tabs
    const storageHandler = (event: StorageEvent) => {
      if (event.key && (event.key.includes('wedded-cms') || event.key.includes('wedded-styling'))) {
        console.log("Local storage updated in another tab, reloading content");
        window.location.reload();
      }
    };
    
    window.addEventListener('storage', storageHandler);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
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

  // Use a key based on version to force full re-render when data changes
  return (
    <div 
      key={`page-container-${version}`}
      className="min-h-screen" 
      style={{ fontFamily: stylingStore.globalStyles.fontFamily }}
      data-cms-version={version}
    >
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
