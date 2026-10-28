import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedShade?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedShade, setSelectedShade] = useState<string | undefined>(
    product.shades ? product.shades[0] : undefined
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedShade);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden hover:border-stone-400 hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges & Action Buttons */}
      <div className="relative aspect-square w-full bg-[#F3EFEA] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        
        {/* Primary & Hover Image */}
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-500 transform group-hover:scale-105"
        />

        {/* Quiet Editorial Tag (Top Left) */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-900 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Minimalist Clinical Brand Stamp Stamped on Product Image */}
        <div className="absolute inset-x-2.5 bottom-2.5 bg-stone-950/90 backdrop-blur-md py-1 px-2.5 rounded border border-white/20 flex items-center justify-between shadow-md group-hover:opacity-0 transition-opacity duration-200">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-mono font-bold tracking-[0.2em] text-[10px] text-white uppercase">MINIMA LABS</span>
          </div>
          <span className="text-[8px] font-mono text-stone-300 font-medium tracking-wider">CLINICAL ACTIVE · pH BALANCED</span>
        </div>

        {/* Quick View Hover Trigger */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-md text-stone-900 rounded-lg text-xs font-medium hover:bg-stone-900 hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Volume */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 uppercase tracking-wider">
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.volumeOrSize}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif-luxury text-base sm:text-lg font-medium text-stone-900 mt-1 hover:text-[#8C5D3C] cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Actives */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 font-light">
            {product.tagline}
          </p>

          {/* Shade selector if available */}
          {product.shades && product.shades.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1">
              <span className="text-[10px] text-stone-400 mr-1">Shades:</span>
              <div className="flex items-center gap-1.5">
                {product.shades.map((shade, i) => (
                  <button
                    key={shade}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedShade(shade);
                    }}
                    title={shade}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedShade === shade
                        ? 'ring-2 ring-stone-900 ring-offset-1 scale-110'
                        : 'border-stone-300 hover:scale-105'
                    } ${
                      i === 0 ? 'bg-[#E8C5AF]' :
                      i === 1 ? 'bg-[#D6A689]' :
                      i === 2 ? 'bg-[#A8795A]' : 'bg-[#6F4933]'
                    }`}
                    aria-label={`Select shade ${shade}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Ratings Row */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="text-xs font-semibold text-stone-800">{product.rating}</span>
            <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & CTA Row */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-semibold text-stone-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              isAdded
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
