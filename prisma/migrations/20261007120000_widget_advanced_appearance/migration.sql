-- Enterprise "Advanced appearance" tokens per form. Additive and idempotent:
-- null keeps every existing form on its basic theme.
ALTER TABLE "WidgetSettings" ADD COLUMN IF NOT EXISTS "advancedAppearance" JSONB;
