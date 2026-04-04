"use client";

import { motion } from "framer-motion";

interface QaltAnimatedLogoProps {
  className?: string;
  white?: boolean;
  noAnimate?: boolean;
}

const RED = "#e9001a";
const GREY = "#4f515b";

const lineVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: (i: number) => ({
    opacity: 1,
    pathLength: 1,
    transition: {
      pathLength: { duration: 1.1, delay: 0.1 + i * 0.18, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
      opacity: { duration: 0.3, delay: 0.1 + i * 0.18 },
    },
  }),
};

const segmentVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: 0.6 + i * 0.2, ease: "easeOut" as const },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 1.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
};

export default function QaltAnimatedLogo({
  className = "",
  white = false,
  noAnimate = false,
}: QaltAnimatedLogoProps) {
  const red = white ? "#ffffff" : RED;
  const grey = white ? "#ffffff" : GREY;
  const initial = noAnimate ? "visible" : "hidden";

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="100 1300 3700 1150"
      className={className}
      initial={initial}
      animate="visible"
      aria-label="Qalt Logo"
    >
      {/* ── Grey circle segments ── */}
      <motion.path
        d="M1139.38,1859.75c.02-251.94-180.86-461.64-419.85-506.32l390.9,677.05c18.75-53.42,28.97-110.88,28.95-170.73h0Z"
        fill={grey}
        variants={segmentVariants}
        custom={0}
      />
      <motion.path
        d="M529.03,2366.06l-390.9-677.05c-18.76,53.43-28.97,110.88-28.97,170.73,0,251.96,180.88,461.66,419.87,506.32h0Z"
        fill={grey}
        variants={segmentVariants}
        custom={1}
      />

      {/* ── Red diagonal lines — staggered sweep ── */}
      <motion.path
        d="M403.04,1394.45c-24.86,11.83-48.6,25.6-71.06,41.1,180.56,312.77,361.14,625.53,541.72,938.28h94.79c-188.47-326.46-376.96-652.92-565.45-979.38h0Z"
        fill={red}
        variants={lineVariants}
        custom={0}
      />
      <motion.path
        d="M194.64,1575.46c153.67,266.16,307.33,532.32,460.99,798.48,95.97-.1,65.72-.1,95.97-.1-167.11-289.42-334.22-578.88-501.33-868.3-20.48,21.62-39.11,45.01-55.64,69.92h0Z"
        fill={red}
        variants={lineVariants}
        custom={1}
      />
      <motion.path
        d="M592.92,1345.58c-30.26,1.81-59.84,6.25-88.47,13.09,195.37,338.39,390.75,676.78,586.13,1015.17h96.02c-197.89-342.74-395.79-685.5-593.68-1028.26h0Z"
        fill={red}
        variants={lineVariants}
        custom={2}
      />

      {/* ── QALT outlined letter paths ── */}
      {/* Q */}
      <motion.path
        d="M1856.27,2234.92c-35.15,25.56-90.53,55.38-199.17,55.38s-191.72-33.02-260.95-101.18c-82.01-80.95-111.83-181.07-111.83-270.53,0-106.51,45.8-202.37,107.57-264.14s155.5-106.51,277.99-106.51c109.7,0,207.69,39.41,274.79,102.25,64.97,60.71,110.77,153.37,110.77,270.53,0,53.25-11.72,96.92-29.82,137.4-18.11,41.54-41.54,71.36-69.23,95.86l123.55,134.2-154.44,19.17-69.23-72.43ZM1845.62,2046.4c26.63-36.21,41.54-74.56,41.54-127.81,0-75.62-30.89-126.75-60.71-156.57-40.47-41.54-97.99-62.84-156.57-62.84-66.04,0-121.42,27.69-155.5,62.84-40.47,41.54-61.78,104.38-61.78,159.76s20.24,112.9,59.65,154.44c35.15,36.21,84.14,62.84,153.37,62.84,29.82,0,57.52-5.33,85.21-18.11l-127.81-125.68,158.7-17.04,63.91,68.17Z"
        fill={grey}
        variants={letterVariants}
        custom={0}
      />
      {/* A */}
      <motion.path
        d="M2611.41,2140.12h-268.4l-54.32,134.2h-170.42l286.51-710.42h150.18l280.12,710.42h-170.42l-53.25-134.2ZM2566.67,2014.44l-87.34-238.58-88.4,238.58h175.74Z"
        fill={grey}
        variants={letterVariants}
        custom={1}
      />
      {/* L */}
      <motion.path
        d="M3078.97,1563.91v571.96h220.47v138.46h-384.5v-710.42h164.02Z"
        fill={grey}
        variants={letterVariants}
        custom={2}
      />
      {/* T */}
      <motion.path
        d="M3622.18,1702.37v571.96h-164.02v-571.96h-154.44v-138.46h472.9v138.46h-154.44Z"
        fill={grey}
        variants={letterVariants}
        custom={3}
      />
    </motion.svg>
  );
}
