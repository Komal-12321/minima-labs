import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            ))}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-stone-950 font-extrabold tracking-tight">
            Tested & Trusted by 250,000+ Indian Consumers
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Real efficacy results for dark spots, oil balance, and barrier repair across Bengaluru, Mumbai, Delhi, Hyderabad, and 450+ Indian cities.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-stone-50 p-6 sm:p-7 rounded-lg border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <h3 className="font-heading text-base font-bold text-stone-950 leading-snug mb-2">
                  "{review.title}"
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {review.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{review.author}</h4>
                  <p className="text-[11px] text-stone-500 font-mono">{review.location}</p>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
