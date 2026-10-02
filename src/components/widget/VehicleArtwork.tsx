import { useId, type CSSProperties } from "react";
import { inferVehicleArtwork, parseVehicleArtworkKey, type VehicleArtworkKey } from "@/lib/form-vehicles";
import styles from "./VehicleArtwork.module.css";

/**
 * Vehicle silhouettes for the quote form's vehicle cards and the merchant
 * artwork picker.
 *
 * Each motor vehicle is one solid shape in a neutral ink. Windows, door seams
 * and wheel-arch gaps are cut out with an SVG mask, so the card behind shows
 * through and contrast holds on light and dark cards alike. Tires are rings
 * with real hub holes. The merchant brand color only lights the head/tail
 * lamps of the selected vehicle, so a pale brand color never costs legibility.
 *
 * Drawing grid: 160 x 72, ground line at y = 64. Wheel centers sit at
 * 64 - radius so every vehicle stands on the same ground.
 */

const GROUND = 64;

type Wheel = [cx: number, r: number];
type Lamp = [x: number, y: number, w: number, h: number];

type Silhouette = {
  /** Filled body shapes (ink). */
  body: string[];
  /** Tinted glass. */
  glass?: string[];
  /** Filled cutouts that show the card: vents, gaps. */
  cut?: string[];
  /** Hairline cutouts: door seams, panel ribs. */
  seams?: string[];
  wheels: Wheel[];
  lamps?: Lamp[];
};

/* ── Shared truck cab (faces right, back wall at x = 106) ──────────────── */

const CAB = "M106 56 L106 22 Q106 18 110 18 L125 18 Q130 18 133 22.5 L140 34 L150 37 Q155 38.5 155 44 L155 54 Q155 56 153 56 Z";
const CAB_WINDOW = "M110 21.5 L124.5 21.5 Q127.5 21.5 129.5 24.5 L135.5 33.5 L110 33.5 Z";
const CAB_SEAM = "M129 36 L129 52";
const CAB_LAMPS: Lamp[] = [[151, 40, 3.5, 3]];

const VEHICLES: Record<Exclude<
  VehicleArtworkKey,
  "bicycle" | "e-bike" | "cargo-bike" | "scooter" | "e-scooter" | "motorcycle"
