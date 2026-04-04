import Image from "next/image";
import Link from "next/link";

interface QaltLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  linked?: boolean;
  className?: string;
  /** Use white (inverted) version for dark backgrounds */
  white?: boolean;
}

const SIZES = {
  sm: { h: "h-7",  w: 280, wh: 280 },
  md: { h: "h-9",  w: 280, wh: 280 },
  lg: { h: "h-11", w: 280, wh: 280 },
  xl: { h: "h-14", w: 280, wh: 280 },
} as const;

export default function QaltLogo({
  size = "md",
  linked = true,
  className = "",
  white = false,
}: QaltLogoProps) {
  const s = SIZES[size];

  const inner = (
    <span className={`flex items-center ${className}`}>
      <Image
        src="/images/qalt-logo-main-2026.png"
        alt="Qalt"
        width={1080}
        height={1080}
        className={`${s.h} w-auto object-contain ${white ? "brightness-0 invert" : ""}`}
        priority
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
