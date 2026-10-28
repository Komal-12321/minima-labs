import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Columns, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  GitCommit, 
  Layout, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { WireframeDevice } from '../types';

export const WireframeView: React.FC<{ onBackToStore: () => void }> = ({ onBackToStore }) => {
  const [device, setDevice] = useState<WireframeDevice>('both');
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);

  const annotations = [
    {
      id: 1,
      name: 'Utility Bar & Brand Navigation',
      desktop: 'Global announcement bar + brand wordmark, category text links, search bar, and cart badge with 44px touch targets.',
      mobile: 'Sticky slim header with hamburger drawer, centered logo, search pill, and quick access bag icon.',
      hierarchy: 'Tier 2: Global Orientation & Utility',
    },
    {
      id: 2,
      name: 'Hero Showcase & Primary CTA',
      desktop: 'Asymmetric 7:5 split layout with editorial serif headline, clinical proof callout, primary and secondary CTA buttons, and high-impact product imagery.',
      mobile: 'Single-column vertical stack with clear top headline, key benefit statement, thumb-accessible full-width CTA, and cropped visual.',
      hierarchy: 'Tier 1: Primary Value Proposition & Emotional Hook',
    },
    {
      id: 3,
      name: 'Category Navigation Pathways',
      desktop: '5-column visual card row with subtle hover expansion and item count metadata.',
      mobile: 'Horizontal swipeable carousel / 2-column compact grid for rapid thumb-scrolling without cognitive friction.',
      hierarchy: 'Tier 3: Structured Browsing Pathways',
    },
    {
      id: 4,
      name: 'Curated Catalog & Product Card Design',
      desktop: '4-column grid with hover alternate texture image, quick view trigger, wishlist heart, ratings, and instant Add to Bag CTA.',
      mobile: '2-column responsive grid with clean spacing, tap-to-inspect, visible pricing, and full-width touch button.',
      hierarchy: 'Tier 4: Core E-Commerce Conversion Zone',
    },
    {
      id: 5,
      name: 'Promotions & Flash Bundle Section',
      desktop: 'High-contrast dark container with live countdown timer, 1-click copy coupon code, and bundled product value breakdown.',
      mobile: 'Stacked offer card with countdown clock and copyable coupon bar anchored above the fold.',
      hierarchy: 'Tier 5: Urgency & Average Order Value (AOV) Boost',
    },
    {
      id: 6,
      name: 'Footer & Trust Pillars',
      desktop: '4-column structured directory with email newsletter subscription, trust certifications, payment methods, and legal links.',
      mobile: 'Accordion or stacked footer with simple newsletter field and collapsed navigation.',
      hierarchy: 'Tier 6: Reassurance, Retention & Legal Compliance',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0EDE8] py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Wireframe Control Bar */}
      <div className="max-w-7xl mx-auto mb-8 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-stone-600 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-900"></span>
              <span>Toposel Assignment · Section 7: Wireframe Requirements</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-semibold">
              Low-Fidelity Wireframes: Desktop & Mobile Architecture
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              Strictly engineered low-fidelity wireframe schematics illustrating layout integrity, visual hierarchy, responsive layout adaptation, and user flow.
            </p>
          </div>

          {/* Viewport Toggles & Action */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center p-1 bg-stone-100 rounded-lg border border-stone-200">
              <button
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  device === 'desktop' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (1440px)</span>
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  device === 'mobile' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (375px)</span>
              </button>
              <button
                onClick={() => setDevice('both')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  device === 'both' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Side-by-Side</span>
              </button>
            </div>

            <button
              onClick={onBackToStore}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Back to Live Storefront</span>
            </button>
          </div>
        </div>

        {/* Quick UX Spec Badges */}
        <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase font-mono">Desktop Grid</span>
            <span className="font-semibold text-stone-800">12 Columns · 24px Gutters</span>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase font-mono">Mobile Grid</span>
            <span className="font-semibold text-stone-800">4 Columns · 16px Fluid Margins</span>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase font-mono">Touch Ergonomics</span>
            <span className="font-semibold text-stone-800">Min 44px Interactive Targets</span>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase font-mono">Visual Hierarchy</span>
            <span className="font-semibold text-stone-800">6 Discrete Priority Tiers</span>
          </div>
        </div>
      </div>

      {/* Wireframe Showcase Arena */}
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Wireframe Viewports Container */}
        <div className={`grid gap-8 items-start ${
          device === 'both' ? 'grid-cols-1 xl:grid-cols-12' : 'grid-cols-1'
        }`}>

          {/* ===================== DESKTOP WIREFRAME ===================== */}
          {(device === 'desktop' || device === 'both') && (
            <div className={device === 'both' ? 'xl:col-span-8' : 'w-full'}>
              <div className="bg-white rounded-2xl shadow-md border-2 border-stone-400 overflow-hidden">
                
                {/* Desktop Browser Frame Chrome */}
                <div className="bg-stone-200 border-b border-stone-300 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-stone-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-stone-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-stone-400 inline-block"></span>
                    <span className="text-xs font-mono text-stone-600 ml-2">Desktop Viewport: 1440px × 900px Baseline</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                    Low-Fidelity Schematic
                  </span>
                </div>

                {/* Wireframe Canvas: Desktop */}
                <div className="p-6 bg-[#FAFAFA] font-sans text-stone-700 space-y-6">
                  
                  {/* [SECTION 1] HEADER & NAV */}
                  <div className="border-2 border-dashed border-stone-400 rounded-lg p-3 bg-stone-100/60 relative group">
                    <div className="absolute top-2 right-2 text-[10px] font-mono bg-stone-800 text-white px-2 py-0.5 rounded">
                      Section 1: Navigation
                    </div>
                    {/* Announcement wire */}
                    <div className="h-4 bg-stone-300 rounded mb-3 w-3/4 mx-auto" />
                    {/* Main Nav wire */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <div className="w-24 h-7 bg-stone-400 rounded flex items-center justify-center font-bold text-xs text-white">
                        [ LOGO ]
                      </div>
                      <div className="hidden md:flex items-center gap-4">
                        <div className="w-16 h-4 bg-stone-300 rounded" />
                        <div className="w-16 h-4 bg-stone-300 rounded" />
                        <div className="w-16 h-4 bg-stone-300 rounded" />
                        <div className="w-16 h-4 bg-stone-300 rounded" />
                        <div className="w-16 h-4 bg-stone-300 rounded" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-36 h-7 bg-stone-200 border border-stone-400 rounded-full flex items-center px-3 text-[10px] text-stone-500">
                          [ Search bar... ]
                        </div>
                        <div className="w-7 h-7 bg-stone-300 rounded-full flex items-center justify-center text-[10px]">♡</div>
                        <div className="w-7 h-7 bg-stone-300 rounded-full flex items-center justify-center text-[10px]">👤</div>
                        <div className="w-16 h-7 bg-stone-800 text-white rounded-full flex items-center justify-center text-[10px] font-semibold">
                          [ Bag 0 ]
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* [SECTION 2] HERO BANNER */}
                  <div className="border-2 border-dashed border-stone-400 rounded-lg p-6 bg-stone-100 relative">
                    <div className="absolute top-2 right-2 text-[10px] font-mono bg-stone-800 text-white px-2 py-0.5 rounded">
                      Section 2: Hero & Value Prop
                    </div>
                    <div className="grid grid-cols-12 gap-6 items-center">
                      <div className="col-span-7 space-y-3">
                        <div className="w-32 h-3.5 bg-stone-400 rounded" />
                        <div className="w-4/5 h-8 bg-stone-800 rounded" />
                        <div className="w-3/5 h-8 bg-stone-800 rounded" />
                        <div className="w-full h-3 bg-stone-300 rounded" />
                        <div className="w-5/6 h-3 bg-stone-300 rounded" />
                        <div className="flex items-center gap-3 pt-3">
                          <div className="w-36 h-9 bg-stone-900 rounded-full flex items-center justify-center text-xs text-white font-medium">
                            [ Shop Now CTA ]
                          </div>
                          <div className="w-36 h-9 bg-white border border-stone-400 rounded-full flex items-center justify-center text-xs text-stone-700">
                            [ Explore Science ]
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pt-3 text-[10px] text-stone-500">
                          <span>✓ 100% Vegan</span>
                          <span>✓ Dermatologist Tested</span>
                          <span>✓ Carbon Neutral</span>
                        </div>
                      </div>
                      <div className="col-span-5">
                        {/* Wireframe Image Box with Cross X */}
                        <div className="aspect-4/3 w-full bg-stone-200 border-2 border-stone-400 rounded-lg relative flex items-center justify-center overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full text-stone-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          <span className="relative z-10 bg-white/80 px-3 py-1 rounded text-xs font-mono text-stone-600">
                            [ Featured Hero Product Image ]
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* [SECTION 3] CATEGORIES SECTION */}
                  <div className="border-2 border-dashed border-stone-400 rounded-lg p-5 bg-stone-100/60 relative">
                    <div className="absolute top-2 right-2 text-[10px] font-mono bg-stone-800 text-white px-2 py-0.5 rounded">
                      Section 4: Categories
                    </div>
                    <div className="w-48 h-6 bg-stone-700 rounded mb-4" />
                    <div className="grid grid-cols-5 gap-3">
                      {['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Body'].map((cat, i) => (
                        <div key={i} className="aspect-3/4 bg-stone-200 border border-stone-400 rounded-lg relative flex flex-col justify-end p-2 overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full text-stone-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.8" />
                          </svg>
                          <div className="relative z-10 bg-white/90 p-1.5 rounded text-center">
                            <div className="text-[11px] font-bold text-stone-800">{cat}</div>
                            <div className="text-[9px] text-stone-500">View items</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* [SECTION 4] PRODUCT LISTING */}
                  <div className="border-2 border-dashed border-stone-400 rounded-lg p-5 bg-stone-100 relative">
                    <div className="absolute top-2 right-2 text-[10px] font-mono bg-stone-800 text-white px-2 py-0.5 rounded">
                      Section 3: Featured Products
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-56 h-6 bg-stone-700 rounded" />
                      <div className="flex gap-2">
                        <div className="w-20 h-6 bg-stone-800 rounded text-white text-[10px] flex items-center justify-center font-mono">[ All ]</div>
                        <div className="w-20 h-6 bg-stone-300 rounded text-[10px] flex items-center justify-center font-mono">[ Best ]</div>
                        <div className="w-20 h-6 bg-stone-300 rounded text-[10px] flex items-center justify-center font-mono">[ Skin ]</div>
                      </div>
                    </div>
                    {/* 4-col product card grid */}
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white border border-stone-400 rounded-lg p-3 space-y-2">
                          <div className="aspect-square bg-stone-200 border border-stone-300 rounded relative flex items-center justify-center overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full text-stone-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.8" />
                              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.8" />
                            </svg>
                            <span className="relative z-10 text-[9px] font-mono text-stone-500">[ Product Photo {n} ]</span>
                          </div>
                          <div className="w-16 h-2.5 bg-stone-300 rounded" />
                          <div className="w-full h-4 bg-stone-800 rounded" />
                          <div className="flex items-center justify-between pt-1">
                            <div className="w-12 h-3.5 bg-stone-700 rounded" />
                            <div className="w-16 h-6 bg-stone-900 rounded text-white text-[9px] flex items-center justify-center">
                              [ + Add ]
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* [SECTION 5] OFFERS & COUNTDOWN */}
                  <div className="border-2 border-dashed border-stone-400 rounded-lg p-5 bg-stone-800 text-white relative">
                    <div className="absolute top-2 right-2 text-[10px] font-mono bg-white text-stone-900 px-2 py-0.5 rounded font-bold">
                      Section 5: Promotional Offers
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-8 space-y-2">
                        <div className="w-32 h-3 bg-amber-400 rounded" />
                        <div className="w-3/4 h-6 bg-stone-100 rounded" />
                        <div className="flex gap-2 pt-2">
                          <div className="w-16 h-10 bg-stone-900 rounded border border-stone-700 flex flex-col items-center justify-center font-mono text-xs text-amber-300">
                            <span>14</span>
                            <span className="text-[8px] text-stone-400">HRS</span>
                          </div>
                          <div className="w-16 h-10 bg-stone-900 rounded border border-stone-700 flex flex-col items-center justify-center font-mono text-xs text-amber-300">
                            <span>36</span>
                            <span className="text-[8px] text-stone-400">MIN</span>
                          </div>
                          <div className="w-16 h-10 bg-stone-900 rounded border border-stone-700 flex flex-col items-center justify-center font-mono text-xs text-amber-300">
                            <span>45</span>
                            <span className="text-[8px] text-stone-400">SEC</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 flex flex-col gap-2">
                        <div className="w-full h-9 bg-white/10 border border-white/30 rounded flex items-center justify-center text-xs font-mono text-emerald-400">
                          CODE: MINIMA20 [Copy]
                        </div>
                        <div className="w-full h-9 bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center">
                          [ Claim Trio Bundle ]
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* [SECTION 6] FOOTER */}
                  <div className="border-2 border-dashed border-stone-400 rounded-lg p-5 bg-stone-200 relative">
                    <div className="absolute top-2 right-2 text-[10px] font-mono bg-stone-800 text-white px-2 py-0.5 rounded">
                      Section 6: Global Footer
                    </div>
                    <div className="grid grid-cols-4 gap-4 pb-4">
                      <div className="space-y-2">
                        <div className="w-20 h-5 bg-stone-600 rounded" />
                        <div className="w-full h-2.5 bg-stone-400 rounded" />
                        <div className="w-3/4 h-2.5 bg-stone-400 rounded" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-16 h-3.5 bg-stone-600 rounded mb-2" />
                        <div className="w-20 h-2 bg-stone-400 rounded" />
                        <div className="w-16 h-2 bg-stone-400 rounded" />
                        <div className="w-24 h-2 bg-stone-400 rounded" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-16 h-3.5 bg-stone-600 rounded mb-2" />
                        <div className="w-20 h-2 bg-stone-400 rounded" />
                        <div className="w-24 h-2 bg-stone-400 rounded" />
                        <div className="w-16 h-2 bg-stone-400 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="w-24 h-3.5 bg-stone-600 rounded" />
                        <div className="w-full h-7 bg-white rounded border border-stone-400 flex items-center px-2 text-[9px] text-stone-500">
                          [ Email input... ]
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-stone-300 flex justify-between text-[10px] text-stone-500">
                      <span>© 2026 MINIMA LABS INDIA</span>
                      <span>Privacy · Terms · Transparent Disclosure</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ===================== MOBILE WIREFRAME ===================== */}
          {(device === 'mobile' || device === 'both') && (
            <div className={device === 'both' ? 'xl:col-span-4' : 'max-w-md mx-auto w-full'}>
              <div className="bg-white rounded-3xl shadow-xl border-4 border-stone-800 overflow-hidden">
                
                {/* Mobile Device Notch / Chrome */}
                <div className="bg-stone-900 text-white px-4 py-2 flex items-center justify-between text-[10px] font-mono">
                  <span>9:41</span>
                  <div className="w-16 h-3.5 bg-stone-800 rounded-full" />
                  <span>5G 100%</span>
                </div>

                <div className="bg-stone-200 border-b border-stone-300 px-3 py-1 text-center text-[10px] font-mono text-stone-600">
                  Mobile Viewport: 375px × 812px
                </div>

                {/* Wireframe Canvas: Mobile */}
                <div className="p-3 bg-[#FAFAFA] font-sans text-stone-700 space-y-3 max-h-[820px] overflow-y-auto">
                  
                  {/* Announcement */}
                  <div className="h-3.5 bg-stone-300 rounded w-full" />

                  {/* Mobile Header */}
                  <div className="border border-dashed border-stone-400 rounded p-2 bg-stone-100 flex items-center justify-between">
                    <div className="w-6 h-5 bg-stone-400 rounded flex flex-col justify-around p-0.5">
                      <div className="h-0.5 bg-white" />
                      <div className="h-0.5 bg-white" />
                      <div className="h-0.5 bg-white" />
                    </div>
                    <div className="w-20 h-5 bg-stone-900 rounded text-white text-[9px] font-mono font-bold flex items-center justify-center">
                      MINIMA
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-stone-300 rounded-full" />
                      <div className="w-5 h-5 bg-stone-950 text-white rounded-full text-[9px] flex items-center justify-center">
                        0
                      </div>
                    </div>
                  </div>

                  {/* Search bar */}
                  <div className="w-full h-7 bg-stone-200 border border-stone-300 rounded-lg flex items-center px-2 text-[10px] text-stone-500 font-mono">
                    🔍 Search actives, SPF 50...
                  </div>

                  {/* Mobile Hero */}
                  <div className="border border-dashed border-stone-400 rounded p-3 bg-stone-100 space-y-2">
                    <div className="w-24 h-2 bg-stone-400 rounded" />
                    <div className="w-full h-5 bg-stone-800 rounded" />
                    <div className="w-3/4 h-5 bg-stone-800 rounded" />
                    
                    {/* Hero image placeholder with X */}
                    <div className="aspect-4/3 w-full bg-stone-200 border border-stone-300 rounded relative flex items-center justify-center overflow-hidden">
                      <svg className="absolute inset-0 w-full h-full text-stone-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <span className="relative z-10 text-[9px] font-mono text-stone-600 bg-white/90 px-2 py-0.5 rounded">
                        [ Mobile Hero Image ]
                      </span>
                    </div>

                    <div className="w-full h-9 bg-stone-900 text-white rounded-lg flex items-center justify-center text-xs font-semibold">
                      Shop Formulation CTA
                    </div>
                  </div>

                  {/* Mobile Categories (Horizontal Scroll Preview) */}
                  <div className="border border-dashed border-stone-400 rounded p-2.5 bg-stone-100">
                    <div className="text-[10px] font-bold text-stone-700 mb-2">Shop by Category</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-square bg-stone-200 rounded border border-stone-300 p-1 flex flex-col justify-end">
                        <span className="text-[9px] font-bold">Actives</span>
                      </div>
                      <div className="aspect-square bg-stone-200 rounded border border-stone-300 p-1 flex flex-col justify-end">
                        <span className="text-[9px] font-bold">Sunscreen</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Product Cards (2-col grid) */}
                  <div className="border border-dashed border-stone-400 rounded p-2.5 bg-stone-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-stone-700">Clinical Actives</span>
                      <span className="text-[9px] text-stone-500">View All</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="bg-white border border-stone-300 rounded p-1.5 space-y-1">
                          <div className="aspect-square bg-stone-200 rounded relative flex items-center justify-center overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full text-stone-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                            </svg>
                          </div>
                          <div className="w-full h-3 bg-stone-700 rounded" />
                          <div className="w-12 h-2 bg-stone-400 rounded" />
                          <div className="w-full h-6 bg-stone-900 text-white rounded text-[8px] flex items-center justify-center">
                            + Add to Bag
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Offers */}
                  <div className="border border-dashed border-stone-400 rounded p-2.5 bg-stone-900 text-white space-y-1.5">
                    <div className="text-[9px] text-emerald-400 font-bold">30% OFF Barrier Trio</div>
                    <div className="text-xs font-mono font-bold">14h : 36m : 45s</div>
                    <div className="w-full h-7 bg-white text-stone-950 font-bold rounded text-[10px] flex items-center justify-center">
                      Claim Trio (₹1,199)
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="border border-dashed border-stone-400 rounded p-2 bg-stone-200 text-center space-y-1">
                    <div className="text-[10px] font-mono font-bold">MINIMA LABS INDIA</div>
                    <div className="w-full h-6 bg-white border border-stone-300 rounded flex items-center justify-center text-[9px] text-stone-400">
                      Email address...
                    </div>
                    <div className="text-[8px] text-stone-500">© 2026 MINIMA LABS INDIA · All Rights Reserved</div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

        {/* Content Hierarchy & Layout Breakdown Annotations */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-300">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5 text-stone-900" />
            <h2 className="font-serif-luxury text-2xl text-stone-900 font-medium">
              Layout, Content Hierarchy & UX Flow Rationale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annotations.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-stone-400 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-stone-200 text-stone-800 rounded">
                    0{item.id}
                  </span>
                  <span className="text-[10px] font-medium text-[#8C5D3C]">
                    {item.hierarchy}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-stone-900 mb-2">
                  {item.name}
                </h3>
                <div className="text-xs text-stone-600 space-y-2">
                  <p><strong>Desktop Adaptation:</strong> {item.desktop}</p>
                  <p><strong>Mobile Adaptation:</strong> {item.mobile}</p>
                </div>
              </div>
            ))}
          </div>

          {/* User Flow Map */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <h3 className="text-xs uppercase tracking-wider font-bold text-stone-900 mb-4 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#8C5D3C]" />
              End-to-End User Conversion Flow Diagram
            </h3>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium text-stone-700">
              <span className="bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-lg">1. Homepage Landing</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-lg">2. Hero / Category Discovery</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-lg">3. Product Card Hover / Tap</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-lg">4. Quick View Inspection</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-lg">5. Slideover Bag Review</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="bg-stone-900 text-white px-3 py-1.5 rounded-lg font-bold">6. Checkout & Confetti</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
