# Selam Collaboration Backend (NestJS + Prisma + Postgres + Socket.IO)

Production-minded **real-time chat backend** with **first-class auth**, designed to back a modern Telegram/Slack-like UI.

## What you get (current)

- **Auth (email/password)**: `POST /auth/register`, `POST /auth/login`, signed JWT (HS256)
- **NestJS**: modular controllers/services + global validation
- **PostgreSQL + Prisma**: strict relationships for rooms/messages/receipts/attachments
- **Socket.IO**: real-time chat (messages, typing, presence, receipts)
- **Uploads**: room-scoped attachments served via `/uploads/*` in dev
- **Swagger**: live API docs at `/api/docs` (+ `/api/docs-json`)
- **Ngrok**: expose local dev server publicly (same origin for REST + WS)

## High-level architecture

```mermaid
flowchart LR
  FE["Frontend (Next.js)"] -->|REST| API["NestJS REST (api/v1)"]
  FE -->|Socket.IO| WS["NestJS WS Gateway (/socket.io)"]
  FE -->|Auth| AUTH["Auth REST (/auth)"]
  API --> SVC["Services (rooms/messages/uploads)"]
  WS --> SVC
  AUTH --> PRISMA
  SVC --> PRISMA["Prisma Client"]
  PRISMA --> PG["PostgreSQL"]
  API --> UP["Static /uploads (dev)"]
```

## Local setup

```bash
cd backend
npm install
cp .env.example .env
```

### Environment variables

- **`DATABASE_URL`**: Postgres connection string  
  Example: `postgresql://postgres:postgres@localhost:5432/selam_collab?schema=public`
- **`PORT`**: default `4000`
- **`API_PREFIX`**: default `api/v1` (REST base becomes `/api/v1/*`)
- **`FRONTEND_URL`**: allowed CORS origins for REST + Socket.IO (comma-separated)  
  Example: `http://localhost:3000,https://<your-ngrok-subdomain>.ngrok-free.dev`
- **`JWT_SECRET`**: required in real deployments (used to sign + verify JWTs)
- **`REQUIRE_JWT_VERIFY`**: `true` recommended (rejects unsigned/invalid JWTs)
- **Socket.IO hardening**
  - `SOCKET_REQUIRE_AUTH=true`
  - `SOCKET_ALLOW_ANON=false`
  - `SOCKET_PING_INTERVAL_MS=25000`
  - `SOCKET_PING_TIMEOUT_MS=20000`
  - `SOCKET_MAX_HTTP_BUFFER_BYTES=1000000`

## Authentication (required)

All chat endpoints require a valid **registered user**.

### Register

- `POST /api/v1/auth/register`
- Body:

```json
{
  "email": "demo@example.com",
  "password": "password123",
  "name": "Demo"
}
```

Response:
- `token`: JWT
- `user`: `{ id, email, name }`

### Login

- `POST /api/v1/auth/login`
- Body:

