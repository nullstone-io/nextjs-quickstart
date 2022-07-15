# Next.js Quickstart

Thi is a Next.js Static Site Quickstart for [Nullstone](https://nullstone.io).
This is based off the official Next.js [Getting Started](https://nextjs.org/docs/getting-started) guide.
This is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This quickstart is set up with:
- Next.js 
- Typescript

## How to launch via Nullstone

1. Create a static site. (Remember `app-name` for later)
2. Add a subdomain. (this will add a CDN capability)
3. Provision
  ```shell
  nullstone up --wait --block=<app-name> --env=<env-name>
  ```
4. Build, push, and deploy
  ```shell
  yarn build
  nullstone launch --source=./dist --app=<app-name> --env=<env-name>
  ```

## Running locally

You can run this project locally inside Docker or using a dev server.
The docker setup is configured to hot reload; you don't have to rebuild/restart the container when you change code.

### Docker

```shell
docker compose up
```

Visit [http://localhost:3000](http://localhost:3000).

### Dev Server

```shell
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Hot reload

The `app` in `docker-compose.yml` is configured to automatically reload changes to code.
You do not need to rebuild/restart the app when making changes to code.

### Update dependencies

To make changes to dependencies, make changes to `package.json` and restart your docker container.
`yarn install` happens automatically at the boot of the docker container to update dependencies.

```shell
docker compose restart app
```

## Details on quickstart

This static site was generated following these steps.
1. `yarn create next-app --typescript`
