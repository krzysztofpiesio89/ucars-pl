'use client';

import { motion } from 'framer-motion';

interface BlobProps {
  className: string;
  animate: any;
}

const Blob = ({ className, animate }: BlobProps) => (
  <motion.div
    className={className}
    animate={animate}
    transition={{
      duration: Math.random() * 10 + 20, // Random duration between 20-30s
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    }}
  />
);

const AnimatedGradientBlobs = () => {
  const blobs: BlobProps[] = [
    {
      className: "w-64 h-64 hidden md:flex dark:bg-gradient-radial from-pink-500 to-purple-700 rounded-full absolute top-3/4 right-1/2 blur-3xl opacity-20 dark:opacity-30",
      animate: {
        x: [-100, 100, -100],
        y: [-100, 100, -100],
        rotate: [0, 90, 0],
      },
    },
    {
      className: "w-52 h-52 dark:bg-gradient-radial from-blue-500 to-violet-950 rounded-full absolute top-full left-1/4 blur-3xl opacity-20 dark:opacity-40",
      animate: {
        x: [150, -150, 150],
        y: [-50, 50, -50],
      },
    },
    {
      className: "w-96 h-96 dark:bg-gradient-radial from-indigo-900 to-purple-700 rounded-full absolute top-1/2 left-1/2 blur-3xl opacity-10 dark:opacity-20",
      animate: {
        x: [200, -200, 200],
        y: [150, -150, 150],
      },
    },
    {
      className: "w-80 h-40 dark:bg-gradient-radial from-teal-500 to-green-700 rounded-full absolute top-0 left-10 blur-3xl opacity-20 dark:opacity-30",
      animate: {
        x: [-150, 150, -150],
        y: [70, -70, 70],
        rotate: [0, -45, 0],
      },
    },
    {
      className: "w-80 h-80 dark:bg-gradient-radial from-slate-700 to-[#343434] rounded-full absolute top-[20%] right-0 blur-3xl opacity-10 dark:opacity-20",
      animate: {
        x: [100, -250, 100],
        y: [-100, 200, -100],
      },
    },
  ];

  return (
    <>
      {blobs.map((blob, i) => (
        <Blob key={i} className={blob.className} animate={blob.animate} />
      ))}
    </>
  );
};

export default AnimatedGradientBlobs;
