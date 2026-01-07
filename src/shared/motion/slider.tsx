'use client';

/**
 * Slider Component - Reusable carousel with Framer Motion
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export function Slider<T>({
  items,
  renderItem,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className,
}: SliderProps<T>) {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      const newIndex =
        (currentIndex + newDirection + items.length) % items.length;
      setSlide([newIndex, newDirection]);
    },
    [currentIndex, items.length]
  );

  const goToSlide = (index: number) => {
    const direction = index > currentIndex ? 1 : -1;
    setSlide([index, direction]);
  };

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
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="w-full"
        >
          {renderItem(items[currentIndex], currentIndex)}
        </motion.div>
      </AnimatePresence>

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