>, Silhouette> = {
  sedan: {
    body: ["M9 56 L7.5 46 Q7.5 39.5 14 38.5 L40 35.5 Q48 27 58 22.5 Q64 20.5 74 20.5 L94 20.5 Q102 20.5 108 25.5 L118 34.5 L143 37.5 Q152 38.5 153 45 L153 53 Q153 56 150 56 Z"],
    glass: [
      "M50.5 34.5 L60 25.2 Q63 23.6 68 23.6 L80.6 23.6 L80.6 34.5 Z",
      "M83.6 23.6 L95 23.6 Q100.5 23.7 104.5 27.2 L111.5 34.5 L83.6 34.5 Z",
    ],
    seams: ["M82.1 37 L82.1 52", "M112 37 L113 49"],
    wheels: [[36, 11.5], [122, 11.5]],
    lamps: [[147.5, 41, 4, 2.6], [8.5, 41.5, 3, 3]],
  },
  hatchback: {
    body: ["M18 56 L16.5 43 Q16.5 34.5 22 31 L34 22.5 Q38 20.5 46 20.5 L88 20.5 Q96 20.5 102 25.5 L114 34.5 L136 37.5 Q144.5 38.5 145 45 L145 53 Q145 56 142 56 Z"],
    glass: [
      "M27 33.5 L37 25 Q40.5 23.6 46 23.6 L61.6 23.6 L61.6 33.5 Z",
      "M64.6 23.6 L87.5 23.6 Q93 23.7 97.5 27.5 L104 33.5 L64.6 33.5 Z",
    ],
    seams: ["M63.1 36 L63.1 52", "M104.5 36 L105.5 49"],
    wheels: [[42, 11.5], [118, 11.5]],
    lamps: [[139.5, 41, 4, 2.6], [17.5, 36, 2.6, 5]],
  },
  suv: {
    body: [
      "M10 55 L9 27 Q9 18 18 17.5 L102 17 Q108 17 111 21.5 L117 32 L145 35 Q153 36.5 153 43 L153 52 Q153 55 150 55 Z",
      // Roof rails, and the spare tire carried on the tailgate.
      "M20 12.5 L97 12.5 L97 14.8 L20 14.8 Z", "M24 14 L27 14 L27 18 L24 18 Z", "M90 14 L93 14 L93 18 L90 18 Z",
      "M3.5 29 Q3.5 27 5.5 27 L9.5 27 L9.5 47 L5.5 47 Q3.5 47 3.5 45 Z",
    ],
    glass: [
      "M16 29.5 L16.8 23 Q17.2 20.8 20 20.8 L44.5 20.8 L44.5 29.5 Z",
      "M47.5 20.8 L77.5 20.8 L77.5 29.5 L47.5 29.5 Z",
      "M80.5 20.8 L101 20.8 Q105 20.8 107 23.5 L110.5 29.5 L80.5 29.5 Z",
    ],
    seams: ["M79 32 L79 51", "M46 32 L46 51", "M9.8 28 L9.8 46"],
    wheels: [[37, 13], [124, 13]],
    lamps: [[147, 38.5, 4, 3], [10.5, 31, 2.6, 4.5]],
  },
  minivan: {
    // One-box shape: a long windshield that runs almost straight into a short hood.
    body: ["M10 55 L9 31 Q9 20.5 19 20 L86 19.5 Q93 19.5 99 23 L132 36 L148 38.5 Q153 39.5 153 45.5 L153 52 Q153 55 150 55 Z"],
    glass: [
      "M16.5 30.5 L17 24.5 Q17.4 22.8 20.5 22.8 L45.5 22.8 L45.5 30.5 Z",
      "M48.5 22.8 L76 22.8 L76 30.5 L48.5 30.5 Z",
      "M79 22.8 L88 22.8 Q93 22.9 97.5 25.8 L110 30.5 L79 30.5 Z",
    ],
    seams: ["M49 34 L77.5 34", "M77.5 34 L77.5 51", "M47 32.5 L47 51"],
    wheels: [[36, 11], [124, 11]],
    lamps: [[148, 41.5, 4, 2.6], [9.5, 33, 3, 4.5]],
  },
  pickup: {
    body: [
      "M7 56 L7 36 L65 36 L65 56 Z",
      "M67 56 L67 22.5 Q67 19 71 19 L98 19 Q104 19 108 24 L118 35 L145 38 Q153.5 39 154 46 L154 53 Q154 56 151 56 Z",
    ],
    glass: [
      "M72 22.5 L84 22.5 L84 33 L72 33 Z",
      "M87 22.5 L97 22.5 Q101 22.6 104 26 L110.5 33 L87 33 Z",
    ],
    seams: ["M10 39.5 L62 39.5", "M112 37 L113 50", "M85.5 36 L85.5 52"],
    wheels: [[33, 12.5], [124, 12.5]],
    lamps: [[147.5, 41.5, 4, 2.8], [7.5, 38.5, 2.6, 4]],
  },
  "cargo-van": {
    body: ["M8 55 L7 24 Q7 16 15 16 L104 16 Q111 16 115 21 L128 34 L147 37 Q153 38 154 45 L154 52 Q154 55 151 55 Z"],
    glass: ["M100.5 19.5 L104 19.5 Q109 19.5 112 23 L120 32.5 L100.5 32.5 Z"],
    seams: ["M98 19 L98 51", "M58 19 L58 51", "M60 22.5 L96 22.5", "M10 19 L10 51"],
    wheels: [[32, 12], [123, 12]],
    lamps: [[148, 40.5, 4, 2.8], [8, 30, 2.6, 5]],
  },
  "high-roof-van": {
    body: ["M8 55 L7 15 Q7 7 15 7 L100 7 Q107 7 109 12.5 L113 26 L128 34 L147 37 Q153 38 154 45 L154 52 Q154 55 151 55 Z"],
    glass: ["M100.5 17 L108 17 L111.8 29.5 L100.5 29.5 Z"],
    seams: ["M98 11 L98 51", "M58 11 L58 51", "M60 15 L96 15", "M10 11 L10 51"],
    wheels: [[32, 12], [123, 12]],
    lamps: [[148, 40.5, 4, 2.8], [8, 24, 2.6, 5]],
  },
  "sprinter-van": {
    body: ["M4 55 L3 13 Q3 6 11 6 L106 6 Q112 6 114.5 11 L119 25 L135 34.5 L151 37.5 Q157 38.5 157 45 L157 52 Q157 55 154 55 Z"],
    glass: [
      "M106.5 15.5 L113 15.5 L117.5 29 L106.5 29 Z",
      "M78 15.5 L99 15.5 Q101 15.5 101 17.5 L101 27 L78 27 Z",
    ],
    seams: ["M104 10 L104 51", "M75 10 L75 51", "M6 10 L6 51", "M77 31 L101 31"],
    wheels: [[27, 11.5], [129, 11.5]],
    lamps: [[151.5, 41, 4, 2.8], [4, 22, 2.6, 5]],
  },
  "box-truck": {
    body: ["M5 51 L5 10 Q5 7.5 7.5 7.5 L101.5 7.5 Q104 7.5 104 10 L104 51 Z", "M5 50 L108 50 L108 56 L5 56 Z", CAB],
    glass: [CAB_WINDOW],
    seams: ["M29 11 L29 47", "M54 11 L54 47", "M79 11 L79 47", CAB_SEAM],
    wheels: [[30, 11], [135, 11]],
    lamps: [...CAB_LAMPS, [5.5, 44, 2.6, 4]],
  },
  refrigerated: {
    body: [
      "M5 51 L5 10 Q5 7.5 7.5 7.5 L101.5 7.5 Q104 7.5 104 10 L104 51 Z",
      "M104 9 L113 9 Q115 9 115 11 L115 17 L104 17 Z",
      "M5 50 L108 50 L108 56 L5 56 Z",
      CAB,
    ],
    glass: [CAB_WINDOW],
    cut: ["M107 11.5 L112.5 11.5 L112.5 14.5 L107 14.5 Z"],
    seams: [
      // Snowflake: the reefer's calling card.
      "M54.5 17 L54.5 41", "M44 23 L65 35", "M44 35 L65 23",
      "M51.5 18.5 L54.5 21.5 L57.5 18.5", "M51.5 39.5 L54.5 36.5 L57.5 39.5",
      "M9 11 L9 47", CAB_SEAM,
    ],
    wheels: [[30, 11], [135, 11]],
    lamps: [...CAB_LAMPS, [5.5, 44, 2.6, 4]],
  },
  flatbed: {
    body: [
      "M5 44 L104 44 L104 50 L5 50 Z",
      "M5 49 L108 49 L108 56 L5 56 Z",
      "M98.5 22 L104 22 L104 45 L98.5 45 Z",
      // A strapped load is what makes a flatbed read as a flatbed.
      "M11 22 L55 22 L55 44 L11 44 Z",
      "M59 30 L93 30 L93 44 L59 44 Z",
      CAB,
    ],
    glass: [CAB_WINDOW],
    cut: ["M100 25 L102.5 25 L102.5 42 L100 42 Z"],
    seams: ["M22 22.5 L22 43.5", "M44 22.5 L44 43.5", "M76 30.5 L76 43.5", "M11.5 33 L54.5 33", CAB_SEAM],
    wheels: [[30, 11], [135, 11]],
    lamps: [...CAB_LAMPS, [5, 45, 2.6, 3]],
  },
  "tractor-trailer": {
    body: [
      "M3 46 L3 9 Q3 7 5 7 L105 7 Q107 7 107 9 L107 46 Z",
      "M3 45 L50 45 L50 50 L3 50 Z",
      "M96 49 L156 49 L156 55 L96 55 Z",
      "M110 55 L110 17 Q110 12 115 12 L130 12 Q134.5 12 135.5 16.5 L137.5 30.5 L151 33.5 Q156 34.5 156 40.5 L156 53 Q156 55 154 55 Z",
      "M72 46 L75 46 L75 57 L72 57 Z",
    ],
    glass: ["M124 15.5 L131.5 15.5 L133.3 28 L124 28 Z"],
    seams: ["M121 18 L121 51", "M5 11 L5 43"],
    wheels: [[14, 8.5], [32, 8.5], [118, 8.5], [146, 8.5]],
    lamps: [[151.5, 38, 4, 2.8], [3, 38, 2.4, 4]],
  },
  "multi-trailer": {
    body: [
      "M2 46 L2 11 Q2 9 4 9 L50 9 Q52 9 52 11 L52 46 Z",
      "M57 46 L57 11 Q57 9 59 9 L105 9 Q107 9 107 11 L107 46 Z",
      "M2 45 L53 45 L53 50 L2 50 Z",
      "M49 48 L60 48 L60 51 L49 51 Z",
      "M96 49 L156 49 L156 55 L96 55 Z",
      "M110 55 L110 17 Q110 12 115 12 L130 12 Q134.5 12 135.5 16.5 L137.5 30.5 L151 33.5 Q156 34.5 156 40.5 L156 53 Q156 55 154 55 Z",
    ],
    glass: ["M124 15.5 L131.5 15.5 L133.3 28 L124 28 Z"],
    seams: ["M121 18 L121 51"],
    wheels: [[13, 7.5], [58, 7.5], [72, 7.5], [118, 7.5], [146, 7.5]],
    lamps: [[151.5, 38, 4, 2.8], [2, 38, 2.4, 4]],
  },
};

