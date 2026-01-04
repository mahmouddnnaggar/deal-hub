'use client';

/**
 * Staggered List Animation Component
 */

import { motion, type HTMLMotionProps } from 'framer-motion';
import { containerVariants, listItemVariants } from './motion-config';

interface StaggeredListProps extends HTMLMotionProps<'ul'> {
  children: React.ReactNode;
}

export function StaggeredList({ children, ...props }: StaggeredListProps) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      {children}
    </motion.ul>
  );
}

interface StaggeredItemProps extends HTMLMotionProps<'li'> {
  children: React.ReactNode;
}

export function StaggeredItem({ children, ...props }: StaggeredItemProps) {
  return (
    <motion.li variants={listItemVariants} {...props}>
      {children}
    </motion.li>
  );
}
