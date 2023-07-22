import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.task.create({
      data: {
        id: i + 1,
        name: faker.person.fullName(),
        description: faker.word.words(),
        dueDate: faker.date.anytime(),
        createDate: faker.date.anytime(),
        status: 'DUE_SOON',
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
