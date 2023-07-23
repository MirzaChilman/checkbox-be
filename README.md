# Checkbox Service

This is a sample Checkbox Service built using **NestJS** and **GraphQL** with a **PostgreSQ**L database, and utilizing **Prisma** ORM for database queries.

This is a project built with **NestJS** and **PostgreSQL**, using **Prisma** ORM and **GraphQL** with a code-first approach.

Note: please go to this [link](https://giant-heaven-ea6.notion.site/Checkbox-9c503033aba845a6909e0b9a5dbc418b?pvs=4) for detailed improvements

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

5. Run `npm run setup` for first time application, this will generate necessary schema, do migration and seeding the database

6. Run `npm run start:dev` to start the service in development mode

8. Open http://localhost:3001/graphql in your web browser to access the GraphQL playground and explore the API.

9. Run `npx prisma studio` to run the graphical UI prisma, and open http://localhost:5555

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

3. Run `docker-compose up -f docker-compose-prod.yml --build`

4. Run inside your docker container `docker exec -it <container_id> /bin/sh` once inside the container run `npm run seed`. To seed database (**Note**: make sure your database is empty first you can run `npx prisma migrate reset` to clear database).

Docker already handle everything for you