-- Additive: immutable customer documents (Quote / Invoice) with tenant-scoped,
-- concurrency-safe numbering. Creates two new tables plus their constraints and
-- indexes; no existing table or row is modified.

-- CreateTable
CREATE TABLE "CustomerDocument" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "quoteRequestId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "snapshot" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "publicTokenHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "lastEmailedAt" TIMESTAMP(3),
    "lastViewedAt" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "CustomerDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentSequence" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "nextNumber" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentSequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDocument_publicTokenHash_key" ON "CustomerDocument"("publicTokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDocument_companyId_number_key" ON "CustomerDocument"("companyId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDocument_quoteRequestId_type_key" ON "CustomerDocument"("quoteRequestId", "type");

-- CreateIndex
CREATE INDEX "CustomerDocument_companyId_quoteRequestId_idx" ON "CustomerDocument"("companyId", "quoteRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentSequence_companyId_year_type_key" ON "DocumentSequence"("companyId", "year", "type");

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
