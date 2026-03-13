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
  size?: "sm" | "md" | "lg" | "xl";
  /** Wrap in a link to "/" (default true). */
  linked?: boolean;
  className?: string;
}

const SIZES = {
  //          iconSize  imageH   imageW  negMarginLeft iconOffset             gap     imgExtra
  sm: { icon: 28, h: "h-10", w: "w-auto", ml: "-ml-1.5", translateY: "-translate-y-[3px] -translate-x-[2px]", gap: "gap-1", imgExtra: "" },
  md: { icon: 36, h: "h-12", w: "w-auto", ml: "-ml-2",   translateY: "-translate-y-[3px] -translate-x-[2px]", gap: "gap-1", imgExtra: "" },
  lg: { icon: 44, h: "h-14", w: "w-auto", ml: "-ml-2.5", translateY: "-translate-y-[3px] -translate-x-[2px]", gap: "gap-1", imgExtra: "" },
  xl: { icon: 56, h: "h-[62px]", w: "w-auto", ml: "-ml-2",   translateY: "translate-y-[1px]", gap: "gap-3", imgExtra: "-translate-x-[10px] translate-y-[4px]" },
} as const;

export default function QaltLogo({
  size = "md",
  linked = true,
  className = "",
}: QaltLogoProps) {
  const s = SIZES[size];

  const inner = (
    <span className={`flex items-center ${s.gap} ${className}`}>
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
        className={`${s.h} ${s.w} ${s.ml} object-contain ${s.imgExtra}`}
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
