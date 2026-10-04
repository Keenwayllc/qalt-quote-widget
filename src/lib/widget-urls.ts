/** Public merchant links and images must never execute active URL schemes. */
export function safeWidgetUrl(value: unknown, image = false): string | null {
  if (typeof value !== "string" || value.length > 2048 || /[\u0000-\u001f\u007f]/.test(value)) return null;
  const text = value.trim();
  if (image && /^\/(?![\/\\])/.test(text) && !text.includes("\\")) return text;
  try {
    const url = new URL(text);
    if (url.protocol !== "https:" || url.username || url.password || !url.hostname) return null;
    return url.href;
  } catch { return null; }
}
