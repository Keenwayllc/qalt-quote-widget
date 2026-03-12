-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingProfile" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "baseRatePerMile" DOUBLE PRECISION NOT NULL DEFAULT 2.50,
    "minimumCharge" DOUBLE PRECISION NOT NULL DEFAULT 35.00,
    "weightFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemCountFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stairsFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "insideDeliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "afterHoursFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "largeItemFee" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "PricingProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WidgetSettings" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "showWeight" BOOLEAN NOT NULL DEFAULT false,
    "showItemCount" BOOLEAN NOT NULL DEFAULT true,
    "showExtras" BOOLEAN NOT NULL DEFAULT true,
    "primaryColor" TEXT NOT NULL DEFAULT '#1E40AF',
    "buttonText" TEXT NOT NULL DEFAULT 'Get Instant Quote',
    "headerText" TEXT NOT NULL DEFAULT 'Delivery Quote Calculator',
    "disclaimerText" TEXT NOT NULL DEFAULT 'Estimate only. Final price confirmed after booking.',
    "backgroundImageUrl" TEXT,

    CONSTRAINT "WidgetSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "pickupZip" TEXT NOT NULL,
    "dropoffZip" TEXT NOT NULL,
    "distanceMiles" DOUBLE PRECISION NOT NULL,
    "serviceType" TEXT NOT NULL,
    "packageSize" TEXT,
    "packageWeight" TEXT,
    "selectedExtras" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "estimatedPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PricingProfile_companyId_key" ON "PricingProfile"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "WidgetSettings_companyId_key" ON "WidgetSettings"("companyId");

-- AddForeignKey
ALTER TABLE "PricingProfile" ADD CONSTRAINT "PricingProfile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetSettings" ADD CONSTRAINT "WidgetSettings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
