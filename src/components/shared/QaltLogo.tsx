import Link from "next/link";
import QaltAnimatedLogo from "./QaltAnimatedLogo";

interface QaltLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  linked?: boolean;
  className?: string;
  white?: boolean;
  autoDark?: boolean;
  /** Skip entrance animation */
  noAnimate?: boolean;
}

/**
 * Responsive height classes per size token.
 * Each maps to a mobile-first height that scales up on sm/md breakpoints
 * so the logo always feels well-proportioned for the viewport.
 */
const SIZES = {
  sm: { h: "h-6 sm:h-7" },
  md: { h: "h-6 sm:h-7 md:h-8" },
  lg: { h: "h-8 sm:h-9 md:h-10" },
  xl: { h: "h-8 sm:h-10 md:h-12" },
} as const;

export default function QaltLogo({
  size = "md",
  linked = true,
  className = "",
  white = false,
  autoDark = false,
  noAnimate = false,
}: QaltLogoProps) {
  const s = SIZES[size];

  const inner = (
    <span className={`flex items-center ${className}`}>
      <QaltAnimatedLogo
        className={`${s.h} w-auto`}
        white={white}
        autoDark={autoDark}
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
