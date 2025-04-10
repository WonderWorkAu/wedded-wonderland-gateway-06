
import React from 'react';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

const testimonials = [
  {
    name: "Nagam",
    quote: "Wedded Wonderland is worldwide, and introduces everyone. That's when I went on a scroll through the page, and saw that they had everything related to weddings. I like how they take it one step ahead, and have suppliers connected. It's not just an inspo board—Wedded has services, and is a one-stop shop.",
    role: "Wedding Vendor"
  },
  {
    name: "Erin Holland",
    quote: "The Wedded Network connected me with the most incredible vendors for my special day. Their curated directory made finding trusted professionals so much easier.",
    role: "Client"
  },
  {
    name: "Sarah Jane",
    quote: "Thank you so much for all of your help on the wedding front! As an upcoming bride I can honestly say you've been the driving force having our wedding work!",
    role: "Client"
  },
  {
    name: "Lindsey",
    quote: "Being part of the Wedded Network has transformed our business. The quality of leads and the industry connections we've made have been invaluable to our growth.",
    role: "Wedding Planner"
  },
  {
    name: "Alejandra",
    quote: "The Wedded Concierge service matched us with clients who were perfect for our brand. It's been the most effective marketing channel for our venue.",
    role: "Venue Owner"
  },
  {
    name: "Srikant",
    quote: "The B2B community has been a game-changer for our destination wedding planning business. We've formed partnerships across the globe.",
    role: "Destination Planner"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="section-padding bg-wedding-cream/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="wedded-title text-4xl md:text-5xl mb-4">What Our Partners and Couples Say</h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-wedding-gold mb-4" />
                <p className="text-gray-700 italic mb-5">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-wedding-deep-purple">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg font-medium text-wedding-deep-purple">Trusted by luxury brands including Laduree and Moet & Chandon</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