```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

### Using the token

- REST: send `Authorization: Bearer <token>`
- Socket.IO: connect with `auth: { token: "<token>" }`

## Database: tables + relationships (diagram)

Core entities:
- **User**: registered chat participant (email/passwordHash)
- **Room**: group or direct room
- **RoomMember**: join table (room ↔ user) + unread/read pointers
- **Message**: message inside a room, optional reply-to
- **MessageReceipt**: delivered/read per user per message
- **Attachment**: uploaded file/image, linked to a room and optionally to a message

```mermaid
erDiagram
  User {
    string id PK
    string email
    string name
    string passwordHash
    datetime createdAt
  }

  Room {
    string id PK
    string name
    string type "DIRECT|GROUP"
    string directKey
    datetime createdAt
    datetime updatedAt
  }

  RoomMember {
    string roomId PK,FK
    string userId PK,FK
    string role
    datetime joinedAt
    datetime lastReadAt
    string lastReadMessageId
  }

  Message {
    string id PK
    string roomId FK
    string userId FK
    string body
    string replyToId FK
    datetime createdAt
  }

  MessageReceipt {
    string messageId PK,FK
    string userId PK,FK
    string status PK "DELIVERED|READ"
    datetime at
  }

  Attachment {
    string id PK
    string kind "IMAGE|FILE"
    string fileName
    string mimeType
    int sizeBytes
    string url
    string roomId FK
    string messageId FK
    string uploaderId FK
    datetime createdAt
  }

  User ||--o{ RoomMember : "joins"
  Room ||--o{ RoomMember : "has"

  Room ||--o{ Message : "contains"
  User ||--o{ Message : "sends"
  Message ||--o{ Message : "replies-to"

  Message ||--o{ MessageReceipt : "has"
  User ||--o{ MessageReceipt : "acks"

  Room ||--o{ Attachment : "stores"
  User ||--o{ Attachment : "uploads"
  Message ||--o{ Attachment : "claims"
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
- **REST base**: `http://localhost:4000/api/v1`
- **Swagger**: `http://localhost:4000/api/docs`
- **Socket.IO**: `http://localhost:4000` (same origin)

## Ngrok (development)

### Start ngrok

```bash
cd backend
npm run ngrok
```

Ngrok exposes **the same origin** for both:
- REST: `https://<subdomain>.ngrok-free.dev/api/v1/...`
- Socket.IO: `https://<subdomain>.ngrok-free.dev/socket.io/...`

### Frontend alignment (important)

Your frontend should point to the ngrok domain like this:
- **API base**: `https://<subdomain>.ngrok-free.dev/api/v1`
- **WS base**: `https://<subdomain>.ngrok-free.dev`

If you use ngrok’s browser warning, ensure the frontend sends:
- Header: `ngrok-skip-browser-warning: 1` (REST)
- Query param: `?ngrok-skip-browser-warning=1` (WS)

## Request flow diagrams

### 1) Auth + join room + load history

```mermaid
sequenceDiagram
  participant FE as Frontend
  participant AUTH as Auth REST
  participant WS as Socket.IO Gateway
  participant SVC as Rooms/Messages Services
  participant DB as PostgreSQL

  FE->>AUTH: POST /auth/login (email/password)
  AUTH-->>FE: { token }
  FE->>WS: connect (auth.token = JWT)
  FE->>WS: chat:join { roomId }
  WS->>SVC: requireRegisteredUser + joinRoom(roomId)
  SVC->>DB: SELECT User + UPSERT RoomMember
  WS->>SVC: getRecent(roomId)
  SVC->>DB: SELECT messages (with receipts + attachments)
  WS-->>FE: chat:recent { roomId, messages[] }
  WS-->>FE: presence:update { userIds[] }
```

### 2) Send message (text + attachments)

```mermaid
sequenceDiagram
  participant FE as Frontend
  participant API as REST Upload API
  participant WS as Socket.IO Gateway
  participant SVC as Uploads/Messages Services
  participant DB as PostgreSQL

  alt has files
    FE->>API: POST /chat/rooms/:roomId/uploads (multipart)
    API->>SVC: createPendingAttachment(roomId, uploaderId)
    SVC->>DB: INSERT Attachment (messageId = null)
    API-->>FE: { attachment.id, url, ... }
  end

  FE->>WS: chat:send { roomId, body, attachmentIds[] }
  WS->>SVC: createMessage(...)
  SVC->>DB: INSERT Message + receipts
  SVC->>DB: UPDATE Attachment SET messageId = newMessageId
  WS-->>FE: chat:message (saved message w/ attachments)
```

### 3) Receipts (delivered/read) + unread count

```mermaid
sequenceDiagram
  participant FE as Frontend
  participant WS as Socket.IO Gateway
  participant SVC as Messages/Rooms Services
  participant DB as PostgreSQL

  FE->>WS: chat:ack:delivered { roomId, messageId }
  WS->>SVC: markDelivered(...)
  SVC->>DB: UPSERT MessageReceipt(DELIVERED)
  WS-->>FE: chat:message:delivered { messageId, userId }

  FE->>WS: chat:ack:read { roomId, messageId }
  WS->>SVC: markRead(...)
  SVC->>DB: UPSERT MessageReceipt(READ)
  SVC->>DB: UPDATE RoomMember.lastReadAt/lastReadMessageId
  WS-->>FE: chat:message:read { messageId, userId }
```

## REST endpoints (frontend-ready)

Base prefix: `/api/v1`

- **Auth**
  - `POST /auth/register` → `{ ok, token, user }`
  - `POST /auth/login` → `{ ok, token, user }`
- **Rooms**
  - `GET /chat/rooms` → list rooms (includes members + `unreadCount`)
  - `GET /chat/rooms/:roomId` → single room + members + unreadCount
  - `POST /chat/rooms/:roomId/join` → join room (idempotent)
  - `POST /chat/rooms` → create group room
  - `POST /chat/dm` → create/get direct room
- **Messages**
  - `GET /chat/rooms/:roomId/messages?limit=50&before=<messageId>` → older history
  - `GET /chat/rooms/:roomId/messages?limit=50&after=<messageId>` → forward history
  - `POST /chat/rooms/:roomId/messages` → send message via REST (also broadcasts)
  - `POST /chat/rooms/:roomId/typing` → HTTP mirror of typing
  - `POST /chat/rooms/:roomId/receipts/delivered` → HTTP mirror of delivered
  - `POST /chat/rooms/:roomId/receipts/read` → HTTP mirror of read
  - `POST /chat/rooms/:roomId/read` → mark read (optional `upToMessageId`)
- **Uploads**
  - `POST /chat/rooms/:roomId/uploads` (multipart) → returns `attachment`
  - `GET /uploads/...` (dev static hosting)

## Socket.IO events (frontend-ready)

Client → server:
- `chat:join` `{ roomId }`
- `chat:leave` `{ roomId }`
- `chat:send` `{ roomId, body?, replyToId?, attachmentIds?, clientId? }`
- `chat:typing` `{ roomId, isTyping }`
- `chat:ack:delivered` `{ roomId, messageId }`
- `chat:ack:read` `{ roomId, messageId }`

Server → client:
- `chat:recent` `{ roomId, messages[] }`
- `chat:message` `message`
- `chat:typing` `{ roomId, userIds[] }`
- `presence:update` `{ userIds[] }`
- `chat:message:delivered` `{ roomId, messageId, userId }`
- `chat:message:read` `{ roomId, messageId, userId }`

## Swagger

- Local: `http://localhost:4000/api/docs`
- Ngrok: `https://<subdomain>.ngrok-free.dev/api/docs`
- JSON: `http://localhost:4000/api/docs-json`

## Notes (dev vs production)

- `uploads/` is served as static files for **development**.
  - For production, swap to S3/R2 storage and signed URLs.
- Don’t commit `.env` (this repo ignores it).
- **Production**: always set `JWT_SECRET` and keep `REQUIRE_JWT_VERIFY=true`.
- **Ngrok warning page**: for API calls, use `ngrok-skip-browser-warning: 1` header (or query param) to avoid HTML interstitials.
