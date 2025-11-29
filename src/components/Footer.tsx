import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary to-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">
            Get Exclusive Beauty Deals
          </h3>
          <p className="text-primary-foreground/90 mb-6">
            Subscribe to our newsletter for UAE-exclusive offers and beauty tips
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white border-0"
            />
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Shop */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Makeup</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Skincare</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Haircare</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Fragrance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Brands A-Z</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Policies</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Authenticity Guarantee</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Halal Certification</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>+971 (0) 4 XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span>hello@elisshbeauty.ae</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Payment */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground p-3 rounded-full transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground p-3 rounded-full transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground p-3 rounded-full transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground p-3 rounded-full transition-all">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                🔒 Secure Payment
              </span>
              <span className="flex items-center gap-1">
                ✓ 100% Authentic
              </span>
              <span className="flex items-center gap-1">
                🚚 Free Shipping 100+ AED
              </span>
              <span className="flex items-center gap-1">
                💳 Cash on Delivery
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>© 2024 Elissh Beauty. All rights reserved. | Verified by UAE Ministry of Economy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
