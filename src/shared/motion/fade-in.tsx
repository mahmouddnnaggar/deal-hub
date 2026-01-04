'use client';

/**
 * Fade In Animation Component
 */

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { fadeVariants } from './motion-config';

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.3,
  direction = 'up',
  distance = 20,
  ...props
}: FadeInProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      ...directionMap[direction],
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
