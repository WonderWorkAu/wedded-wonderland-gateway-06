
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
    <div className="section-padding bg-wedding-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-none bg-wedding-light-gray text-wedding-black text-sm font-medium mb-4 border border-wedding-medium-gray/30">
            Success Transformations
          </div>
          <h2 className="wedded-title text-4xl md:text-5xl mb-6">
            Not Just Testimonials.<br />
            <span className="bw-gradient">Success Stories.</span>
          </h2>
          <div className="w-24 h-1 bg-wedding-black mx-auto mb-8"></div>
          <p className="text-lg text-wedding-dark-gray max-w-3xl mx-auto">
            Join the elite community of professionals experiencing extraordinary growth, connections, and recognition with the Wedded Network
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card overflow-hidden group hover:shadow-lg transition-all duration-300 bg-wedding-white rounded-none">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-bw"></div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-10 w-10 text-wedding-black" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-wedding-black" />
                    ))}
                  </div>
                </div>
                <p className="text-wedding-dark-gray italic mb-6 text-lg leading-relaxed line-clamp-6">"{testimonial.quote}"</p>
                
                <div className="mt-6 mb-5 bg-wedding-off-white p-4 rounded-none border border-wedding-light-gray transform group-hover:scale-105 transition-transform duration-300">
                  <p className="text-sm font-medium text-wedding-black flex items-center">
                    <span className="text-wedding-black mr-2">→</span> 
                    {testimonial.transform}
                  </p>
                </div>
                
                <div className="mt-4">
                  <p className="font-semibold text-wedding-black text-lg">{testimonial.name}</p>
                  <p className="text-sm text-wedding-dark-gray">{testimonial.role}</p>
                </div>
                <div className="mt-3 inline-block py-1 px-3 bg-wedding-light-gray rounded-none text-xs font-medium text-wedding-black border border-wedding-medium-gray/20">
                  {testimonial.highlight}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-wedding-black mb-4">Trusted by luxury brands worldwide, including:</p>
          <div className="flex flex-wrap justify-center items-center gap-10 mt-4">
            <div className="text-2xl font-serif italic text-wedding-black flex flex-col items-center">
              <span className="text-3xl mb-1">Laduree</span>
              <div className="w-12 h-0.5 bg-wedding-black"></div>
            </div>
            <div className="text-2xl font-serif italic text-wedding-black flex flex-col items-center">
              <span className="text-3xl mb-1">Moet & Chandon</span>
              <div className="w-12 h-0.5 bg-wedding-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
