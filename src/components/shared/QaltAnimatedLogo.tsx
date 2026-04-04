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
      pathLength: { duration: 0.65, delay: i * 0.13, ease: "easeInOut" as const },
      opacity: { duration: 0.1, delay: i * 0.13 },
    },
  }),
};

const segmentVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: 0.45 + i * 0.12, ease: "easeOut" as const },
  }),
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: 0.8, ease: "easeOut" as const },
  },
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
      viewBox="400 400 8000 3200"
      className={className}
      initial={initial}
      animate="visible"
      aria-label="Qalt Logo"
    >
      <defs>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');`}</style>
      </defs>

      {/* Grey circle segments */}
      <motion.path
        d="M3305.59,1978.35c.05-706.8-507.38-1295.07-1177.84-1420.42l1096.63,1899.37c52.6-149.85,81.26-311.07,81.21-478.95h0Z"
        fill={grey}
        fillRule="evenodd"
        variants={segmentVariants}
        custom={0}
      />
      <motion.path
        d="M1593.32,3398.76L496.69,1499.39c-52.64,149.89-81.26,311.07-81.26,478.96,0,706.83,507.43,1295.14,1177.89,1420.41h0Z"
        fill={grey}
        fillRule="evenodd"
        variants={segmentVariants}
        custom={1}
      />

      {/* Red diagonal lines — staggered sweep */}
      <motion.path
        d="M1239.86,673.03c-69.75,33.18-136.35,71.83-199.36,115.31,506.54,877.45,1013.14,1754.84,1519.74,2632.23h265.91c-528.73-915.84-1057.51-1831.7-1586.3-2747.54h0Z"
        fill={red}
        fillRule="evenodd"
        variants={lineVariants}
        custom={0}
      />
      <motion.path
        d="M655.24,1180.82c431.11,746.68,862.18,1493.35,1293.26,2240.04,269.24-.29,184.37-.29,269.24-.29-468.8-811.93-937.62-1623.97-1406.42-2435.91-57.45,60.64-109.72,126.28-156.08,196.16h0Z"
        fill={red}
        fillRule="evenodd"
        variants={lineVariants}
        custom={1}
      />
      <motion.path
        d="M1772.57,535.92c-84.9,5.09-167.88,17.52-248.2,36.71,548.1,949.31,1096.21,1898.63,1644.32,2847.94h269.38c-555.17-961.51-1110.35-1923.08-1665.49-2884.65h0Z"
        fill={red}
        fillRule="evenodd"
        variants={lineVariants}
        custom={2}
      />

      {/* QALT text */}
      <motion.text
        style={{
          fontFamily: "'Montserrat', 'Futura PT', sans-serif",
          fontSize: "944.82px",
          fontWeight: 800,
          letterSpacing: "-20px",
          fill: grey,
        }}
        transform="translate(4080.84 1968.39)"
        variants={textVariants}
      >
        <tspan x="0" y="0">QALT</tspan>
      </motion.text>
    </motion.svg>
  );
}
