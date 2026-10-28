import React, { useState } from 'react';
import { ArrowRight, Check, Instagram, Youtube, Twitter, Heart, Shield, FlaskConical } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white text-stone-950 flex items-center justify-center text-sm font-mono font-black">
                M
              </div>
              <span className="font-heading text-2xl font-black tracking-wider text-white uppercase block">
                MINIMA LABS
              </span>
            </div>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold block -mt-1">
              Clinical Actives · Mumbai & Bengaluru
            </span>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
              Democratizing high-potency science for Indian skin. Formulated with 100% transparent active concentrations, pure Lonza Switzerland actives, zero added fragrance, and lightweight textures engineered for tropical humidity.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-heading text-xl sm:text-2xl text-white font-extrabold tracking-tight">
              Join The MINIMA Lab Circle
            </h3>
            <p className="text-stone-400 text-xs mt-1 mb-4">
              Receive 20% off your first formulation order, routine diagnostics, and early access to new active drops.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email for clinical drops..."
                className="bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-xs px-4 py-3 rounded-lg flex-1 focus:outline-none focus:border-white font-mono"
              />
              <button
                type="submit"
                className="bg-white text-stone-950 px-6 py-3 rounded-lg text-xs font-bold tracking-wider uppercase hover:bg-stone-200 transition-all cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>

            {isSubscribed && (
              <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1.5 font-mono">
                <Check className="w-3.5 h-3.5" />
                Subscribed! Use code <strong>MINIMA20</strong> for 20% off your checkout.
              </p>
            )}
          </div>

        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs">
          
          {/* Col 1 */}
          <div>
            <h4 className="font-heading text-sm text-white font-bold mb-4 tracking-wider uppercase font-mono">
              Clinical Actives
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><a href="#products" className="hover:text-white transition-colors">10% Niacinamide + Zinc 1%</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Ultra-Light Fluid SPF 50 PA++++</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">2% Salicylic Acid BHA Serum</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">16% Vitamin C + Ferulic Acid</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">5% Ceramide Barrier Cream</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-heading text-sm text-white font-bold mb-4 tracking-wider uppercase font-mono">
              Science & Sourcing
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><a href="#about" className="hover:text-white transition-colors">Lonza (Switzerland) Active Grade</a></li>
              <li><a href="#sourcing" className="hover:text-white transition-colors">BASF (Germany) UV Filters</a></li>
              <li><a href="#distillery" className="hover:text-white transition-colors">Indian Climate & Humidity Testing</a></li>
              <li><a href="#ph" className="hover:text-white transition-colors">pH 5.0 - 5.5 Optimal Efficacy</a></li>
              <li><a href="#fragrance" className="hover:text-white transition-colors">100% Fragrance & Dye Free</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-heading text-sm text-white font-bold mb-4 tracking-wider uppercase font-mono">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><a href="#help" className="hover:text-white transition-colors">Track Order (Bluedart & Delhivery)</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Free Shipping on Orders &gt; ₹499</a></li>
              <li><a href="#cod" className="hover:text-white transition-colors">Cash on Delivery &amp; UPI Available</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">15-Day Lab Performance Guarantee</a></li>
              <li><a href="#skin-quiz" className="hover:text-white transition-colors">AI Routine &amp; Ingredient Builder</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-heading text-sm text-white font-bold mb-4 tracking-wider uppercase font-mono">
              Connect With Us
            </h4>
            <p className="text-stone-400 text-xs mb-4">
              Join 250,000+ Indian skincare enthusiasts building healthy skin barriers.
            </p>
            <div className="flex items-center gap-3 text-stone-400">
              <a href="#" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-white hover:border-stone-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-white hover:border-stone-600 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-white hover:border-stone-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4 text-[11px] text-stone-400 font-mono">
              WhatsApp Support: +91 98200 12345<br />
              Email: care@minimalabs.in
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px] gap-4">
          <div>
            © {new Date().getFullYear()} MINIMA LABS INDIA PVT. LTD. All rights reserved. Toposel UI/UX Assignment.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-stone-400 font-medium">Accepted: UPI · Cards · NetBanking · COD</span>
            <span>·</span>
            <a href="#privacy" className="hover:text-stone-300">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-stone-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
