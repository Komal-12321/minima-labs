import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Rocket, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Globe,
  Share2
} from 'lucide-react';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewWireframes: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  onViewWireframes,
}) => {
  const [activeTab, setActiveTab] = useState<'approach' | 'deployment' | 'submission'>('approach');
  const [figmaLink, setFigmaLink] = useState('https://www.figma.com/design/sample-eclat-beauty');
  const [portfolioLink, setPortfolioLink] = useState('https://my-design-portfolio.com');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const designApproachText = `
UI/UX DESIGN ASSIGNMENT SUBMISSION: E-COMMERCE HOMEPAGE (INDIAN CLINICAL BEAUTY BRAND)
Brand: MINIMA LABS INDIA (Mumbai & Bengaluru)
Designer: Toposel UI/UX Design Candidate
Inspiration: Minimalist, Nykaa Cosmetics, The Derma Co (Modern Indian Science-Backed D2C)

1. DESIGN APPROACH & PHILOSOPHY
Our objective was to architect a high-converting, trust-oriented e-commerce homepage for a modern Indian science-backed clinical beauty brand (MINIMA LABS INDIA). Unlike traditional ayurvedic or luxury brands, modern Indian consumers (Gen Z & Millennials) prioritize raw ingredient transparency, exact active percentages (e.g. 10% Niacinamide, 2% Salicylic Acid), zero synthetic fragrance, and formulations engineered specifically for India's tropical heat and humidity (Fitzpatrick skin types III to VI).

2. INDIAN E-COMMERCE & LOCALIZED D2C UX PATTERNS
• Indian Currency Formatting: All pricing, discounts, and order values expressed in Indian Rupees (₹) with realistic D2C price points (₹399 to ₹699).
• High-Trust Payment Options: Integrated 1-click UPI (Google Pay, PhonePe, Paytm QR), Cash on Delivery (COD), and NetBanking options to counter high COD preferences in Tier 2/3 Indian cities.
• Free Delivery Threshold: Gamified free shipping progress bar anchored at ₹499 (industry standard for Minimalist & Nykaa) across 28,000+ Indian PIN codes.
• Regulatory & Lab Trust Signals: Disclosed sourcing partners (Lonza Switzerland, BASF Germany), Indian dermatologist testing sign-offs, and 100% fragrance-free certifications.

3. CONTENT HIERARCHY & LAYOUT ARCHITECTURE
• Tier 1 (Hero Showcase): Immediate visual hook featuring the MINIMA 10% Niacinamide + Zinc 1% serum, clinical efficacy stats, and dual CTAs ("Shop Formulations" vs "Explore Formulations").
• Tier 2 (Global Utility & Nav): Sticky minimal header with clear category navigation (Actives & Serums, Sun Protection, Barrier Moisturizers, Cleansers, Makeup), live search dropdown, wishlist, and slideover cart drawer with 44px+ touch targets.
• Tier 3 (Category Gateways): Visual cards with hover micro-interactions, active counts, and direct category filtering.
• Tier 4 (Product Catalog & Cards): 4-column responsive grid featuring secondary texture shot on hover, rating breakdown, shade selector, and quick "Add to Bag" button with tactile feedback.
• Tier 5 (Festive Offers & Countdown): Real-time countdown timer for the Glass Skin Barrier Trio bundle, 1-click copy coupon code ("MINIMA20"), and bundle savings calculator (Save ₹498 / 30% Off).
• Tier 6 (Trust & Footer): 4 Clinical science formulation pillars, verified Indian patron testimonials across Bengaluru, Mumbai, and Delhi, newsletter onboarding with instant 15% discount code, and standard legal/concierge links.

4. RESPONSIVE DESIGN & MOBILE ERGONOMICS
• Desktop (1440px): 12-column modular grid with generous whitespace, 24px gutters, and progressive hover reveals.
• Mobile (375px): Single-column hierarchy with sticky utilities, thumb-reachable 48px touch targets, horizontal category pathways, and 2-column product layout to eliminate thumb strain.

5. WIREFRAME DELIVERABLES
Low-fidelity wireframe schematics were created for both desktop and mobile viewports, mapping the spatial structure, typography scale, and end-to-end customer conversion funnel.
`.trim();

  const handleCopy = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C5D3C] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Assignment Deliverable Package</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-stone-900 mt-0.5">
              Toposel Submission & Deployment Dossier
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab('approach')}
            className={`flex-1 py-3 px-4 text-center border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'approach'
                ? 'border-stone-900 text-stone-900 font-semibold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Design Approach Explanation</span>
          </button>

          <button
            onClick={() => setActiveTab('submission')}
            className={`flex-1 py-3 px-4 text-center border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'submission'
                ? 'border-stone-900 text-stone-900 font-semibold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Submission Checklist & Links</span>
          </button>

          <button
            onClick={() => setActiveTab('deployment')}
            className={`flex-1 py-3 px-4 text-center border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'deployment'
                ? 'border-stone-900 text-stone-900 font-semibold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Deployment Guide & Steps</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: DESIGN APPROACH */}
          {activeTab === 'approach' && (
            <div className="space-y-6 text-stone-700 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs uppercase font-mono text-stone-500">
                  Ready-to-Submit Design Approach Text
                </span>
                <button
                  onClick={() => handleCopy(designApproachText, 'approach')}
                  className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSection === 'approach' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'approach' ? 'Copied to Clipboard!' : 'Copy Explanation'}</span>
                </button>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200 font-mono text-xs text-stone-800 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                {designApproachText}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 text-xs mb-1">Typography Pairing</h4>
                  <p className="text-xs text-stone-600">
                    <strong>Cormorant Garamond</strong> for editorial luxury headings paired with <strong>Plus Jakarta Sans</strong> for clean, readable utility UI.
                  </p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 text-xs mb-1">Color Harmony</h4>
                  <p className="text-xs text-stone-600">
                    Oat white (#FAF8F5), Obsidian black (#1C1917), and Warm Terracotta (#8C5D3C) invoking natural botanicals and French atelier heritage.
                  </p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 text-xs mb-1">Zero-Pill Restraint</h4>
                  <p className="text-xs text-stone-600">
                    Clean unboxed typography with elegant dot separators (·) avoiding dated bubble pills and generic AI slop tropes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBMISSION CHECKLIST */}
          {activeTab === 'submission' && (
            <div className="space-y-6 text-xs sm:text-sm text-stone-700">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <h4 className="font-semibold text-xs uppercase tracking-wider mb-1">
                  Assignment Evaluation Criteria Check
                </h4>
                <p className="text-xs leading-relaxed">
                  Verify each required element from the Toposel assignment specification before sending your final submission.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="text-stone-900 block text-xs">1. Homepage Layout with All 6 Mandatory Sections</strong>
                    <span className="text-xs text-stone-500">
                      Header with search & bag, Hero banner with CTA, Product listing with cards & ratings, Categories section, Offers section with countdown, and Footer with social/help links.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="text-stone-900 block text-xs">2. Low-Fidelity Wireframes (Desktop & Mobile)</strong>
                    <span className="text-xs text-stone-500">
                      Included interactive wireframe schematic viewer with 1440px desktop & 375px mobile viewports, content hierarchy annotations, and user flow map.
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onViewWireframes();
                      }}
                      className="mt-2 text-xs text-[#8C5D3C] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Switch to Wireframe Mode Now</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <strong className="text-stone-900 block text-xs">3. Submission Links (Figma & Portfolio)</strong>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] font-medium text-stone-600 block mb-1">
                          • Figma Design Link (Ensure "Anyone with the link can view" is enabled):
                        </label>
                        <input
                          type="url"
                          value={figmaLink}
                          onChange={(e) => setFigmaLink(e.target.value)}
                          placeholder="https://www.figma.com/design/..."
                          className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-stone-600 block mb-1">
                          • Portfolio Link (Mandatory):
                        </label>
                        <input
                          type="url"
                          value={portfolioLink}
                          onChange={(e) => setPortfolioLink(e.target.value)}
                          placeholder="https://yourname-portfolio.com"
                          className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* One-click dossier copy */}
              <button
                onClick={() => {
                  const dossier = `
TOPOSEL UI/UX DESIGN ASSIGNMENT SUBMISSION
-------------------------------------------
1. Live Application Prototype:
   ${window.location.origin}

2. Figma Design File Link (View Access):
   ${figmaLink}

3. Candidate Portfolio Link:
   ${portfolioLink}

4. Low-Fidelity Wireframes:
   Integrated directly into the prototype (Switch to "Low-Fi Wireframes" mode in top header)
   - Desktop Viewport: 1440px
   - Mobile Viewport: 375px
   - Content Hierarchy: 6 discrete tiers
   - User flow diagram included

5. Brief Design Approach:
${designApproachText}
                  `.trim();
                  handleCopy(dossier, 'dossier');
                }}
                className="w-full py-3 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedSection === 'dossier' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSection === 'dossier' ? 'Complete Submission Dossier Copied!' : 'Copy Full Submission Package to Clipboard'}</span>
              </button>
            </div>
          )}

          {/* TAB 3: DEPLOYMENT GUIDE */}
          {activeTab === 'deployment' && (
            <div className="space-y-6 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Terminal className="w-4 h-4 text-[#8C5D3C]" />
                <span>Step-by-Step Deployment Guide</span>
              </div>
              
              {/* Direct Download Action Card */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-emerald-900 text-xs">Download Full Source Code (.ZIP)</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Download all files (React, Vite, Tailwind, assets, mock data) in a single compressed zip file.
                  </p>
                </div>
                <a
                  href="/minima-labs-project.zip"
                  download="minima-labs-project.zip"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                >
                  <span>Download ZIP (3.9 MB)</span>
                </a>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                This project is built with React 19, TypeScript, Vite, and Tailwind CSS. It builds a fast, static production bundle ready to deploy on any hosting provider in minutes.
              </p>

              {/* Step 1 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-stone-900 text-xs">Step 1: Test & Build Locally</h4>
                  <span className="text-[10px] font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-700">Terminal</span>
                </div>
                <div className="bg-stone-900 text-stone-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  npm run build
                </div>
                <p className="text-[11px] text-stone-500">
                  This bundles all assets into the optimized <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">dist/</code> directory.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-stone-900 text-xs">Step 2: Deploy to Vercel (Recommended 1-Click)</h4>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Vercel</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-xs text-stone-600">
                  <li>Push your repository to GitHub or GitLab.</li>
                  <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-stone-900 font-semibold underline">vercel.com</a> and click "Add New Project".</li>
                  <li>Import your repository. Framework Preset will automatically detect <strong>Vite</strong>.</li>
                  <li>Build Command: <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">npm run build</code></li>
                  <li>Output Directory: <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">dist</code></li>
                  <li>Click <strong>Deploy</strong>. In ~30 seconds you will receive a live URL (e.g. <code>eclat-beauty.vercel.app</code>) to submit!</li>
                </ol>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-stone-900 text-xs">Step 3: Deploy to Netlify (Alternative)</h4>
                  <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded">Netlify</span>
                </div>
                <p className="text-xs text-stone-600">
                  Run <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">npx netlify deploy --prod --dir=dist</code> or link your Git repository on <a href="https://netlify.com" target="_blank" rel="noreferrer" className="text-stone-900 font-semibold underline">netlify.com</a>. Set publish directory to <code>dist</code>.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-stone-900 text-xs">Step 4: AI Studio Cloud Run Deployment</h4>
                  <span className="text-[10px] font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-700">Instant AI Studio Share</span>
                </div>
                <p className="text-xs text-stone-600">
                  Your project is already hosted and live at the shared App URL:
                </p>
                <div className="p-2.5 bg-stone-100 rounded-lg text-xs font-mono text-stone-900 select-all break-all">
                  {window.location.origin}
                </div>
                <p className="text-[11px] text-stone-500">
                  You can provide this URL directly to Toposel evaluators for instant interactive testing!
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Toposel UI/UX Assignment · Beauty E-commerce Homepage
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
