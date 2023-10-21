<h1 align="center">Best Commerce API</h1>

This is a [NestJS](https://github.com/nestjs/nest) Whitelabel API that provides the logic for companies to build their e-commerce. It's meant to be used along with [Best Commerce Frontend](https://github.com/Marceometry/best-commerce-frontend), which will use a `STORE_ID` to populate the website.

## Getting Started

First of all, create a `.env` file following the `.env.example`, changing anything that may be necessary.

This project uses [Docker](https://www.docker.com/), so make sure you have it installed.

## Running the app

```bash
docker compose up -d
```

## Prisma Setup

In the `api` terminal, run prisma `migrate` and, optionally, `seed` (to populate the database)

```bash
npm run prisma:migrate
# or
yarn prisma:migrate
```

```bash
npm run prisma:seed
# or
yarn prisma:seed
```

Now the project should be running in the port specified in `.env`
