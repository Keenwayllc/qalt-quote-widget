-- Supabase advisor 0013 (rls_disabled_in_public): these tables were reachable
-- through the Data API with the public anon key (verified 2026-10-04).
-- No policies are added, so anon/authenticated see nothing. The app connects
-- as the table owner "postgres" (BYPASSRLS) through Prisma and is unaffected.
-- Not FORCE: the owner must keep bypassing RLS.
-- IF EXISTS marks tables the app creates at runtime (growth-engine,
-- integration-auth, abandoned-quotes), which a fresh database may lack.
ALTER TABLE IF EXISTS "AbandonedQuote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DocumentSequence" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CustomerDocument" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "QuoteFollowUp" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "QuoteBooking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "PricingRule" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VehicleRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AppError" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "IntegrationAuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WidgetInstallation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "IntegrationConnection" ENABLE ROW LEVEL SECURITY;
