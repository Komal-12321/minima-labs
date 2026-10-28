import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, CreditCard, Banknote, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 50;
  const estimatedGst = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping + estimatedGst);
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'MINIMA20' || code === 'VEDA30') {
      setDiscountPercent(20);
      setPromoSuccess('20% Lab Special discount applied!');
    } else if (code === 'WELCOME15') {
      setDiscountPercent(15);
      setPromoSuccess('15% First Order discount applied!');
    } else {
      setPromoError('Invalid code. Try "MINIMA20" or "WELCOME15".');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#09090b', '#10b981', '#06b6d4', '#64748b'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="font-heading text-lg font-bold text-stone-900">
              Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator for India */}
        <div className="bg-stone-100 px-5 py-3 border-b border-stone-200">
          <div className="flex justify-between text-xs text-stone-600 mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span>Add <strong className="text-stone-900 font-bold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for Free Delivery</span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Unlocked: Free Express Delivery Across India!
              </span>
            )}
            <span className="font-mono text-[11px] text-stone-900 font-bold">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-900 transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Order Complete Simulation View */}
        {orderComplete ? (
          <div className="p-8 text-center flex-1 flex flex-col justify-center items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl text-stone-950 font-bold">
              Order Confirmed!
            </h3>
            <p className="text-xs text-stone-600 mt-2 max-w-xs leading-relaxed">
              Order #MINIMA-{Math.floor(100000 + Math.random() * 900000)} has been placed. Your science-backed formulations are being packaged and dispatched from our Mumbai hub via Bluedart Express.
            </p>
            <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200 text-left w-full text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Mode:</span>
                <span className="font-bold text-stone-900 uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Paid:</span>
                <span className="font-bold text-stone-950 font-mono">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-medium text-stone-800">2-3 Business Days</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClearCart();
                setOrderComplete(false);
                onClose();
              }}
              className="mt-6 w-full py-3 bg-stone-950 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Cart Item List */
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center text-stone-500 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 stroke-1" />
                <p className="font-heading text-lg font-bold text-stone-800">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Discover our 10% Niacinamide, SPF 50 invisible sunscreen, and Ceramide barrier cream.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-stone-950 text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explore Actives
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedShade || ''}`}
                  className="flex gap-4 pb-4 border-b border-stone-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-lg bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif-luxury text-base font-medium text-stone-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        {item.selectedShade ? `Shade: ${item.selectedShade} · ` : ''}{item.product.volumeOrSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-stone-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer / Summary if items exist and not complete */}
        {items.length > 0 && !orderComplete && (
          <div className="p-5 border-t border-amber-900/10 bg-[#FBF7F2] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. VEDA30)"
                  className="w-full bg-white border border-stone-300 text-xs text-stone-800 placeholder-stone-400 px-3 py-2 rounded-lg uppercase focus:outline-none focus:border-amber-600"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2A180E] text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoSuccess && <p className="text-[11px] text-emerald-700 font-medium">✓ {promoSuccess}</p>}
            {promoError && <p className="text-[11px] text-rose-600 font-medium">✕ {promoError}</p>}

            {/* Payment Method Selector (Indian E-commerce Standard) */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 block mb-1.5">
                Select Payment Mode:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-lg text-xs font-medium border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'upi' ? 'bg-[#2A180E] text-white border-[#2A180E]' : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2 rounded-lg text-xs font-medium border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'cod' ? 'bg-[#2A180E] text-white border-[#2A180E]' : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  <Banknote className="w-3.5 h-3.5" />
                  <span>Cash on Del.</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-lg text-xs font-medium border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-[#2A180E] text-white border-[#2A180E]' : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Cards / Net</span>
                </button>
              </div>
            </div>

            {/* Price Calculations in INR */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Festive Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Across India</span>
                <span>{shipping === 0 ? <span className="text-emerald-700 font-medium">FREE</span> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (5%)</span>
                <span>₹{estimatedGst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 bg-stone-950 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>Securing Your Clinical Order...</span>
              ) : (
                <>
                  <span>Place Order · ₹{finalTotal.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Transparent Actives · Encrypted Payment Gateway</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
