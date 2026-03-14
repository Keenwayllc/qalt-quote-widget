
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.findFirst();
  if (company) {
    console.log(`FOUND_ID:${company.id}`);
  } else {
    console.log('NO_COMPANY_FOUND');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
