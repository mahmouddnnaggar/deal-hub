/**
 * Framer Motion Configuration & Primitives
 * Reusable animation variants for consistent, subtle motion throughout the app
 */

import { type Variants, type Transition } from 'framer-motion';

// Default easing curves
export const easings = {
  smooth: [0.4, 0, 0.2, 1],
  smoothOut: [0, 0, 0.2, 1],
  smoothIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: 'spring', stiffness: 300, damping: 30 },
} as const;

// Default transitions
export const transitions: Record<string, Transition> = {
  fast: { duration: 0.15, ease: easings.smooth },
  normal: { duration: 0.3, ease: easings.smooth },
  slow: { duration: 0.5, ease: easings.smooth },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: transitions.normal,
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: transitions.fast,
  },
};

// Fade variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitions.normal,
  },
  exit: { 
    opacity: 0,
    transition: transitions.fast,
  },
};

// Slide variants (for drawers, modals)
export const slideVariants: Variants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: transitions.spring,
  },
  exit: { 
    x: '100%',
    transition: transitions.normal,
  },
};

// Slide from left (RTL support)
export const slideFromLeftVariants: Variants = {
  hidden: { x: '-100%' },
  visible: { 
    x: 0,
    transition: transitions.spring,
  },
  exit: { 
    x: '-100%',
    transition: transitions.normal,
  },
};

// Scale variants (for modals, buttons)
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.spring,
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: transitions.fast,
  },
};

// List item variants (for staggered lists)
export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.normal,
  },
};

// Container variants (for staggering children)
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Skeleton pulse animation
export const skeletonVariants: Variants = {
  pulse: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Button hover/tap
export const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, transition: transitions.fast },
  tap: { scale: 0.98, transition: transitions.fast },
};

// Card hover
export const cardVariants: Variants = {
  idle: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  hover: { 
    y: -4, 
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    transition: transitions.normal,
  },
};
