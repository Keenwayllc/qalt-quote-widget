const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Running migration: add new PricingProfile columns...");

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "PricingProfile"
    ADD COLUMN IF NOT EXISTS "businessHoursStart" TEXT NOT NULL DEFAULT '08:00',
    ADD COLUMN IF NOT EXISTS "businessHoursEnd"   TEXT NOT NULL DEFAULT '18:00',
    ADD COLUMN IF NOT EXISTS "businessDays"        TEXT NOT NULL DEFAULT '1,2,3,4,5',
    ADD COLUMN IF NOT EXISTS "largeItemsEnabled"   BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS "largeItemCategories" JSONB NOT NULL DEFAULT '[]'
  `);

  console.log("Migration complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
