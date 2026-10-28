import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Check, Sparkles, Droplets } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedShade?: string, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState<string | undefined>(
    product.shades ? product.shades[0] : undefined
  );
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedShade, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Showcase */}
          <div className="bg-[#FAF8F5] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-white shadow-xs relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="font-mono font-bold tracking-[0.2em] text-[10px] text-white uppercase">MINIMA LABS INDIA</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === product.image ? 'border-stone-900 scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveImage(product.hoverImage)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === product.hoverImage ? 'border-stone-900 scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={product.hoverImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#8C5D3C] font-semibold">
                  {product.category} · {product.volumeOrSize}
                </span>
                {product.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-800 bg-stone-100 px-2 py-0.5 rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 stroke-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-900">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-mono font-bold text-stone-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Key Bio-Active Ingredients */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">
                  Core Bio-Actives
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.activeIngredients.map((ing) => (
                    <span 
                      key={ing}
                      className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Shades selector if available */}
              {product.shades && (
                <div className="pt-1">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">
                    Select Shade: <strong className="text-stone-900">{selectedShade}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.shades.map((shade) => (
                      <button
                        key={shade}
                        onClick={() => setSelectedShade(shade)}
                        className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                          selectedShade === shade
                            ? 'bg-stone-900 text-white border-stone-900 font-medium'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {shade}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Skin Type */}
              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-stone-400" />
                <span>Recommended for: <strong className="text-stone-800 font-medium">{product.skinType}</strong></span>
              </div>
            </div>

            {/* Actions: Quantity Stepper & Add to Bag */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-xs"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-xs"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-800 shadow-md'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border border-stone-300 transition-colors ${
                  isWishlisted ? 'bg-rose-50 text-rose-600 border-rose-200' : 'text-stone-600 hover:bg-stone-100'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
