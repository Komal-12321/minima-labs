import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface CategoriesProps {
  onSelectCategory: (slug: string) => void;
  activeCategory: string;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory, activeCategory }) => {
  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-stone-500 font-mono">
              Clinical Product Architecture
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-stone-950 font-extrabold mt-1 tracking-tight">
              Targeted Actives & Regimens
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 sm:mt-0 max-w-sm">
            Disclosed concentrations, zero-fragrance formulas, and textures engineered for Indian weather.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative rounded-lg overflow-hidden cursor-pointer bg-stone-100 transition-all duration-300 border border-stone-200 ${
                  isSelected ? 'ring-2 ring-stone-950 shadow-md' : 'hover:shadow-lg'
                }`}
              >
                {/* Image Container with Aspect Ratio */}
                <div className="aspect-3/4 w-full overflow-hidden bg-stone-200">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="w-7 h-7 rounded bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400 font-mono font-bold mb-0.5">
                      <span>MINIMA</span>
                      <span>· {cat.itemCount} Formulations</span>
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl text-white font-extrabold leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-stone-300 line-clamp-1 mt-1 font-normal opacity-90 hidden sm:block">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
