import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Droplets, CheckCircle2, FlaskConical } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

interface HeroProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative bg-[#FAFAFA] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-22">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text / Value Proposition Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Subtle editorial kicker */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-stone-600">
              <span className="text-stone-900 font-bold">{slide.badge}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Transparent Actives</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Indian Weather Tested</span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.08]">
              {slide.title}
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Clinical / Formulation Stat Callout */}
            <div className="border-l-2 border-stone-900 pl-4 py-1.5 text-xs sm:text-sm text-stone-700 font-medium bg-stone-50 rounded-r-md max-w-lg mx-auto lg:mx-0">
              "{slide.highlight}"
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-stone-950 text-white rounded-md text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-white text-stone-800 border border-stone-300 rounded-md text-xs uppercase tracking-widest font-semibold hover:border-stone-900 hover:text-stone-950 transition-all flex items-center justify-center cursor-pointer"
              >
                Explore Formulations
              </button>
            </div>

            {/* Slide Switcher Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentSlideIndex === idx ? 'w-8 bg-stone-900' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] text-stone-500 font-mono ml-2">
                0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>

            {/* Trust Pillars */}
            <div className="pt-6 sm:pt-8 border-t border-stone-200 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2">
                <FlaskConical className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Clinical Actives</h4>
                  <p className="text-[11px] text-stone-500 hidden sm:block">Tested on Indian Skin (Fitzpatrick III-VI)</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">100% Fragrance-Free</h4>
                  <p className="text-[11px] text-stone-500 hidden sm:block">Zero Dyes · Non-Comedogenic</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Direct From Lab</h4>
                  <p className="text-[11px] text-stone-500 hidden sm:block">Lonza & BASF Global Ingredients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Backing minimal accent frame */}
              <div className="absolute -inset-2.5 bg-stone-200 rounded-xl transform rotate-1 transition-transform"></div>

              {/* Main Image Container */}
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-stone-100 aspect-4/5 border border-stone-200">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Minimalist Indian Brand Stamp Badge */}
                <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 shadow-xl flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-white text-stone-950 flex items-center justify-center text-[10px] font-black font-mono">
                    M
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase block leading-tight">MINIMA LABS INDIA</span>
                    <span className="text-[8px] text-stone-400 uppercase tracking-widest block font-mono">Efficacy · Transparency · Estd. 2026</span>
                  </div>
                </div>

                {/* Floating Product Highlight Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded border border-stone-200 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500">
                        Top Active Formula
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-stone-900">
                        {slide.tag}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-stone-100 text-stone-900 px-2.5 py-1 rounded border border-stone-200">
                      Use: {slide.discountCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
