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

const SIZES = {
  sm: { h: "h-10" },
  md: { h: "h-14" },
  lg: { h: "h-16" },
  xl: { h: "h-20" },
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
