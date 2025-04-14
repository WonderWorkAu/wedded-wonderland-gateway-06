
import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import BenefitsSection from '@/components/BenefitsSection';
import NetworkMembersSection from '@/components/NetworkMembersSection';
import PricingTables from '@/components/PricingTables';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
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