/* ── Two-wheelers: drawn as tubes and solids rather than one mass ──────── */

function Tire({ cx, r }: { cx: number; r: number }) {
  const cy = GROUND - r;
  return (
    <g>
      <circle className={styles.tire} cx={cx} cy={cy} r={r} />
      <circle className={styles.hub} cx={cx} cy={cy} r={r * 0.56} />
      <circle className={styles.tire} cx={cx} cy={cy} r={r * 0.18} />
    </g>
  );
}

/** Spoked-look bicycle wheel: a thin tire with an open center. */
function BikeWheel({ cx, r }: { cx: number; r: number }) {
  const cy = GROUND - r;
  return (
    <g>
      <circle className={styles.tube} cx={cx} cy={cy} r={r - 1.6} strokeWidth={3.2} />
      <circle className={styles.ink} cx={cx} cy={cy} r={1.8} />
    </g>
  );
}

/** Punches hairline cutouts through its children, like the motor-vehicle seams. */
function Masked({ id, cuts, children }: { id: string; cuts: string; children: React.ReactNode }) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="72">
        <rect width="160" height="72" fill="#fff" />
        <path d={cuts} fill="none" stroke="#000" strokeWidth={1.3} strokeLinecap="round" />
      </mask>
      <g mask={`url(#${id})`}>{children}</g>
    </>
  );
}

