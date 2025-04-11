
import React, { useEffect, useState, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import BenefitsSection from '@/components/BenefitsSection';
import NetworkMembersSection from '@/components/NetworkMembersSection';
import PricingTables from '@/components/PricingTables';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import { useCMSStore, initializeCMSFromSupabase } from '@/store/cmsStore';
import { useStylingStore } from '@/store/stylingStore';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  // Get stores
  const cmsStore = useCMSStore();
  const stylingStore = useStylingStore();
  const { toast } = useToast();
  
  // Add a version state to force component updates when CMS data changes
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const initialLoadDone = useRef(false);
  
  // Initialize content from Supabase when component mounts
  useEffect(() => {
    const initializeCMS = async () => {
      if (!initialLoadDone.current) {
        console.log("Initializing CMS data - one time operation");
        setLoading(true);
        
        try {
          // Initialize from Supabase
          const success = await initializeCMSFromSupabase();
          
          if (success) {
            console.log("CMS data initialized from Supabase");
            setVersion(v => v + 1);
            
            toast({
              title: "Content Updated",
              description: "The latest content has been loaded from the CMS",
            });
          }
        } catch (error) {
          console.error("Error initializing CMS data:", error);
          toast({
            title: "Error Loading Content",
            description: "There was an issue loading the latest content",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
          initialLoadDone.current = true;
        }
      }
    };
    
    initializeCMS();
  }, [toast]);
  
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
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-wedding-light-gray border-t-wedding-black rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-wedding-black">Loading content...</p>
          </div>
        </div>
      ) : (
        <>
          <HeroSection />
          <StatsBar />
          <BenefitsSection />
          <NetworkMembersSection />
          <PricingTables />
          <TestimonialsSection />
          <CtaSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
