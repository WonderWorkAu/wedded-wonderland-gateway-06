
import React from 'react';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  LinkedinIcon,
  Mail,
  Phone
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wedding-charcoal text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-2xl mb-4 text-wedding-cream">Wedded Network</h3>
            <p className="text-gray-300 mb-6">
              Our global B2B community connects wedding professionals who are shaping the future of the luxury, cultural, and destination wedding industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4 text-wedding-cream">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Directory Listings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Network Membership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Wedded Week</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Masterclasses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Business Coaching</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4 text-wedding-cream">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Our Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4 text-wedding-cream">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-wedding-gold" />
                <a href="mailto:info@weddednetwork.com" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  info@weddednetwork.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-wedding-gold" />
                <a href="tel:+123456789" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Wedded Network. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 text-sm hover:text-wedding-gold transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-wedding-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
