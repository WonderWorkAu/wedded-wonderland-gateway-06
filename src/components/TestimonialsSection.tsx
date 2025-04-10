
import React from 'react';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Nagam",
    quote: "Wedded Wonderland is worldwide, and introduces everyone. That's when I went on a scroll through the page, and saw that they had everything related to weddings. I like how they take it one step ahead, and have suppliers connected. It's not just an inspo board—Wedded has services, and is a one-stop shop.",
    role: "Wedding Vendor",
    highlight: "Global connections"
  },
  {
    name: "Erin Holland",
    quote: "The Wedded Network connected me with the most incredible vendors for my special day. Their curated directory made finding trusted professionals so much easier.",
    role: "Client",
    highlight: "High-quality matches"
  },
  {
    name: "Sarah Jane",
    quote: "Thank you so much for all of your help on the wedding front! As an upcoming bride I can honestly say you've been the driving force having our wedding work!",
    role: "Client",
    highlight: "Expert guidance"
  },
  {
    name: "Lindsey",
    quote: "Being part of the Wedded Network has transformed our business. The quality of leads and the industry connections we've made have been invaluable to our growth.",
    role: "Wedding Planner",
    highlight: "Business transformation"
  },
  {
    name: "Alejandra",
    quote: "The Wedded Concierge service matched us with clients who were perfect for our brand. It's been the most effective marketing channel for our venue.",
    role: "Venue Owner",
    highlight: "Perfect client matches"
  },
  {
    name: "Srikant",
    quote: "The B2B community has been a game-changer for our destination wedding planning business. We've formed partnerships across the globe.",
    role: "Destination Planner",
    highlight: "Global partnerships"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="section-padding bg-gradient-to-b from-wedding-cream/20 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-wedding-gold/10 text-wedding-deep-purple text-sm font-medium mb-4">
            Success Stories
          </div>
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">What Our Partners and Couples Say</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Join the community of professionals and couples experiencing exceptional results with Wedded
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-wedding-gold via-wedding-purple to-wedding-deep-purple"></div>
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-wedding-gold mb-4" />
                <p className="text-gray-700 italic mb-5 line-clamp-5">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-wedding-deep-purple">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <div className="mt-3 inline-block py-1 px-2 bg-wedding-light-purple/10 rounded-full text-xs font-medium text-wedding-deep-purple">
                  {testimonial.highlight}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg font-medium text-wedding-deep-purple">Trusted by luxury brands including:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
            <span className="text-xl font-serif italic text-wedding-deep-purple/90">Laduree</span>
            <span className="text-xl font-serif italic text-wedding-deep-purple/90">Moet & Chandon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