function Bicycle() {
  const rearX = 40;
  const frontX = 120;
  const r = 15;
  const cy = GROUND - r;
  const crankX = 73;
  const crankY = 50;

  return (
    <>
      <BikeWheel cx={rearX} r={r} />
      <BikeWheel cx={frontX} r={r} />

      {/* Fine spokes keep the bicycle readable at dashboard-card size. */}
      <g className={styles.tube} strokeWidth={0.8}>
        <path d={`M${rearX - 13} ${cy} L${rearX + 13} ${cy} M${rearX} ${cy - 13} L${rearX} ${cy + 13} M${rearX - 9} ${cy - 9} L${rearX + 9} ${cy + 9} M${rearX - 9} ${cy + 9} L${rearX + 9} ${cy - 9}`} />
        <path d={`M${frontX - 13} ${cy} L${frontX + 13} ${cy} M${frontX} ${cy - 13} L${frontX} ${cy + 13} M${frontX - 9} ${cy - 9} L${frontX + 9} ${cy + 9} M${frontX - 9} ${cy + 9} L${frontX + 9} ${cy - 9}`} />
      </g>

      {/* Classic diamond commuter frame, side profile. */}
      <path
        className={styles.tube}
        strokeWidth={3.2}
        strokeLinejoin="round"
        d={`M${rearX} ${cy} L${crankX} ${crankY} L62 27 L${rearX} ${cy} M62 27 L101 28 L${crankX} ${crankY} L101 28 L${frontX} ${cy}`}
      />

      {/* Fork, seat post, handlebar and rear rack. */}
      <path className={styles.tube} strokeWidth={3} strokeLinecap="round" d="M101 28 L105 18 L113 17 M62 27 L60 19" />
      <path className={styles.tube} strokeWidth={2.2} strokeLinecap="round" d="M32 26 L60 26 M32 26 L29 31 M107 17 L116 17 L118 20" />

      {/* Saddle, crank and pedals. */}
      <path className={styles.ink} d="M51 16.8 Q51 15 54 15 L66 15 Q69 15 68.2 17.5 L67.4 19 L52.5 19 Q51 19 51 16.8 Z" />
      <circle className={styles.tube} cx={crankX} cy={crankY} r={4.2} strokeWidth={2.2} />
      <path className={styles.tube} strokeWidth={1.8} strokeLinecap="round" d={`M${crankX} ${crankY} L82 54 M64 46 L${crankX} ${crankY}`} />

      {/* Small neutral head/tail details. */}
      <rect className={styles.lamp} x={108} y={21.5} width={3.2} height={2.5} rx={0.6} />
      <rect className={styles.lamp} x={29} y={29} width={2.6} height={2.4} rx={0.6} />
    </>
  );
}

