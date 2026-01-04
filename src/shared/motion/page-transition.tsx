'use client';

/**
 * Page Transition Wrapper
 */

import { motion, type HTMLMotionProps } from 'framer-motion';
import { pageVariants } from './motion-config';

interface PageTransitionProps extends HTMLMotionProps<'main'> {
  children: React.ReactNode;
}

export function PageTransition({ children, ...props }: PageTransitionProps) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      {...props}
    >
      {children}
    </motion.main>
  );
}
