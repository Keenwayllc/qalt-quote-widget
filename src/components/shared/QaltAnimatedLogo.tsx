import Image from "next/image";

interface QaltAnimatedLogoProps {
  className?: string;
  white?: boolean;
  noAnimate?: boolean;
  iconOnly?: boolean;
  onDark?: boolean;
  /** Follow the dashboard theme, including its first server-rendered frame. */
  autoDark?: boolean;
  /** Use the quote form palette rather than the surrounding dashboard theme. */
  widgetTheme?: boolean;
}

/** The approved October wordmark, preserving its geometry and red Q tail. */
export default function QaltAnimatedLogo({
  className = "",
  white = false,
  noAnimate = false,
  iconOnly = false,
  onDark = false,
  autoDark = false,
  widgetTheme = false,
}: QaltAnimatedLogoProps) {
  const light = white || onDark;
  const variant = iconOnly ? "icon" : "wordmark";
  const darkSrc = `/images/qalt-${variant}-2026-10-clean.svg`;
  const lightSrc = `/images/qalt-${variant}-light-2026-10-clean.svg`;
  const imageProps = {
    width: iconOnly ? 512 : 1961,
    height: iconOnly ? 512 : 422,
    sizes: iconOnly ? "48px" : "(max-width: 767px) 150px, 224px",
    // Outlined SVG artwork stays sharp at every screen size.
    unoptimized: true,
    draggable: false,
  } as const;
  // CSS honors reduced motion without changing the initial hydration markup.
  const entrance = noAnimate ? "" : "qalt-logo-entrance";

  return (
    <>
      <Image
        {...imageProps}
        alt="Qalt Logo"
        src={light ? lightSrc : darkSrc}
        className={`object-contain ${entrance} ${widgetTheme ? "qalt-widget-logo-light" : autoDark && !light ? "dark:hidden" : ""} ${className}`}
      />
      {(autoDark || widgetTheme) && !light ? (
        <Image
          {...imageProps}
          alt="Qalt Logo"
          src={lightSrc}
          className={`hidden object-contain ${entrance} ${widgetTheme ? "qalt-widget-logo-dark" : "dark:block"} ${className}`}
        />
      ) : null}
    </>
  );
}
