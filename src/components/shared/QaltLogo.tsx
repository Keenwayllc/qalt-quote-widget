import Image from "next/image";
import Link from "next/link";
import QaltIcon from "./QaltIcon";

/**
 * QaltLogo — canonical logo component used across all pages.
 *
 * Sizing math:
 *   - SVG circle: r=38, strokeWidth=14 → outer edge at 95/100 of viewBox → 90% of `iconSize` is visible
 *   - PNG text content: spans ~6%–91% of image height (Q tail descends) → ~85% visible
 *   - To make both elements appear the same optical height:
 *       visible_icon = 0.90 × iconSize
 *       visible_png  = 0.85 × imageHeight
 *       → imageHeight = (0.90 / 0.85) × iconSize ≈ iconSize × 1.06
 *   - We round to the nearest Tailwind h-* step.
 *
 * Left-whitespace compensation:
 *   - The PNG has ~4% left padding before the Q glyph → we use a small negative
 *     left margin on the image so the Q glyph sits flush against the icon.
 */

interface QaltLogoProps {
  /** Controls everything — icon px size drives all other proportions. */
  size?: "sm" | "md" | "lg";
  /** Wrap in a link to "/" (default true). */
  linked?: boolean;
  className?: string;
}

const SIZES = {
  //          iconSize  imageH   imageW  negMarginLeft iconOffset
  sm: { icon: 28, h: "h-10", w: "w-auto", ml: "-ml-1.5", translateY: "-translate-y-[3px] -translate-x-[2px]" },
  md: { icon: 36, h: "h-12", w: "w-auto", ml: "-ml-2",   translateY: "-translate-y-[3px] -translate-x-[2px]" },
  lg: { icon: 44, h: "h-14", w: "w-auto", ml: "-ml-2.5", translateY: "-translate-y-[3px] -translate-x-[2px]" },
} as const;

export default function QaltLogo({
  size = "md",
  linked = true,
  className = "",
}: QaltLogoProps) {
  const s = SIZES[size];

  const inner = (
    <span className={`flex items-center gap-1 ${className}`}>
      {/* Icon: explicit color so it never depends on currentColor inheritance */}
      <QaltIcon
        size={s.icon}
        color="#255d84"
        eyeColor="#255d84"
        className={s.translateY}
      />
      {/*
        Image: h-* drives display height, w-auto preserves aspect ratio.
        Negative left margin compensates for the ~4% left whitespace baked
        into the PNG so the Q glyph reads flush against the icon.
        No translate-y needed — items-center is mathematically correct here.
      */}
      <Image
        src="/images/qalt.png"
        alt="Qalt"
        width={280}
        height={169}
        className={`${s.h} ${s.w} ${s.ml} object-contain`}
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
