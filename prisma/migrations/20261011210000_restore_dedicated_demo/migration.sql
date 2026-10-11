-- Restore only Qalt's dedicated public showroom tenant, whose ID is already
-- configured by DEMO_COMPANY_ID and next.config.ts. Never use a customer tenant.
-- Insert missing records only. Existing company, form and pricing data remain
-- untouched. The account is unverified with a disabled password and reserved
-- .invalid email; it cannot sign in and is excluded from public signup activity.
BEGIN;

INSERT INTO "Company" (
  "id", "email", "passwordHash", "name", "subscriptionPlan",
  "emailVerified", "registrationSource", "timezone", "onboardingStep"
) VALUES (
  'cmtjk5po0000004jzgud1ar9o', 'showroom@demo.qalt.invalid',
  '!disabled-demo-account', 'Northline Delivery Co. (Demo)', 'PRO',
  false, 'demo', 'America/Los_Angeles', 5
)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "WidgetSettings" (
  "id", "companyId", "name", "headerText", "primaryColor", "buttonText",
  "showWeight", "showItemCount", "showExtras", "disclaimerText",
  "companyNameText", "paymentsEnabled", "serviceZips"
)
SELECT
  'qalt-dedicated-demo-form', 'cmtjk5po0000004jzgud1ar9o', 'Live Demo',
  'Try an instant delivery quote', '#dc2626', 'Calculate Quote',
  true, true, true,
  'Sample courier pricing for demonstration. This is not a real delivery service.',
  'Northline Delivery Co. (Demo)', false, ARRAY[]::text[]
WHERE NOT EXISTS (
  SELECT 1 FROM "WidgetSettings" WHERE "companyId" = 'cmtjk5po0000004jzgud1ar9o'
);

INSERT INTO "PricingProfile" (
  "id", "companyId", "widgetSettingsId", "baseRatePerMile", "minimumCharge",
  "useMinimumCharge", "weightFee", "itemCountFee", "stairsFee",
  "insideDeliveryFee", "afterHoursFee", "businessHoursStart", "businessHoursEnd"
)
SELECT
  'qalt-dedicated-demo-pricing', 'cmtjk5po0000004jzgud1ar9o', NULL,
  2.50, 35.00, true, 0.25, 5.00, 10.00, 15.00, 25.00, '08:00', '18:00'
WHERE NOT EXISTS (
  SELECT 1 FROM "PricingProfile"
  WHERE "companyId" = 'cmtjk5po0000004jzgud1ar9o' AND "widgetSettingsId" IS NULL
);

-- Keep the public showroom available during routine account cleanup.
CREATE OR REPLACE FUNCTION protect_qalt_demo_delete() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF (TG_TABLE_NAME = 'Company' AND to_jsonb(OLD)->>'id' = 'cmtjk5po0000004jzgud1ar9o')
     OR (TG_TABLE_NAME <> 'Company' AND to_jsonb(OLD)->>'companyId' = 'cmtjk5po0000004jzgud1ar9o') THEN
    RAISE EXCEPTION 'The dedicated Qalt public demo cannot be deleted during account cleanup';
  END IF;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS protect_qalt_demo ON "Company";
CREATE TRIGGER protect_qalt_demo BEFORE DELETE ON "Company"
FOR EACH ROW EXECUTE FUNCTION protect_qalt_demo_delete();
DROP TRIGGER IF EXISTS protect_qalt_demo ON "WidgetSettings";
CREATE TRIGGER protect_qalt_demo BEFORE DELETE ON "WidgetSettings"
FOR EACH ROW EXECUTE FUNCTION protect_qalt_demo_delete();
DROP TRIGGER IF EXISTS protect_qalt_demo ON "PricingProfile";
CREATE TRIGGER protect_qalt_demo BEFORE DELETE ON "PricingProfile"
FOR EACH ROW EXECUTE FUNCTION protect_qalt_demo_delete();
COMMIT;