/** Arc over a wheel from the back of the tire, over the top, to the front. */
function Fender({ cx, r }: { cx: number; r: number }) {
  const cy = GROUND - r;
  const R = r + 3;
  const a0 = (200 * Math.PI) / 180;
  const a1 = (340 * Math.PI) / 180;
  const x0 = cx + R * Math.cos(a0);
  const y0 = cy - R * Math.sin(a0) * -1;
  const x1 = cx + R * Math.cos(a1);
  const y1 = cy - R * Math.sin(a1) * -1;
  return <path className={styles.tube} strokeWidth={2.4} d={`M${x0.toFixed(2)} ${y0.toFixed(2)} A${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`} />;
}

/** Chunky shared-e-bike wheel: thick tire, open center, big hub. */
function FatWheel({ cx, r, motor = false }: { cx: number; r: number; motor?: boolean }) {
  const cy = GROUND - r;
  return (
    <g>
      <circle className={styles.tube} cx={cx} cy={cy} r={r - 2.2} strokeWidth={4.4} />
      <circle className={styles.ink} cx={cx} cy={cy} r={motor ? 4.6 : 2} />
    </g>
  );
}

function CargoBike({ maskId }: { maskId: string }) {
  const rearX = 39;
  const frontX = 121;
  const r = 13.5;
  const cy = GROUND - r;

  return (
    <>
      <FatWheel cx={rearX} r={r} motor />
      <FatWheel cx={frontX} r={r} />
      <Fender cx={rearX} r={r} />
      <Fender cx={frontX} r={r} />

      {/* California-style shared delivery e-bike: step-through frame with front basket and rear battery enclosure. */}
      <path className={styles.tube} strokeWidth={7.2} strokeLinecap="round" d="M101 31 Q92 49 70 51" />
      <path className={styles.tube} strokeWidth={3.8} strokeLinecap="round" d={`M${rearX} ${cy} L70 51 M48 35 L70 51 M48 35 L61 29`} />
      <path className={styles.tube} strokeWidth={4.2} strokeLinecap="round" d={`M101 31 L106 20 M102 31 L${frontX} ${cy}`} />
      <path className={styles.tube} strokeWidth={3} strokeLinecap="round" d="M106 20 L104 12 L96 11.5" />

      {/* Rear battery / cargo enclosure, kept neutral to match the rest of the Qalt artwork. */}
      <Masked id={maskId} cuts="M28 31 L57 31">
        <path className={styles.ink} d="M26 27 Q26 24.5 29 24.5 L56 24.5 Q59 24.5 59 27 L57 40 Q56.5 43 53.5 43 L31 43 Q28 43 27.5 40 Z" />
      </Masked>

      {/* Front basket mounted high, similar to common shared delivery bikes used in California. */}
      <Masked id={`${maskId}-basket`} cuts="M108 20 L137 20 M109 26 L136 26 M115 15 L115 31 M123 15 L123 31 M131 15 L131 31">
        <path className={styles.ink} d="M106 13.5 L139 13.5 Q141 13.5 140.5 15.5 L138.5 31 Q138 33 136 33 L110 33 Q108 33 107.5 31 L105 15.5 Q104.5 13.5 106 13.5 Z" />
      </Masked>

      {/* Saddle, crank, rack and small lamp details. */}
      <path className={styles.ink} d="M50 20 Q50 17.5 53 17.5 L65 17.5 Q68 17.5 67.2 20 L66.5 22 L52 22 Q50 22 50 20 Z" />
      <path className={styles.tube} strokeWidth={2.4} d="M29 26 L56 26 M29 26 L27 30" />
      <circle className={styles.tube} cx={70} cy={51} r={4.1} strokeWidth={2.2} />
      <rect className={styles.lamp} x={137.5} y={34.5} width={3.2} height={2.8} rx={0.7} />
      <rect className={styles.lamp} x={25.5} y={29.5} width={2.8} height={2.6} rx={0.7} />
    </>
  );
}

