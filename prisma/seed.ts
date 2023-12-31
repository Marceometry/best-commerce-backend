import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.purchase.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.store.deleteMany();

  const { id: storeId } = await prisma.store.create({
    data: { name: faker.company.name() },
  });
  console.log(storeId);

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
  const adminUsername = faker.internet.userName();
  console.log(adminUsername);
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      username: adminUsername,
      password,
      storeId,
    },
  });

  const cname1 = faker.commerce.department();
  const category1 = await prisma.category.create({
    data: { name: cname1, slug: cname1.toLowerCase(), storeId },
  });
  const cname2 = faker.commerce.department();
  const category2 = await prisma.category.create({
    data: {
      name: cname2,
      slug: cname2.toLowerCase(),
      storeId,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ dec: 0 })),
        imageUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
        categoryId: category1.id,
        storeId,
      },
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ dec: 0 })),
        imageUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
        categoryId: category1.id,
        storeId,
      },
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ dec: 0 })),
        imageUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
        categoryId: category2.id,
        storeId,
      },
    ],
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
