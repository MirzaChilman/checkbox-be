import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.vessel.create({
      data: {
        name: `Vessel ${i + 1}`,
        ownerId: `owner${i + 1}`,
        naccsCode: `NACCS0${characters[i + 1]}`,
      },
    });
  }

  for (let i = 0; i < 10; i++) {
    await prisma.voyage.create({
      data: {
        vesselId: i + 1,
        origin: `Port ${characters[i]}`,
        destination: `Port ${characters[i + 1]}`,
        startTime: new Date('2023-04-20T00:00:00Z'),
        endTime: new Date('2023-04-22T00:00:00Z'),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
