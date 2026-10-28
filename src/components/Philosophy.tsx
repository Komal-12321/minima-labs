import React from 'react';
import { ShieldCheck, Droplet, FlaskConical, Globe, Percent, Sparkles } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const pillars = [
    {
      icon: Percent,
      title: '100% Disclosed Active %',
      description: 'We publish exact active concentrations, carrier formulas, and source suppliers like Lonza (Switzerland) and BASF (Germany). No secret blends.',
    },
    {
      icon: Globe,
      title: 'Engineered for Indian Climate',
      description: 'Ultra-light, quick-absorbing textures formulated specifically for high heat, monsoon humidity, and Fitzpatrick skin types III to VI.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Fragrance & Dyes',
      description: 'Formulated at optimal skin pH (5.0 - 5.5). Completely free from synthetic fragrances, essential oils, drying alcohols, and parabens.',
    },
    {
      icon: FlaskConical,
      title: 'Accessible D2C Science',
      description: 'Democratizing world-class dermatological formulations direct from our labs in Mumbai & Bengaluru to your doorstep with zero luxury markups.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-stone-500 font-mono">
            The MINIMA LABS Standard
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-stone-950 font-extrabold mt-2 tracking-tight">
            Science First. Transparency Always. Built for Indian Skin.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
            MINIMA LABS replaces ambiguous beauty buzzwords with clinically proven active molecules. 
            We disclose every ingredient, its concentration, and its exact pH range so you know what touches your barrier.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-md bg-stone-100 text-stone-900 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-stone-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
