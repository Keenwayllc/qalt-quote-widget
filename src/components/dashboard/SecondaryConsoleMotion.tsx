"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SecondaryConsoleMotionProps = {
  children: ReactNode;
  variant: "admin" | "embed" | "whatsnew" | "support";
};

export default function SecondaryConsoleMotion({
  children,
  variant,
}: SecondaryConsoleMotionProps) {
  const reduceMotion = useReducedMotion();

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
