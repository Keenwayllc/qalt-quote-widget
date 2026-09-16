import prisma from "@/lib/prisma";

export type WidgetThemeMode = "light" | "dark";

let schemaReady = false;

async function ensureWidgetThemeSchema() {
  if (schemaReady) return;

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "WidgetSettings"
    ADD COLUMN IF NOT EXISTS "themeMode" TEXT NOT NULL DEFAULT 'light'
  `);

  schemaReady = true;
}

function normalizeTheme(value: unknown): WidgetThemeMode {
  return value === "dark" ? "dark" : "light";
}

export async function getWidgetTheme(widgetSettingsId: string): Promise<WidgetThemeMode> {
  await ensureWidgetThemeSchema();

  const rows = await prisma.$queryRaw<Array<{ themeMode: string }>>`
    SELECT "themeMode"
    FROM "WidgetSettings"
    WHERE "id" = ${widgetSettingsId}
    LIMIT 1
  `;

  return normalizeTheme(rows[0]?.themeMode);
}

export async function setWidgetTheme(
  widgetSettingsId: string,
  themeMode: WidgetThemeMode
): Promise<WidgetThemeMode> {
  await ensureWidgetThemeSchema();
  const normalized = normalizeTheme(themeMode);

  await prisma.$executeRaw`
    UPDATE "WidgetSettings"
    SET "themeMode" = ${normalized}
    WHERE "id" = ${widgetSettingsId}
  `;

  return normalized;
}
