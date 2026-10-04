"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore, type ReactNode } from "react";

const mediaQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(mediaQuery).matches;

type SecondaryConsoleMotionProps = {
  children: ReactNode;
  variant: "admin" | "embed" | "whatsnew" | "support";
};

export default function SecondaryConsoleMotion({
  children,
  variant,
}: SecondaryConsoleMotionProps) {
  const reduceMotion = useSyncExternalStore(subscribe, getReducedMotion, () => true);

  return (
    <motion.div
      className={`qalt-secondary-shell qalt-secondary-${variant}`}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
