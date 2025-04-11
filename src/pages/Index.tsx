
import React from 'react';
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
  
  // Optional: Log stores for debugging
  console.log("CMS Store in Index:", cmsStore);
  console.log("Styling Store in Index:", stylingStore);

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
