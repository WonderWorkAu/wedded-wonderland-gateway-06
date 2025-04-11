
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { useCMSStore } from '@/store/cmsStore';
import { useStylingStore } from '@/store/stylingStore';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { heroContent } = useCMSStore();
  const { globalStyles, heroStyles } = useStylingStore();
  
  console.log("Hero content in component:", heroContent);
  console.log("Hero styles in component:", heroStyles);
  
  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/pricing');
    }
  };
  
  // Helper function to get the font size based on mobile or desktop
  const getFontSize = (sizes: { mobile: string; desktop: string }) => {
    return isMobile ? `text-${sizes.mobile}` : `text-${sizes.desktop}`;
  };
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden" style={{ fontFamily: globalStyles.fontFamily }}>
      {/* Background layers */}
      <div className="absolute inset-0 bg-wedding-white">
        {/* Background video if available */}
        {heroContent.backgroundVideo && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute min-w-full min-h-full object-cover w-auto h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: heroStyles.backgroundVideoOpacity }}
            >
              <source src={heroContent.backgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        
        {/* Background image as fallback or overlay */}
        {heroContent.backgroundImage && (
          <div className="absolute inset-0 bg-cover bg-center bg-fixed"
               style={{ 
                 backgroundImage: `url('${heroContent.backgroundImage}')`,
                 opacity: heroStyles.backgroundImageOpacity 
               }}>
          </div>
        )}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-fade-in mb-6 inline-block py-1.5 px-3 md:px-4 rounded-none bg-wedding-light-gray/50 backdrop-blur-sm border border-wedding-medium-gray/20">
            <div className="flex items-center">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-wedding-black mr-1 md:mr-2" />
              <span className="text-xs md:text-sm font-medium text-wedding-black">For Elite Wedding Professionals Only</span>
            </div>
          </div>
          
          <h1 className={`${getFontSize(heroStyles.headingFontSize)} font-light text-wedding-black mb-6 md:mb-8 leading-tight tracking-tight`}>
            {heroContent.mainHeading?.split(' ').map((word, index, array) => {
              // Apply styling to "World-Class" and "Visibility"
              if (word === "World-Class." || word === "Visibility") {
                return <span key={index} className="bw-gradient font-semibold">{word} </span>;
              }
              // Add line break after the first sentence on desktop
              else if (word === "Too." && !isMobile) {
                return <span key={index}>{word}<br /></span>;
              }
              return <span key={index}>{word} </span>;
            })}
          </h1>
          
          <p className={`${getFontSize(heroStyles.subheadingFontSize)} text-wedding-dark-gray mb-8 max-w-3xl`}>
            {heroContent.subHeading}
          </p>
          
          <div className="mb-10 md:mb-12 py-4 md:py-6 px-6 md:px-8 bg-wedding-black rounded-none">
            <p className={`${getFontSize(heroStyles.quoteFontSize)} italic text-wedding-white font-light`}>
              "{heroContent.quote}"
            </p>
          </div>
          
          <Button 
            className="black-button text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-none flex items-center gap-3 group hover:scale-105 transition-all duration-300 uppercase tracking-widest"
            onClick={handleScrollToPricing}
            style={{ 
              backgroundColor: globalStyles.primaryColor,
              color: globalStyles.secondaryColor
            }}
          >
            <span className="font-semibold">{heroContent.ctaText}</span>
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </Button>
          
          <p className="mt-6 text-xs md:text-sm text-wedding-dark-gray italic">
            {heroContent.footerText}
          </p>
        </div>
      </div>
      
      {/* Subtle decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-wedding-light-gray/10 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
