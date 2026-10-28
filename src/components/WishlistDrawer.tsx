import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="font-heading text-lg font-bold text-stone-900">
              Saved Formulations ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close wishlist drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-3">
              <Heart className="w-12 h-12 mx-auto text-stone-300 stroke-1" />
              <p className="font-heading text-lg font-bold text-stone-800">No formulations saved yet</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart icon on any clinical formulation to save it for your skincare routine.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-stone-950 text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Browse Actives
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div 
                key={product.id}
                className="flex gap-4 pb-4 border-b border-stone-100 items-center justify-between"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md bg-stone-100 shrink-0"
                />
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="font-heading text-sm font-bold text-stone-900 leading-snug line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 capitalize font-mono">
                    {product.category} · ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product.id);
                    }}
                    className="p-2 bg-stone-950 text-white rounded-md hover:bg-stone-800 text-xs transition-colors cursor-pointer"
                    title="Move to bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-3 bg-stone-950 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
