
import React from 'react';

const StatsBar = () => {
  return (
    <div className="bg-wedding-deep-purple text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg md:text-xl font-medium text-wedding-cream">As Seen In</h3>
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {/* Replace with actual brand logos */}
            <div className="text-xl md:text-2xl font-bold opacity-80">VOGUE</div>
            <div className="text-xl md:text-2xl font-bold opacity-80">HARPER'S</div>
            <div className="text-xl md:text-2xl font-bold opacity-80">BRIDES</div>
            <div className="text-xl md:text-2xl font-bold opacity-80">ELLE</div>
            <div className="text-xl md:text-2xl font-bold opacity-80">BAZAAR</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-8">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-bold">54+</h3>
            <p className="text-sm md:text-base font-medium mt-2">Countries Active In</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-bold">10M+</h3>
            <p className="text-sm md:text-base font-medium mt-2">Monthly Audience</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-bold">3M+</h3>
            <p className="text-sm md:text-base font-medium mt-2">Social Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
