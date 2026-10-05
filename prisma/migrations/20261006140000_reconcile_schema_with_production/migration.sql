-- Rebuilds production's schema on a database created only from migrations.
-- Production was partly shaped outside migrations (db push and runtime
-- CREATE TABLE in growth-engine, integration-auth, abandoned-quotes).
-- Generated from production's catalog on 2026-10-04. Every statement is
-- guarded, so on production it changes nothing and takes no table locks.

-- Tables that production has but no migration created.
CREATE TABLE IF NOT EXISTS "ExceptionLog" (
    "id" text NOT NULL,
    "jobId" text,
    "notes" text,
    "stopNoteId" text,
    "timestamp" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "IntegrationAuditLog" (
    "action" text NOT NULL,
    "companyId" text NOT NULL,
    "connectionId" text,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text NOT NULL,
    "metadata" jsonb,
    "resource" text
);
CREATE TABLE IF NOT EXISTS "IntegrationConnection" (
    "companyId" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text NOT NULL,
    "lastUsedAt" timestamp(3) without time zone,
    "name" text NOT NULL,
    "provider" text NOT NULL DEFAULT 'CUSTOM'::text,
    "revokedAt" timestamp(3) without time zone,
    "scopes" text[] NOT NULL DEFAULT ARRAY['quotes:read'::text, 'analytics:read'::text],
    "tokenHash" text NOT NULL,
    "tokenPrefix" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "Job" (
    "companyId" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text NOT NULL,
    "quoteRequestId" text,
    "scheduledDate" timestamp(3) without time zone NOT NULL,
    "status" text NOT NULL DEFAULT 'PENDING'::text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
CREATE TABLE IF NOT EXISTS "JobStop" (
    "id" text NOT NULL,
    "jobId" text NOT NULL,
    "order" integer NOT NULL DEFAULT 0,
    "stopNoteId" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "PartnerInquiry" (
    "companyName" text NOT NULL,
    "contactName" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" text NOT NULL,
    "id" text NOT NULL,
    "message" text NOT NULL,
    "partnershipType" text NOT NULL,
    "status" text NOT NULL DEFAULT 'NEW'::text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "website" text
);
CREATE TABLE IF NOT EXISTS "PricingRule" (
    "active" boolean NOT NULL DEFAULT true,
    "adjustmentType" text NOT NULL,
    "amount" double precision NOT NULL DEFAULT 0,
    "companyId" text NOT NULL,
    "conditionType" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text NOT NULL,
    "name" text NOT NULL,
    "threshold" double precision NOT NULL DEFAULT 0,
    "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "QuoteBooking" (
    "companyId" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driverName" text,
    "id" text NOT NULL,
    "notes" text,
    "quoteRequestId" text NOT NULL,
    "scheduledDate" timestamp(3) without time zone,
    "status" text NOT NULL DEFAULT 'UNSCHEDULED'::text,
    "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicle" text
);
CREATE TABLE IF NOT EXISTS "QuoteFollowUp" (
    "companyId" text NOT NULL,
    "id" text NOT NULL,
    "kind" text NOT NULL,
    "quoteRequestId" text NOT NULL,
    "sentAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "ReadinessCheck" (
    "accessConfirmed" boolean NOT NULL DEFAULT false,
    "addressConfirmed" boolean NOT NULL DEFAULT false,
    "contactConfirmed" boolean NOT NULL DEFAULT false,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text NOT NULL,
    "jobId" text,
    "notes" text,
    "scheduledDate" timestamp(3) without time zone NOT NULL,
    "siteReady" boolean NOT NULL DEFAULT false,
    "status" text NOT NULL DEFAULT 'NEEDS_REVIEW'::text,
    "stopNoteId" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "ShopifyInstall" (
    "accessToken" text NOT NULL,
    "companyId" text,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text NOT NULL,
    "scriptTagId" text,
    "shop" text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
CREATE TABLE IF NOT EXISTS "StopNote" (
    "accessNotes" text,
    "address" text NOT NULL,
    "companyId" text NOT NULL,
    "companyName" text NOT NULL,
    "contactName" text,
    "contactPhone" text,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryNotes" text,
    "dockInfo" text,
    "gateCode" text,
    "hours" text,
    "id" text NOT NULL,
    "parkingNotes" text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
CREATE TABLE IF NOT EXISTS "Webhook" (
    "companyId" text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" boolean NOT NULL DEFAULT true,
    "events" text[],
    "id" text NOT NULL,
    "secret" text NOT NULL,
    "url" text NOT NULL
);

-- Columns added to production outside migrations.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'address') THEN
    ALTER TABLE "Company" ADD COLUMN "address" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'city') THEN
    ALTER TABLE "Company" ADD COLUMN "city" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'contactName') THEN
    ALTER TABLE "Company" ADD COLUMN "contactName" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'customEmailDomain') THEN
    ALTER TABLE "Company" ADD COLUMN "customEmailDomain" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'customEmailFromName') THEN
    ALTER TABLE "Company" ADD COLUMN "customEmailFromName" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'emailDomainDnsRecords') THEN
    ALTER TABLE "Company" ADD COLUMN "emailDomainDnsRecords" jsonb;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'emailDomainVerified') THEN
    ALTER TABLE "Company" ADD COLUMN "emailDomainVerified" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'emailVerificationToken') THEN
    ALTER TABLE "Company" ADD COLUMN "emailVerificationToken" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'emailVerified') THEN
    ALTER TABLE "Company" ADD COLUMN "emailVerified" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'isAdmin') THEN
    ALTER TABLE "Company" ADD COLUMN "isAdmin" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'isSuperAdmin') THEN
    ALTER TABLE "Company" ADD COLUMN "isSuperAdmin" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'lastLoginAt') THEN
    ALTER TABLE "Company" ADD COLUMN "lastLoginAt" timestamp without time zone;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'phone') THEN
    ALTER TABLE "Company" ADD COLUMN "phone" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'profilePicUrl') THEN
    ALTER TABLE "Company" ADD COLUMN "profilePicUrl" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'resendDomainId') THEN
    ALTER TABLE "Company" ADD COLUMN "resendDomainId" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'state') THEN
    ALTER TABLE "Company" ADD COLUMN "state" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'stripeConnectAccountId') THEN
    ALTER TABLE "Company" ADD COLUMN "stripeConnectAccountId" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'stripeCustomerId') THEN
    ALTER TABLE "Company" ADD COLUMN "stripeCustomerId" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'stripeSubscriptionId') THEN
    ALTER TABLE "Company" ADD COLUMN "stripeSubscriptionId" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'subscriptionPlan') THEN
    ALTER TABLE "Company" ADD COLUMN "subscriptionPlan" text NOT NULL DEFAULT 'STARTER'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'trialEndsAt') THEN
    ALTER TABLE "Company" ADD COLUMN "trialEndsAt" timestamp(3) without time zone;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'website') THEN
    ALTER TABLE "Company" ADD COLUMN "website" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Company' AND column_name = 'zip') THEN
    ALTER TABLE "Company" ADD COLUMN "zip" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'businessDays') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "businessDays" text NOT NULL DEFAULT '1,2,3,4,5'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'businessHoursEnd') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "businessHoursEnd" text NOT NULL DEFAULT '18:00'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'businessHoursStart') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "businessHoursStart" text NOT NULL DEFAULT '08:00'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'largeItemCategories') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "largeItemCategories" jsonb NOT NULL DEFAULT '[]'::jsonb;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'largeItemsEnabled') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "largeItemsEnabled" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'minMilesThreshold') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "minMilesThreshold" double precision NOT NULL DEFAULT 0;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'useMinimumCharge') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "useMinimumCharge" boolean NOT NULL DEFAULT true;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'PricingProfile' AND column_name = 'widgetSettingsId') THEN
    ALTER TABLE "PricingProfile" ADD COLUMN "widgetSettingsId" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'QuoteRequest' AND column_name = 'awbNumber') THEN
    ALTER TABLE "QuoteRequest" ADD COLUMN "awbNumber" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'QuoteRequest' AND column_name = 'internalNotes') THEN
    ALTER TABLE "QuoteRequest" ADD COLUMN "internalNotes" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'QuoteRequest' AND column_name = 'paidAt') THEN
    ALTER TABLE "QuoteRequest" ADD COLUMN "paidAt" timestamp(3) without time zone;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'QuoteRequest' AND column_name = 'paymentStatus') THEN
    ALTER TABLE "QuoteRequest" ADD COLUMN "paymentStatus" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'QuoteRequest' AND column_name = 'stripePaymentIntentId') THEN
    ALTER TABLE "QuoteRequest" ADD COLUMN "stripePaymentIntentId" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'QuoteRequest' AND column_name = 'vehicleCount') THEN
    ALTER TABLE "QuoteRequest" ADD COLUMN "vehicleCount" integer;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'companyNameFont') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "companyNameFont" text NOT NULL DEFAULT 'Inter'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'companyNameText') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "companyNameText" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'geoFencingEnabled') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "geoFencingEnabled" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'insideDeliveryLabel') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "insideDeliveryLabel" text NOT NULL DEFAULT 'Inside Delivery'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'logoUrl') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "logoUrl" text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'mapLayout') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "mapLayout" text NOT NULL DEFAULT 'inline'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'name') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "name" text NOT NULL DEFAULT 'Default Form'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'paymentsEnabled') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "paymentsEnabled" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'pricePerVehicle') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "pricePerVehicle" double precision NOT NULL DEFAULT 0;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'serviceZips') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "serviceZips" text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'showAwb') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "showAwb" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'showVehicles') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "showVehicles" boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'themeMode') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "themeMode" text NOT NULL DEFAULT 'light'::text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'WidgetSettings' AND column_name = 'websiteUrl') THEN
    ALTER TABLE "WidgetSettings" ADD COLUMN "websiteUrl" text;
  END IF;
