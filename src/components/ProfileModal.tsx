import React, { useState } from 'react';
import { X, User, Package, Award, Sparkles, Check, ArrowRight, FlaskConical } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'perks' | 'orders' | 'profile'>('perks');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-white text-stone-950 flex items-center justify-center text-sm font-mono font-black">
              M
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white leading-tight">
                MINIMA Insider Lab Circle
              </h2>
              <p className="text-[11px] text-stone-300 font-mono">Tier: Platinum Researcher · 650 Lab Points</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-stone-200 text-xs font-semibold bg-stone-50">
          <button
            onClick={() => setActiveTab('perks')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'perks' ? 'border-stone-900 text-stone-950 font-bold bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Lab Rewards & Vouchers
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'border-stone-900 text-stone-950 font-bold bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Recent Orders (2)
          </button>
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'perks' && (
            <div className="space-y-4">
              <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 text-stone-900">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-stone-700">
                    Active Reward Voucher
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700">₹250 Off Coupon</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Redeem 500 Lab Points for flat ₹250 off any active formulation or SPF fluid.
                </p>
                <div className="mt-3">
                  <button className="px-3.5 py-1.5 bg-stone-950 text-white rounded text-xs font-mono font-bold hover:bg-stone-800 transition-colors cursor-pointer">
                    Code: MINIMA250
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-stone-900">Your Tier Privileges:</h4>
                <div className="flex items-center gap-2 text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free express delivery on all orders above ₹499 across India</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Early 48-hour access to newly launched active molecule batches</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complimentary 5ml sample of upcoming Lonza Peptide formula</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="border border-stone-200 rounded-lg p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-stone-900">Order #MIN-89312</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">Delivered</span>
                </div>
                <p className="text-xs text-stone-800 font-semibold">MINIMA 10% Niacinamide + Zinc 1% (30ml) · ₹599</p>
                <p className="text-[11px] text-stone-500">Delivered to Indiranagar, Bengaluru via Bluedart Express</p>
              </div>

              <div className="border border-stone-200 rounded-lg p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-stone-900">Order #MIN-72419</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">Delivered</span>
                </div>
                <p className="text-xs text-stone-800 font-semibold">MINIMA Ultra-Light Fluid SPF 50 PA++++ · ₹499</p>
                <p className="text-[11px] text-stone-500">Delivered to Bandra West, Mumbai via Delhivery</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-stone-700 hover:text-stone-950 cursor-pointer"
          >
            Close Member Profile
          </button>
        </div>
      </div>
    </div>
  );
};
