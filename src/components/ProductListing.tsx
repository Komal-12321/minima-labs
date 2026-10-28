import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product, ActiveTab, SortOption } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListingProps {
  products: Product[];
  onAddToCart: (product: Product, selectedShade?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onQuickView: (product: Product) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const ProductListing: React.FC<ProductListingProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  activeCategory,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter products based on tab and activeCategory
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Priority to activeCategory if selected from categories or nav
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    } else if (activeTab === 'bestsellers') {
      list = list.filter((p) => p.isBestseller);
    } else if (activeTab === 'new') {
      list = list.filter((p) => p.isNew);
    } else if (activeTab !== 'all') {
      list = list.filter((p) => p.category === activeTab);
    }

    // Sort products
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, activeTab, sortBy]);

  const tabs: { label: string; value: ActiveTab }[] = [
    { label: 'All Actives', value: 'all' },
    { label: 'Bestsellers', value: 'bestsellers' },
    { label: 'Serums & Exfoliators', value: 'skincare' },
    { label: 'Sun Protection (SPF 50)', value: 'haircare' },
    { label: 'Barrier Creams', value: 'fragrance' },
    { label: 'Lip Tints & Makeup', value: 'makeup' },
    { label: 'New Drops', value: 'new' },
  ];

  return (
    <section id="products" className="py-14 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-stone-500 font-mono">
              Evidence-Based Active Solutions
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-stone-950 font-extrabold mt-1 tracking-tight">
              Clinical Actives & Best-Sellers
            </h2>
          </div>
          
          <div className="text-xs text-stone-500 font-mono">
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> transparent lab formulations
          </div>
        </div>

        {/* Filter Tabs & Sorting Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          
          {/* Functional interactive segmented tabs (approved by frontend-design guidelines) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            {tabs.map((tab) => {
              const isActive = activeCategory === 'all' 
                ? activeTab === tab.value 
                : activeCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    if (tab.value === 'all' || tab.value === 'bestsellers' || tab.value === 'new') {
                      onSelectCategory('all');
                      setActiveTab(tab.value);
                    } else {
                      onSelectCategory(tab.value);
                      setActiveTab(tab.value);
                    }
                  }}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-stone-400 cursor-pointer"
            >
              <option value="featured">Featured & Curated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.has(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-stone-600 font-medium">No formulas matched your criteria.</p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setActiveTab('all');
              }}
              className="mt-3 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
