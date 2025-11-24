import { PrismaClient } from '@prisma/client';
import { seedStaticDashboard } from './staticDashboard';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  await seedStaticDashboard(prisma);
  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

