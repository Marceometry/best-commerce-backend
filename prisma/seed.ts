import { PrismaClient } from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.purchase.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.address.deleteMany();
  await prisma.store.deleteMany();

  const { id: storeId } = await prisma.store.create({
    data: { name: faker.company.name() },
  });

  await prisma.address.create({
    data: {
      number: faker.location.buildingNumber(),
      street: faker.location.street(),
      neighborhood: faker.location.street(),
      complement: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
      storeId,
    },
  });

  const password = await bcrypt.hash('1234', 10);
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      password,
      storeId,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ dec: 0 })),
        storeId,
      },
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ dec: 0 })),
        storeId,
      },
    ],
  });

  await prisma.purchase.create({
    data: {
      product: {
        create: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: Number(faker.commerce.price({ dec: 0 })),
          storeId,
        },
      },
      user: {
        create: {
          name: faker.person.fullName(),
          username: faker.internet.userName(),
          password: await bcrypt.hash('5678', 10),
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
