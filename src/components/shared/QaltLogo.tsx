import Link from "next/link";
import QaltAnimatedLogo from "./QaltAnimatedLogo";

interface QaltLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  linked?: boolean;
  className?: string;
  white?: boolean;
  /** Skip entrance animation */
  noAnimate?: boolean;
}

/**
 * Responsive height classes per size token.
 * Each maps to a mobile-first height that scales up on sm/md breakpoints
 * so the logo always feels well-proportioned for the viewport.
 */
const SIZES = {
  sm: { h: "h-7 sm:h-8" },
  md: { h: "h-8 sm:h-10 md:h-11" },
  lg: { h: "h-9 sm:h-11 md:h-14" },
  xl: { h: "h-9 sm:h-12 md:h-14" },
} as const;

export default function QaltLogo({
  size = "md",
  linked = true,
  className = "",
  white = false,
  noAnimate = false,
}: QaltLogoProps) {
  const s = SIZES[size];

  const inner = (
    <span className={`flex items-center ${className}`}>
      <QaltAnimatedLogo
        className={`${s.h} w-auto`}
        white={white}
        noAnimate={noAnimate}
      />
    </span>
  );

  if (!linked) return inner;

  return (
    <Link href="/" className="flex items-center">
      {inner}
    </Link>
  );
}
