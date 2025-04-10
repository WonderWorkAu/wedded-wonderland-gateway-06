
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const AsSeenIn = () => {
  const brands = [
    { name: "VOGUE", class: "text-2xl md:text-3xl" },
    { name: "HARPER'S BAZAAR", class: "text-2xl md:text-3xl" },
    { name: "ELLE", class: "text-2xl md:text-3xl" },
    { name: "BRIDES", class: "text-2xl md:text-3xl" },
    { name: "MARTHA STEWART", class: "text-2xl md:text-3xl" },
    { name: "THE KNOT", class: "text-2xl md:text-3xl" },
    { name: "WEDDING CHICKS", class: "text-2xl md:text-3xl" },
    { name: "STYLE ME PRETTY", class: "text-2xl md:text-3xl" }
  ];

  return (
    <div className="py-12 bg-wedding-white">
      <div className="container mx-auto">
        <h3 className="text-center text-xl md:text-2xl font-medium text-wedding-black mb-8">
          As Seen In
        </h3>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: false
          }}
          className="w-full"
        >
          <CarouselContent className="flex items-center">
            {brands.map((brand, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 flex items-center justify-center">
                <div className={`font-serif italic font-bold text-wedding-black transition-opacity hover:opacity-70 ${brand.class}`}>
                  {brand.name}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Auto-scrolling implementation with CSS */}
        <div className="mt-4 overflow-hidden relative">
          <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={index} 
                className={`inline-block mx-8 font-serif italic font-bold text-wedding-black opacity-80 ${brand.class}`}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsSeenIn;