END $$;

-- Keys and foreign keys (primary keys first, so references resolve).
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ExceptionLog_pkey' AND conrelid = '"ExceptionLog"'::regclass) THEN
    ALTER TABLE "ExceptionLog" ADD CONSTRAINT "ExceptionLog_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'IntegrationAuditLog_pkey' AND conrelid = '"IntegrationAuditLog"'::regclass) THEN
    ALTER TABLE "IntegrationAuditLog" ADD CONSTRAINT "IntegrationAuditLog_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'IntegrationConnection_pkey' AND conrelid = '"IntegrationConnection"'::regclass) THEN
    ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Job_pkey' AND conrelid = '"Job"'::regclass) THEN
    ALTER TABLE "Job" ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'JobStop_pkey' AND conrelid = '"JobStop"'::regclass) THEN
    ALTER TABLE "JobStop" ADD CONSTRAINT "JobStop_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PartnerInquiry_pkey' AND conrelid = '"PartnerInquiry"'::regclass) THEN
    ALTER TABLE "PartnerInquiry" ADD CONSTRAINT "PartnerInquiry_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PricingRule_pkey' AND conrelid = '"PricingRule"'::regclass) THEN
    ALTER TABLE "PricingRule" ADD CONSTRAINT "PricingRule_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'QuoteBooking_pkey' AND conrelid = '"QuoteBooking"'::regclass) THEN
    ALTER TABLE "QuoteBooking" ADD CONSTRAINT "QuoteBooking_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'QuoteFollowUp_pkey' AND conrelid = '"QuoteFollowUp"'::regclass) THEN
    ALTER TABLE "QuoteFollowUp" ADD CONSTRAINT "QuoteFollowUp_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ReadinessCheck_pkey' AND conrelid = '"ReadinessCheck"'::regclass) THEN
    ALTER TABLE "ReadinessCheck" ADD CONSTRAINT "ReadinessCheck_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ShopifyInstall_pkey' AND conrelid = '"ShopifyInstall"'::regclass) THEN
    ALTER TABLE "ShopifyInstall" ADD CONSTRAINT "ShopifyInstall_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'StopNote_pkey' AND conrelid = '"StopNote"'::regclass) THEN
    ALTER TABLE "StopNote" ADD CONSTRAINT "StopNote_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Webhook_pkey' AND conrelid = '"Webhook"'::regclass) THEN
    ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_pkey" PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'IntegrationConnection_tokenHash_key' AND conrelid = '"IntegrationConnection"'::regclass) THEN
    ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_tokenHash_key" UNIQUE ("tokenHash");
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'QuoteBooking_quoteRequestId_key' AND conrelid = '"QuoteBooking"'::regclass) THEN
    ALTER TABLE "QuoteBooking" ADD CONSTRAINT "QuoteBooking_quoteRequestId_key" UNIQUE ("quoteRequestId");
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ExceptionLog_jobId_fkey' AND conrelid = '"ExceptionLog"'::regclass) THEN
    ALTER TABLE "ExceptionLog" ADD CONSTRAINT "ExceptionLog_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ExceptionLog_stopNoteId_fkey' AND conrelid = '"ExceptionLog"'::regclass) THEN
    ALTER TABLE "ExceptionLog" ADD CONSTRAINT "ExceptionLog_stopNoteId_fkey" FOREIGN KEY ("stopNoteId") REFERENCES "StopNote"(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Job_companyId_fkey' AND conrelid = '"Job"'::regclass) THEN
    ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Job_quoteRequestId_fkey' AND conrelid = '"Job"'::regclass) THEN
    ALTER TABLE "Job" ADD CONSTRAINT "Job_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'JobStop_jobId_fkey' AND conrelid = '"JobStop"'::regclass) THEN
    ALTER TABLE "JobStop" ADD CONSTRAINT "JobStop_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'JobStop_stopNoteId_fkey' AND conrelid = '"JobStop"'::regclass) THEN
    ALTER TABLE "JobStop" ADD CONSTRAINT "JobStop_stopNoteId_fkey" FOREIGN KEY ("stopNoteId") REFERENCES "StopNote"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PricingProfile_widgetSettingsId_fkey' AND conrelid = '"PricingProfile"'::regclass) THEN
    ALTER TABLE "PricingProfile" ADD CONSTRAINT "PricingProfile_widgetSettingsId_fkey" FOREIGN KEY ("widgetSettingsId") REFERENCES "WidgetSettings"(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PricingRule_companyId_fkey' AND conrelid = '"PricingRule"'::regclass) THEN
    ALTER TABLE "PricingRule" ADD CONSTRAINT "PricingRule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'QuoteBooking_companyId_fkey' AND conrelid = '"QuoteBooking"'::regclass) THEN
    ALTER TABLE "QuoteBooking" ADD CONSTRAINT "QuoteBooking_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'QuoteBooking_quoteRequestId_fkey' AND conrelid = '"QuoteBooking"'::regclass) THEN
    ALTER TABLE "QuoteBooking" ADD CONSTRAINT "QuoteBooking_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'QuoteFollowUp_companyId_fkey' AND conrelid = '"QuoteFollowUp"'::regclass) THEN
    ALTER TABLE "QuoteFollowUp" ADD CONSTRAINT "QuoteFollowUp_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'QuoteFollowUp_quoteRequestId_fkey' AND conrelid = '"QuoteFollowUp"'::regclass) THEN
    ALTER TABLE "QuoteFollowUp" ADD CONSTRAINT "QuoteFollowUp_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ReadinessCheck_jobId_fkey' AND conrelid = '"ReadinessCheck"'::regclass) THEN
    ALTER TABLE "ReadinessCheck" ADD CONSTRAINT "ReadinessCheck_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ReadinessCheck_stopNoteId_fkey' AND conrelid = '"ReadinessCheck"'::regclass) THEN
    ALTER TABLE "ReadinessCheck" ADD CONSTRAINT "ReadinessCheck_stopNoteId_fkey" FOREIGN KEY ("stopNoteId") REFERENCES "StopNote"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ShopifyInstall_companyId_fkey' AND conrelid = '"ShopifyInstall"'::regclass) THEN
    ALTER TABLE "ShopifyInstall" ADD CONSTRAINT "ShopifyInstall_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'StopNote_companyId_fkey' AND conrelid = '"StopNote"'::regclass) THEN
    ALTER TABLE "StopNote" ADD CONSTRAINT "StopNote_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Webhook_companyId_fkey' AND conrelid = '"Webhook"'::regclass) THEN
    ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
  END IF;
END $$;

-- Indexes (those backing constraints are created above).
DO $$ BEGIN
  IF to_regclass('public."IntegrationAuditLog_companyId_createdAt_idx"') IS NULL THEN
    EXECUTE 'CREATE INDEX "IntegrationAuditLog_companyId_createdAt_idx" ON public."IntegrationAuditLog" USING btree ("companyId", "createdAt" DESC)';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."IntegrationConnection_companyId_idx"') IS NULL THEN
    EXECUTE 'CREATE INDEX "IntegrationConnection_companyId_idx" ON public."IntegrationConnection" USING btree ("companyId")';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."PricingRule_company_active_idx"') IS NULL THEN
    EXECUTE 'CREATE INDEX "PricingRule_company_active_idx" ON public."PricingRule" USING btree ("companyId", active)';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."QuoteBooking_company_status_idx"') IS NULL THEN
    EXECUTE 'CREATE INDEX "QuoteBooking_company_status_idx" ON public."QuoteBooking" USING btree ("companyId", status)';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."Company_email_lower_key"') IS NULL THEN
    EXECUTE 'CREATE UNIQUE INDEX "Company_email_lower_key" ON public."Company" USING btree (lower(email))';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."Company_emailVerificationToken_key"') IS NULL THEN
    EXECUTE 'CREATE UNIQUE INDEX "Company_emailVerificationToken_key" ON public."Company" USING btree ("emailVerificationToken")';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."PricingProfile_widgetSettingsId_key"') IS NULL THEN
    EXECUTE 'CREATE UNIQUE INDEX "PricingProfile_widgetSettingsId_key" ON public."PricingProfile" USING btree ("widgetSettingsId")';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."QuoteFollowUp_quote_kind_key"') IS NULL THEN
    EXECUTE 'CREATE UNIQUE INDEX "QuoteFollowUp_quote_kind_key" ON public."QuoteFollowUp" USING btree ("quoteRequestId", kind)';
  END IF;
END $$;
DO $$ BEGIN
  IF to_regclass('public."ShopifyInstall_shop_key"') IS NULL THEN
    EXECUTE 'CREATE UNIQUE INDEX "ShopifyInstall_shop_key" ON public."ShopifyInstall" USING btree (shop)';
  END IF;
END $$;

-- Production dropped these one-form-per-company unique indexes for multi-form support.
DROP INDEX IF EXISTS "PricingProfile_companyId_key";
DROP INDEX IF EXISTS "WidgetSettings_companyId_key";

-- Row level security as in production (no policies; the app owner role bypasses RLS).
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['Company', 'ExceptionLog', 'IntegrationAuditLog', 'IntegrationConnection', 'Job', 'JobStop', 'PartnerInquiry', 'PricingProfile', 'PricingRule', 'QuoteBooking', 'QuoteFollowUp', 'QuoteRequest', 'ReadinessCheck', 'ShopifyInstall', 'StopNote', 'Webhook', 'WidgetSettings', '_prisma_migrations'] LOOP
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = t AND relnamespace = 'public'::regnamespace AND NOT relrowsecurity) THEN
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    END IF;
  END LOOP;
END $$;