/** Shared e-bike in the Lime / Bird mold: step-through, battery downtube, fenders, basket. */
function EBike({ maskId }: { maskId: string }) {
  const ry = GROUND - 13.5;
  return (
    <>
      <FatWheel cx={38} r={13.5} motor />
      <FatWheel cx={122} r={13.5} />
      <Fender cx={38} r={13.5} />
      <Fender cx={122} r={13.5} />
      {/* Battery downtube: one thick sweep from the head tube to the bottom bracket. */}
      <path className={styles.tube} strokeWidth={7.5} d="M103.5 31 Q93 51.5 70 51.5" />
      <path className={styles.tube} strokeWidth={3.4} d={`M38 ${ry} L70 51.5 M38 ${ry} L63.5 33`} />
      <path className={styles.tube} strokeWidth={4.6} d="M70 51.5 L62 26" />
      <path className={styles.tube} strokeWidth={4.4} d={`M104 31 L106.5 21.5 M105 30 L122 ${ry}`} />
      <path className={styles.tube} strokeWidth={3.2} d="M106.5 21.5 L104.5 12.5 L97 12" />
      <path className={styles.ink} d="M51.5 21.5 Q51.5 18.5 55 18.5 L68 18.5 Q71.5 18.5 70.8 21.5 L70 24 L53 24.5 Q51.5 24.5 51.5 21.5 Z" />
      <Masked id={maskId} cuts="M109.5 20.5 L127.5 20.5 M110 25 L127 25 M115.5 16 L115.8 29 M121.5 16 L121.2 29">
        <path className={styles.ink} d="M108 15 L129 15 Q130.4 15 130.2 16.4 L128.4 28.6 Q128.2 30 126.8 30 L110.2 30 Q108.8 30 108.6 28.6 L106.8 16.4 Q106.6 15 108 15 Z" />
      </Masked>
      {/* Charge indicator on the battery: lights in the merchant color when selected. */}
      <rect className={styles.lamp} x={86} y={44.5} width={6} height={2.4} rx={1} transform="rotate(-38 89 45.7)" />
      <rect className={styles.lamp} x={108} y={31.5} width={3.4} height={3} rx={0.8} />
    </>
  );
}

