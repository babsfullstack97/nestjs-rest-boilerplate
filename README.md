[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/hebertcisco/nestjs-rest-boilerplate)

[![Node.js CI](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/node.js.yml/badge.svg)](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/node.js.yml)

[![Docker Image CI](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/docker-image.yml/badge.svg)](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/docker-image.yml)

# Basic documentation

## Postgres with Docker

> Up an image and run postgres image with docker

```sh
docker run --name db_pg -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d postgres:11
```

## Runing the application with docker

### Run as dev

```sh
docker-compose up dev
```

### Run as prod

```sh
docker-compose up -d prod
```

## Runing the application with npm scrips

```sh
npm install && npm run build
```

```sh
npm run prepare:enviroment
```

### Run as dev

```sh
npm run dev
```

or

```sh
npm run dev:test
```

### Run as prod

```sh
npm run start
```

or

```sh
npm run start:prod
```
