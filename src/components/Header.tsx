import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  FileText,
  Rocket,
  Download,
  Check,
  Loader2
} from 'lucide-react';
import { Product, AppMode } from '../types';
import { downloadProjectZip } from '../utils/projectDownloader';

interface HeaderProps {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  allProducts: Product[];
  onQuickView: (product: Product) => void;
  onOpenSubmissionModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  setAppMode,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenProfile,
  onSelectCategory,
  activeCategory,
  allProducts,
  onQuickView,
  onOpenSubmissionModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const searchRef = useRef<HTMLDivElement>(null);

  const handleDownloadZip = async () => {
    try {
      setDownloadStatus('loading');
      await downloadProjectZip();
      setDownloadStatus('done');
      setTimeout(() => setDownloadStatus('idle'), 4000);
    } catch (err) {
      console.error('Failed to create browser zip:', err);
      // Fallback: direct window location
      window.location.href = '/minima-labs.zip';
      setDownloadStatus('idle');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  const categories = [
    { label: 'All Actives', value: 'all' },
    { label: 'Serums & Actives', value: 'skincare' },
    { label: 'Sun Protection (SPF 50)', value: 'haircare' },
    { label: 'Moisturizers', value: 'body' },
    { label: 'Cleansers', value: 'fragrance' },
    { label: 'Makeup & Tints', value: 'makeup' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
  
            <button
              onClick={() => setAppMode('wireframe')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                appMode === 'wireframe'
                  ? 'bg-white text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Low-Fi Wireframes (Desktop & Mobile)</span>
            </button>

            <button
              onClick={() => onOpenSubmissionModal()}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>UX Case Study & Submission</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={downloadStatus === 'loading'}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                downloadStatus === 'done'
                  ? 'bg-emerald-400 text-slate-950'
                  : downloadStatus === 'loading'
                  ? 'bg-emerald-600 text-white cursor-wait opacity-80'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
              title="Click to generate and download the complete project ZIP right inside your browser"
            >
              {downloadStatus === 'loading' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Packaging ZIP...</span>
                </>
              ) : downloadStatus === 'done' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Code (.ZIP)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Indian D2C Announcement Banner */}
      <div className="bg-[#0F172A] text-slate-200 text-[11px] md:text-xs py-1.5 px-4 text-center border-b border-slate-800 tracking-wide font-medium">
        <span>Free Express Delivery on orders over ₹499</span>
        <span className="mx-2 text-slate-500" aria-hidden="true">·</span>
        <span className="text-cyan-400 font-semibold">Extra 5% OFF on Prepaid UPI</span>
        <span className="mx-2 text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
        <span className="hidden sm:inline">Use code: <strong className="text-white">MINIMA20</strong> for 20% Off</span>
      </div>

      {/* Main Header Container */}
      <div className={`bg-white/95 backdrop-blur-md border-b transition-colors duration-200 ${
        isScrolled ? 'border-slate-200 shadow-xs' : 'border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo - Minimalist & Nykaa Modern Style */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <a href="#" className="inline-block group">
                <span className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tighter text-slate-950 uppercase flex items-center gap-1.5">
                  <span>MINIMA</span>
                  <span className="text-xs px-1.5 py-0.5 bg-slate-950 text-white rounded font-mono font-bold tracking-normal">LABS</span>
                </span>
                <span className="block text-[8.5px] uppercase tracking-[0.25em] text-slate-500 font-sans -mt-0.5 font-semibold group-hover:text-slate-900 transition-colors">
                  Active Science & Beauty · India
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-widest font-medium text-stone-700">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    onSelectCategory(cat.value);
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`py-2 transition-colors relative hover:text-stone-950 ${
                    activeCategory === cat.value ? 'text-stone-950 font-semibold' : 'text-stone-600'
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.value && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900" />
                  )}
                </button>
              ))}
              <a 
                href="#offers" 
                className="py-2 text-[#9E5A38] hover:text-[#7A3F22] font-semibold transition-colors flex items-center gap-1"
              >
                Offers & Deals
              </a>
            </nav>

            {/* Right Icons & Interactive Search */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Search Bar - Desktop */}
              <div ref={searchRef} className="relative hidden md:block w-48 lg:w-60">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Search serums, tint..."
                    className="w-full bg-stone-100 text-xs text-stone-800 placeholder-stone-400 pl-8 pr-3 py-2 rounded-full border border-transparent focus:border-stone-400 focus:bg-white focus:outline-none transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Live Search Suggestions Dropdown */}
                {isSearchOpen && searchQuery.trim() !== '' && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-stone-200 py-2 z-50 overflow-hidden">
                    <div className="px-3 py-1 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                      Search Results ({searchResults.length})
                    </div>
                    {searchResults.length > 0 ? (
                      <div className="divide-y divide-stone-100">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              onQuickView(product);
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-stone-50 cursor-pointer transition-colors"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded bg-stone-100"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-stone-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-stone-500 capitalize">
                                {product.category} · ₹{product.price}
                              </p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-3 py-4 text-center text-xs text-stone-500">
                        No formulas found for "{searchQuery}".
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className="p-2 text-stone-700 hover:text-stone-900 relative rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* User Account / Profile */}
              <button
                type="button"
                onClick={onOpenProfile}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Account Profile"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="flex items-center gap-2 bg-stone-900 text-white px-3.5 py-2 rounded-full text-xs font-medium hover:bg-stone-800 transition-all shadow-sm"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-white/20 text-white text-[11px] px-1.5 py-0.2 rounded-full font-bold">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search beauty, skincare, haircare..."
                className="w-full bg-stone-100 text-xs text-stone-800 placeholder-stone-400 pl-8 pr-3 py-2 rounded-lg border border-transparent focus:border-stone-400 focus:bg-white focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <span className="font-sans text-xl font-extrabold tracking-tight text-slate-950 uppercase flex items-center gap-1">
                  <span>MINIMA</span>
                  <span className="text-[10px] px-1 py-0.5 bg-slate-950 text-white rounded font-mono">LABS</span>
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-stone-500 hover:text-stone-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Browse Catalog
                </p>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      onSelectCategory(cat.value);
                      setMobileMenuOpen(false);
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat.value 
                        ? 'bg-stone-100 text-stone-950 font-semibold' 
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
                <a
                  href="#offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#8C5D3C] hover:bg-stone-50"
                >
                  Special Offers & Bundles
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 space-y-3">
                <button
                  onClick={() => {
                    setAppMode('wireframe');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-stone-100 text-xs font-medium text-stone-800"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-stone-600" />
                    Inspect Low-Fi Wireframes
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => {
                    onOpenSubmissionModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-stone-900 text-xs font-medium text-white"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-300" />
                    UX Case Study & Submission
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 text-xs text-stone-500">
              <p>Toposel UI/UX Assignment</p>
              <p className="text-[11px] text-stone-400 mt-0.5">Designed with Clean UI & Strong Content Hierarchy</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
