'use client';

/**
 * Slider Component - Simple scroll-based carousel
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib';

interface SliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function Slider<T>({
  items,
  renderItem,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className,
}: SliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  const paginate = useCallback(
    (direction: number) => {
      const newIndex =
        (currentIndex + direction + items.length) % items.length;
      goToSlide(newIndex);
    },
    [currentIndex, items.length, goToSlide]
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, paginate, items.length]);

  if (items.length === 0) return null;

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full cursor-pointer bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full cursor-pointer bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-primary/40 hover:bg-primary/60'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