/** Stand-up shared e-scooter in the Bird / Lime mold. */
function EScooter() {
  return (
    <>
      <Tire cx={42} r={8} />
      <Tire cx={124} r={8} />
      {/* Deck (the battery lives here), rear fender, raked stem, T-bar. */}
      <path className={styles.ink} d="M38 49.5 L114 49.5 Q118.5 49.5 118.5 53 L117 55.5 L41 55.5 Q37.5 55.5 37.5 52.5 Z" />
      <path className={styles.ink} d="M29.5 53 Q31 44 41.5 44 Q50 44 52 49.5 L47.5 49.5 Q45.5 47.2 41.5 47.2 Q35 47.2 33.5 53 Z" />
      <path className={styles.tube} strokeWidth={4.6} d="M117.5 51 L111 12" />
      <path className={styles.tube} strokeWidth={4} d="M117.5 50.5 L124 56" />
      <path className={styles.tube} strokeWidth={3.4} d="M102.5 11.5 L119.5 11.5" />
      <rect className={styles.ink} x={107} y={8} width={8} height={4.5} rx={1.4} />
      <rect className={styles.lamp} x={112.2} y={25} width={3.6} height={3} rx={0.8} />
      <rect className={styles.lamp} x={28.5} y={48.5} width={2.8} height={3} rx={0.6} />
    </>
  );
}

function Scooter({ maskId }: { maskId: string }) {
  return (
    <>
      <Tire cx={40} r={9.5} />
      <Tire cx={116} r={9.5} />
      {/* Step-through moped: rounded rear cowl, low floorboard, tall leg shield. */}
      <Masked id={maskId} cuts="M36.5 30.6 L64.5 30.6 M30 45 Q34 40.5 42 40.5 L50 40.5">
        <path
          className={styles.ink}
          d="M26 50 Q21 38 30 32.5 Q34 30.5 40 30.5 L66 30.5 Q70 30.5 71 34 L73 44 L98 44 L103.5 20 Q104.5 17 107.5 17 L110 17 L109 24 Q108 32 111 36 Q117 39 122 45 L119.5 47.5 Q113 43.5 107 44.5 L104.5 49.5 Q101 51.5 96 51.5 L34 52 Q28 52 26 50 Z"
        />
        <path className={styles.ink} d="M36 30.5 L34 27.5 Q34 25 37 25 L63 25 Q66 25 66 27.5 L65 30.5 Z" />
      </Masked>
      <path className={styles.tube} strokeWidth={3} d="M102.5 15.5 L117 13.5" />
      <path className={styles.tube} strokeWidth={2.2} d="M106.5 16 L108 12" />
      <rect className={styles.lamp} x={109.5} y={19} width={3.4} height={3.4} rx={1.2} />
      <rect className={styles.lamp} x={23.5} y={38} width={3} height={3} rx={0.8} />
    </>
  );
}

function Motorcycle({ maskId }: { maskId: string }) {
  return (
    <>
      <Tire cx={38} r={13.5} />
      <Tire cx={124} r={13.5} />
      <path className={styles.tube} strokeWidth={4.2} d="M38 50.5 L66 42" />
      <path className={styles.tube} strokeWidth={4.2} d="M107 22 L124 50.5" />
      <path className={styles.ink} d="M28 34.5 Q30 31 36 31 L74 30 L74 35.5 L46 37.5 Q34 38.5 28 34.5 Z" />
      <path className={styles.ink} d="M71 30.5 Q72 21.5 86 21.5 L99 22.5 Q105 23.5 103 30 L100 34 L73 35.5 Z" />
      <Masked id={maskId} cuts="M72 38.5 L93 38 M72 42.5 L93 42 M72 46.5 L92 46">
        <path className={styles.ink} d="M66 35 L96 34 Q99 34 99 37 L98 47 Q97.5 49.5 95 49.5 L70 49.5 Q66 49.5 66 46 Z" />
      </Masked>
      <path className={styles.tube} strokeWidth={3.2} d="M88 50 L46 46.5" />
      <path className={styles.tube} strokeWidth={3} d="M103 22 L111 15 L118 15.5" />
      <circle className={styles.ink} cx={113} cy={27.5} r={4.6} />
      <circle className={styles.lamp} cx={114.5} cy={27.5} r={2.4} />
      <rect className={styles.lamp} x={27} y={31.5} width={3.2} height={2.8} rx={0.8} />
    </>
  );
}

