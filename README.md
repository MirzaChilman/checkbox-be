# Shippio Service

This is a sample Shippio Service built using **NestJS** and **GraphQL** with a **PostgreSQ**L database, and utilizing **Prisma** ORM for database queries.

This is a project built with **NestJS** and **PostgreSQL**, using **Prisma** ORM and **GraphQL** with a code-first approach.

Note: please read [EVALUATING.md](EVALUATING.md) for explaining of the decision makin

## Tech Stack

- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient and scalable web applications.
- [PostgreSQL](https://www.postgresql.org/): A powerful, open source object-relational database system.
- [Prisma](https://www.prisma.io/): A modern ORM for TypeScript and Node.js that lets you access databases with a type-safe API.
- [GraphQL](https://graphql.org/): A query language for APIs that provides a more efficient, powerful, and flexible alternative to REST.

## Requirements
- Node >= 14 <= 15
- Docker
- Docker compose
- Postgres

## Getting Started

### Docker
The easiest way to run the application locally is using `docker`

1. Clone this repository to your local machine

2. Create a `.env` file at the root of projects and set the following variable
```makefile
POSTGRES_USERNAME=root
POSTGRES_PASSWORD=123
POSTGRES_DB=nestjs
POSTGRES_PATH=postgres

DATABASE_URL="postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_PATH}:5432/${POSTGRES_DB}?schema=public"
```

3. Run `docker-compose up`

4. Run inside your docker container `docker exec -it <container_id> /bin/sh` once inside the container run `npm run seed`. To seed database (**Note**: make sure your database is empty first, otherwise it will fail as Voyage table is dependent to the availability of Vessel id)

Docker already handle everything for you

### Local

1. Clone this repository to your local machine

2. Install the dependencies by running `npm install`

3. Run your Postgres database server.

4. Create a `.env` file at the root of projects and set the following variable
```makefile
POSTGRES_USERNAME=root
POSTGRES_PASSWORD=123
POSTGRES_DB=nestjs
POSTGRES_PATH=localhost

DATABASE_URL="postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_PATH}:5432/${POSTGRES_DB}?schema=public"
```

5. Run `npx prisma generate` to generate the Prisma client based on Prisma schema

6. Run `npx prisma migrate dev --name init` to sync the prisma schema with database (NOTE: `--name init` only run for the first time, omitted `--name init` on the second run)

7. Run `npm run start:dev` to start the Shippio service in development mode

8. Open http://localhost:3000/graphql in your web browser to access the GraphQL playground and explore the API.

9. Run `npx prisma studio` to run the graphical UI database, and open http://localhost:5555

## Testing
You can run tests for the Vessel Service API by running `npm run test`.

**note**: due to time limitation of 3 hours, I do not create votage vessel as there is not enough time, but I believe vessel resource already fully tested