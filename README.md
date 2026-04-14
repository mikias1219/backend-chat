# Selam Collaboration Backend (NestJS)

Modern NestJS backend with:

- PostgreSQL (Prisma) with real table relationships (`User`, `Room`, `RoomMember`, `Message`, `MessageReceipt`)
- Socket.IO gateway for real-time chat events on the same origin as REST
- (Optional) Docker Compose Postgres for local dev
- Ngrok support for exposing the backend during development

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

## Migrate + seed

```bash
cd backend
npm run prisma:migrate
npm run prisma:seed
```

## Run the server

```bash
cd backend
npm run dev
```

Defaults:

- REST base: `http://localhost:4000/${API_PREFIX:-api/v1}`
- Socket.IO: `http://localhost:4000` (same origin)

## Ngrok (optional)

Install the ngrok CLI, then:

```bash
cd backend
npm run ngrok
```

## Notes

- Configure allowed frontend origins via `FRONTEND_URL` (comma-separated).
- If you don’t want a global prefix, set `API_PREFIX=` (empty) in `.env`.
