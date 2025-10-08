'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LazyLoadWrapperProps {
  children: ReactNode;
  delay?: number;
}

const LazyLoadWrapper = ({ children, delay = 0 }: LazyLoadWrapperProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default LazyLoadWrapper;
