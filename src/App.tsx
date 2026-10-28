/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, AppMode } from './types';
import { PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductListing } from './components/ProductListing';
import { Promotions } from './components/Promotions';
import { Philosophy } from './components/Philosophy';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ProfileModal } from './components/ProfileModal';
import { WireframeView } from './components/WireframeView';
import { SubmissionModal } from './components/SubmissionModal';

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('storefront');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veda_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1 },
      ];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 1 }];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('veda_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set([PRODUCTS[1].id]);
    } catch {
      return new Set([PRODUCTS[1].id]);
    }
  });

  // Drawers and modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('veda_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('veda_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Cart operations
  const handleAddToCart = (product: Product, selectedShade?: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedShade === selectedShade
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedShade }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
  const cartTotalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#E8D8C8]">
      
      {/* Global Header */}
      <Header
        appMode={appMode}
        setAppMode={setAppMode}
        cartCount={cartTotalItemsCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectCategory={setActiveCategory}
        activeCategory={activeCategory}
        allProducts={PRODUCTS}
        onQuickView={(p) => setQuickViewProduct(p)}
        onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
      />

      {/* Main Viewport: Either Low-Fidelity Wireframes OR Full Storefront */}
      {appMode === 'wireframe' ? (
        <WireframeView onBackToStore={() => setAppMode('storefront')} />
      ) : (
        <main>
          {/* Section 2: Hero Section */}
          <Hero
            onShopClick={() => {
              const el = document.getElementById('products');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreClick={() => {
              const el = document.getElementById('philosophy');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Section 4: Categories Section */}
          <Categories
            onSelectCategory={(slug) => setActiveCategory(slug)}
            activeCategory={activeCategory}
          />

          {/* Section 3: Product Listing Section */}
          <ProductListing
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {/* Section 5: Offers / Promotions Section */}
          <Promotions
            onAddBundleToCart={(prod) => {
              handleAddToCart(prod, undefined, 1);
              setIsCartOpen(true);
            }}
            featuredBundleProduct={PRODUCTS[0]}
          />

          {/* Clean Formulation Standards */}
          <div id="philosophy">
            <Philosophy />
          </div>

          {/* Social Proof & Testimonials */}
          <ReviewsSection />
        </main>
      )}

      {/* Section 6: Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onViewWireframes={() => setAppMode('wireframe')}
      />

    </div>
  );
}
