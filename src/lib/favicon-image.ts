import sharp from "sharp";

/** Keep the complete artwork, preserve transparency, and remove embedded metadata. */
export async function normalizeFaviconImage(bytes: Uint8Array): Promise<Buffer> {
  return sharp(Buffer.from(bytes), { limitInputPixels: 25_000_000, animated: false })
    .rotate()
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}
