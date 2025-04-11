
import { StateCreator } from 'zustand';
import { Testimonial } from '../types/testimonialTypes';

export interface TestimonialsSlice {
  testimonials: Testimonial[];
  updateTestimonials: (testimonials: Testimonial[]) => void;
}

const initialTestimonials: Testimonial[] = [
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

export const createTestimonialsSlice: StateCreator<TestimonialsSlice> = (set) => ({
  testimonials: initialTestimonials,
  updateTestimonials: (testimonials) => set({ testimonials }),
});
