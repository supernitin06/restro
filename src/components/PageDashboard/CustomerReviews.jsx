import React, { useRef, useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerReviews = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const reviews = [
    {
      id: 1,
      dishName: 'Classic Italian Penne',
      review: 'This pasta is divine! The flavors are prominent, creating a rich, savory, unforgettable taste. Highly recommended for pasta lovers!',
      reviewer: 'Sarah M.',
      date: 'Oct 12, 2035',
      rating: 5,
      image: '🍝',
      gradient: 'from-orange-100 to-orange-50'
    },
    {
      id: 2,
      dishName: 'Smokey Supreme Pizza',
      review: 'Crispy crust, generous cheese, and the perfect balance of spice in the pepperoni. A classic pizza done right, and one of the best I\'ve had!',
      reviewer: 'Michael R.',
      date: 'Oct 15, 2035',
      rating: 4.5,
      image: '🍕',
      gradient: 'from-red-100 to-red-50'
    },
    {
      id: 3,
      dishName: 'Classic Cheeseburger',
      review: 'Juicy, perfectly cooked patty with fresh ingredients. The cheese was melted to perfection. Best burger in town!',
      reviewer: 'Jessica L.',
      date: 'Oct 18, 2035',
      rating: 5,
      image: '🍔',
      gradient: 'from-yellow-100 to-yellow-50'
    },
    {
      id: 4,
      dishName: 'Sashimi Sushi Roll',
      review: 'Fresh and delicious! The fish quality is exceptional and the presentation is beautiful. Will definitely order again.',
      reviewer: 'David K.',
      date: 'Oct 20, 2035',
      rating: 5,
      image: '🍣',
      gradient: 'from-blue-100 to-blue-50'
    }
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardScroll = Math.round(scrollRef.current.clientWidth / 2);
      const scrollAmount = direction === 'left' ? -cardScroll : cardScroll;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();

      return () => {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Customer Reviews</h3>
        <button className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
          See More Reviews
        </button>
      </div>

      <div className="relative overflow-hidden">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        )}

        {/* Scrollable Container */}
        <div className="w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-[45%] flex-shrink-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${review.gradient} dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform`}>
                    {review.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-1">{review.dishName}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(review.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : review.rating % 1 !== 0 && i === Math.floor(review.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{review.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {review.review}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">{review.reviewer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;