function MotorVehicle({ kind, uid }: { kind: keyof typeof VEHICLES; uid: string }) {
  const v = VEHICLES[kind];
  return (
    <>
      <defs>
        {/* Body: lighter toward the roof, darker along the sill. */}
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.bodyHi} />
          <stop offset="0.55" className={styles.bodyMid} />
          <stop offset="1" className={styles.bodyLo} />
        </linearGradient>
        <linearGradient id={`${uid}-sheen`} gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="100" y2="72">
          <stop offset="0.3" className={styles.sheenOff} />
          <stop offset="0.48" className={styles.sheenOn} />
          <stop offset="0.66" className={styles.sheenOff} />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className={styles.glassHi} />
          <stop offset="0.45" className={styles.glassMid} />
          <stop offset="1" className={styles.glassLo} />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          {v.body.map((d, i) => <path key={i} d={d} />)}
        </clipPath>
      </defs>
      <mask id={`${uid}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="72">
        <rect width="160" height="72" fill="#fff" />
        {v.cut?.map((d, i) => <path key={i} d={d} fill="#000" />)}
        {v.seams?.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#000" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {/* Arch gap around each tire. */}
        {v.wheels.map(([cx, r], i) => <circle key={i} cx={cx} cy={GROUND - r} r={r + 2.2} fill="#000" />)}
      </mask>
      <g mask={`url(#${uid}-mask)`}>
        {v.body.map((d, i) => <path key={i} d={d} fill={`url(#${uid}-body)`} />)}
        <rect clipPath={`url(#${uid}-clip)`} width="160" height="72" fill={`url(#${uid}-sheen)`} />
        {v.glass?.map((d, i) => <path key={i} d={d} fill={`url(#${uid}-glass)`} />)}
      </g>
      {v.wheels.map(([cx, r], i) => <Tire key={i} cx={cx} r={r} />)}
      {v.lamps?.map(([x, y, w, h], i) => <rect key={i} className={styles.lamp} x={x} y={y} width={w} height={h} rx={0.8} />)}
    </>
  );
}

export default function VehicleArtwork({
  name,
  artwork,
  selected = false,
  brandColor,
  className,
}: {
  name: string;
  artwork?: VehicleArtworkKey;
  selected?: boolean;
  brandColor?: string;
  className?: string;
}) {
  // Validate even typed input: saved JSON can predate or drift from the key list.
  const kind = parseVehicleArtworkKey(artwork) ?? inferVehicleArtwork(name);
  const maskId = `qv-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const style = selected && brandColor
    ? ({ "--vehicle-lamp": brandColor, "--vehicle-brand": brandColor } as CSSProperties)
    : undefined;

  return (
    <svg
      className={`${styles.art}${selected ? ` ${styles.selected}` : ""}${className ? ` ${className}` : ""}`}
      style={style}
      viewBox="0 0 160 72"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${maskId}-road`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className={styles.roadOff} />
          <stop offset="0.2" className={styles.roadOn} />
          <stop offset="0.8" className={styles.roadOn} />
          <stop offset="1" className={styles.roadOff} />
        </linearGradient>
      </defs>
      {kind !== "bicycle" && kind !== "cargo-bike" && (
        <rect x="4" y={GROUND - 0.6} width="152" height="2.6" rx="1.3" fill={`url(#${maskId}-road)`} />
      )}
      {kind === "bicycle" && <image className={styles.photoVehicle} href="/images/vehicles/bicycle.webp" x="0" y="0" width="160" height="72" preserveAspectRatio="xMidYMid meet" />}
      {kind === "cargo-bike" && <image className={styles.photoVehicle} href="/images/vehicles/cargo-bike.webp" x="0" y="0" width="160" height="72" preserveAspectRatio="xMidYMid meet" />}
      {kind === "e-bike" && <EBike maskId={maskId} />}
      {kind === "e-scooter" && <EScooter />}
      {kind === "scooter" && <Scooter maskId={maskId} />}
      {kind === "motorcycle" && <Motorcycle maskId={maskId} />}
      {kind in VEHICLES && <MotorVehicle kind={kind as keyof typeof VEHICLES} uid={maskId} />}
    </svg>
  );
}
