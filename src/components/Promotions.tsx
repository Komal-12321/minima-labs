import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Tag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';

interface PromotionsProps {
  onAddBundleToCart: (product: Product) => void;
  featuredBundleProduct: Product;
}

export const Promotions: React.FC<PromotionsProps> = ({
  onAddBundleToCart,
  featuredBundleProduct,
}) => {
  const [copied, setCopied] = useState(false);
  
  // Real live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('MINIMA20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="offers" className="py-16 sm:py-24 bg-stone-950 text-white overflow-hidden relative border-t border-b border-stone-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Offer Details & Countdown */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              <Zap className="w-4 h-4" />
              <span>Clinical Formulation Bundle</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Save ₹498 (30% Off)</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white tracking-tight">
              The Glass Skin Barrier Trio
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Democratizing high-potency science for Indian skin. Complete 3-step routine featuring pure Swiss Lonza Niacinamide, next-gen invisible hybrid SPF 50 sunscreen, and bio-identical Ceramide barrier recovery cream.
            </p>

            {/* Live Countdown Timer Block */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 sm:p-5 max-w-md">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 mb-3">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Special D2C Drop Closes In</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-stone-950 rounded-lg py-2.5 px-2 border border-stone-800">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-stone-400 mt-1 font-mono">Hours</div>
                </div>
                <div className="bg-stone-950 rounded-lg py-2.5 px-2 border border-stone-800">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-stone-400 mt-1 font-mono">Minutes</div>
                </div>
                <div className="bg-stone-950 rounded-lg py-2.5 px-2 border border-stone-800">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-stone-400 mt-1 font-mono">Seconds</div>
                </div>
              </div>
            </div>

            {/* Coupon Code One-Click Copy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="flex items-center justify-between gap-3 bg-stone-900 border border-stone-700 rounded-lg px-4 py-3">
                <span className="text-xs uppercase tracking-wider text-stone-400">Code:</span>
                <span className="font-mono text-base font-bold text-emerald-400 tracking-wider">
                  MINIMA20
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1.5 hover:bg-stone-800 rounded transition-colors text-stone-300 hover:text-white cursor-pointer"
                  title="Copy coupon code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAddBundleToCart(featuredBundleProduct)}
                className="px-6 py-3.5 bg-white text-stone-950 font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-stone-200 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Add Trio Bundle · ₹1,199</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {copied && (
              <p className="text-xs text-emerald-400 font-medium animate-fadeIn">
                ✓ Coupon "MINIMA20" copied! Extra 20% discount applied automatically at checkout.
              </p>
            )}

          </div>

          {/* Right Column: Visual Offer Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-stone-900 border border-stone-800 rounded-xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold font-mono">
                  3 Full-Size Lab Actives
                </span>
                <div className="text-right">
                  <span className="text-xs text-stone-500 line-through mr-2">₹1,697</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">₹1,199</span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-950 border border-stone-800">
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80"
                    alt="10% Niacinamide"
                    className="w-12 h-12 object-cover rounded bg-stone-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">MINIMA 10% Niacinamide + Zinc 1%</h4>
                    <p className="text-[11px] text-stone-400">30ml · Swiss Grade Lonza Niacinamide · Worth ₹599</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-950 border border-stone-800">
                  <img
                    src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=150&q=80"
                    alt="SPF 50 Sunscreen"
                    className="w-12 h-12 object-cover rounded bg-stone-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">MINIMA Ultra-Light Fluid SPF 50 PA++++</h4>
                    <p className="text-[11px] text-stone-400">50g · Zero White Cast · German UV Filters · Worth ₹499</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-950 border border-stone-800">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80"
                    alt="Ceramide Cream"
                    className="w-12 h-12 object-cover rounded bg-stone-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">MINIMA 5% Ceramide Barrier Repair Cream</h4>
                    <p className="text-[11px] text-stone-400">50g · Bio-Identical Ceramides EOP & NP · Worth ₹599</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> Free Indian Shipping & COD Available
                </span>
                <span className="text-white font-mono font-bold">Save ₹498 (30%)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
