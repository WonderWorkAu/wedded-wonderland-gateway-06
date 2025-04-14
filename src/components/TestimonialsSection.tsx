
import React from 'react';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Nagam",
    quote: "Wedded Wonderland isn't just a platform—it's a powerhouse. They connect the dots across the world, not just between vendors and couples, but between cultures, creativity, and commerce. Since joining, we've expanded into three new countries.",
    role: "Luxury Wedding Planner",
    highlight: "Global expansion",
    transform: "3 new market countries opened"
  },
  {
    name: "Erin Holland",
    quote: "The Wedded Network connected me with the most incredible vendors for my special day. Their curated directory made finding trusted professionals so much easier. But what surprised me most was how they understood exactly what I was looking for before I could even articulate it.",
    role: "Media Personality & Bride",
    highlight: "Perfect match connections",
    transform: "Saved 40+ hours of research"
  },
  {
    name: "Sarah Jane",
    quote: "Thank you so much for all of your help on the wedding front! As an upcoming bride I can honestly say you've been the driving force having our wedding work! The vendors you connected us with understood our vision perfectly.",
    role: "Executive Bride",
    highlight: "Expert guidance",
    transform: "Vision brought to life"
  },
  {
    name: "Lindsey",
    quote: "Being part of the Wedded Network has transformed our business. The quality of leads and the industry connections we've made have been invaluable to our growth. We've doubled our bookings in the premium segment and expanded our team since joining.",
    role: "Wedding Planner",
    highlight: "Business transformation",
    transform: "100% growth in premium bookings"
  },
  {
    name: "Alejandra",
    quote: "The Wedded Concierge service matched us with clients who were perfect for our brand. It's been the most effective marketing channel for our venue. We've had a 70% conversion rate from referrals, compared to just 20% from other platforms.",
    role: "Luxury Venue Owner",
    highlight: "High conversion referrals",
    transform: "70% booking conversion rate"
  },
  {
    name: "Srikant",
    quote: "The B2B community has been a game-changer for our destination wedding planning business. We've formed partnerships across the globe that have opened doors we never thought possible. Our revenue from international clients has tripled.",
    role: "Destination Wedding Specialist",
    highlight: "Revenue-driving partnerships",
    transform: "3x international client revenue"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="section-padding bg-gradient-to-b from-black to-[#111111]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-wedding-gold/20 text-wedding-gold text-sm font-medium mb-4 border border-wedding-gold/30">
            Success Transformations
          </div>
          <h2 className="wedded-title text-4xl md:text-5xl mb-6">
            Not Just Testimonials.<br />
            <span className="gold-gradient">Success Stories.</span>
          </h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Join the elite community of professionals experiencing extraordinary growth, connections, and recognition with the Wedded Network
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-wedding-gold via-gray-500 to-wedding-gold"></div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-10 w-10 text-wedding-gold" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-wedding-gold fill-wedding-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic mb-6 text-lg leading-relaxed line-clamp-6">"{testimonial.quote}"</p>
                
                <div className="mt-6 mb-5 bg-black/50 p-4 rounded-lg border border-white/10 transform group-hover:scale-105 transition-transform duration-300">
                  <p className="text-sm font-medium text-wedding-cream flex items-center">
                    <span className="text-wedding-gold mr-2">→</span> 
                    {testimonial.transform}
                  </p>
                </div>
                
                <div className="mt-4">
                  <p className="font-semibold text-wedding-cream text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
                <div className="mt-3 inline-block py-1 px-3 bg-wedding-light-purple/20 rounded-full text-xs font-medium text-wedding-cream border border-white/10">
                  {testimonial.highlight}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-wedding-cream mb-4">Trusted by luxury brands worldwide, including:</p>
          <div className="flex flex-wrap justify-center items-center gap-10 mt-4">
            <div className="text-2xl font-serif italic text-wedding-gold flex flex-col items-center">
              <span className="text-3xl mb-1">Laduree</span>
              <div className="w-12 h-0.5 bg-wedding-gold"></div>
            </div>
            <div className="text-2xl font-serif italic text-wedding-gold flex flex-col items-center">
              <span className="text-3xl mb-1">Moet & Chandon</span>
              <div className="w-12 h-0.5 bg-wedding-gold"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
