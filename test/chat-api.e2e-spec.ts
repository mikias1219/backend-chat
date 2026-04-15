import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { randomUUID } from 'crypto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { JwtService } from '../src/auth/jwt.service';

type AuthPair = { token: string; userId: string };

async function register(
  app: INestApplication<App>,
  email: string,
  password = 'password123',
  name?: string,
) {
  const res = await request(app.getHttpServer())
    .post('/api/v1/auth/register')
    .send({ email, password, name })
    .expect(201);
  expect(res.body?.ok).toBe(true);
  expect(typeof res.body?.token).toBe('string');
  expect(res.body?.user?.email).toBe(email.toLowerCase());
  return {
    token: res.body.token as string,
    userId: res.body.user.id as string,
  } satisfies AuthPair;
}

async function login(
  app: INestApplication<App>,
  email: string,
  password = 'password123',
) {
  const res = await request(app.getHttpServer())
    .post('/api/v1/auth/login')
    .send({ email, password })
    .expect(200);
  expect(res.body?.ok).toBe(true);
  return {
    token: res.body.token as string,
    userId: res.body.user.id as string,
  } satisfies AuthPair;
}

describe('Chat API (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    // Safety: these tests create and DELETE data.
    // They MUST NOT be run against any environment you care about.
    if (process.env.E2E_CAN_DELETE_DATA !== 'true') {
      throw new Error(
        'Refusing to run e2e tests because they delete DB data. Set E2E_CAN_DELETE_DATA=true to run.',
      );
    }

    process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret';
    process.env.REQUIRE_JWT_VERIFY = 'true';
    process.env.API_PREFIX = process.env.API_PREFIX ?? 'api/v1';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix(process.env.API_PREFIX);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('auth: register + login', async () => {
    const email = `u_${randomUUID().slice(0, 8)}@example.com`;
    await register(app, email);
    await login(app, email);
  });

  it('rooms: list/create/get/join/dm', async () => {
    const aEmail = `a_${randomUUID().slice(0, 8)}@example.com`;
    const bEmail = `b_${randomUUID().slice(0, 8)}@example.com`;

    const a = await register(app, aEmail, 'password123', 'A');
    const b = await register(app, bEmail, 'password123', 'B');

    // list rooms
    await request(app.getHttpServer())
      .get('/api/v1/chat/rooms')
      .set('Authorization', `Bearer ${a.token}`)
      .expect(200);

    // create room
    const roomRes = await request(app.getHttpServer())
      .post('/api/v1/chat/rooms')
      .set('Authorization', `Bearer ${a.token}`)
      .send({ name: 'Test Room' })
      .expect(201);
    expect(roomRes.body?.ok).toBe(true);
    const roomId = roomRes.body.room.id as string;

    // get room
    await request(app.getHttpServer())
      .get(`/api/v1/chat/rooms/${roomId}`)
      .set('Authorization', `Bearer ${a.token}`)
      .expect(200);

    // join room (idempotent)
    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/join`)
      .set('Authorization', `Bearer ${a.token}`)
      .send({})
      .expect(200);

    // dm create/get
    const dmRes = await request(app.getHttpServer())
      .post('/api/v1/chat/dm')
      .set('Authorization', `Bearer ${a.token}`)
      .send({ otherUserId: b.userId, otherName: 'B' })
      .expect(200);
    expect(dmRes.body?.ok).toBe(true);
    expect(dmRes.body.room.type).toBe('DIRECT');
  });

  it('messages: list/send/typing/receipts/read + uploads', async () => {
    const email = `m_${randomUUID().slice(0, 8)}@example.com`;
    const me = await register(app, email);

    // create room and join
    const roomRes = await request(app.getHttpServer())
      .post('/api/v1/chat/rooms')
      .set('Authorization', `Bearer ${me.token}`)
      .send({ name: 'Msg Room' })
      .expect(201);
    const roomId = roomRes.body.room.id as string;

    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/join`)
      .set('Authorization', `Bearer ${me.token}`)
      .send({})
      .expect(200);

    // list messages (empty ok)
    await request(app.getHttpServer())
      .get(`/api/v1/chat/rooms/${roomId}/messages?limit=10`)
      .set('Authorization', `Bearer ${me.token}`)
      .expect(200);

    // upload a tiny file (attachment)
    const uploadRes = await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/uploads`)
      .set('Authorization', `Bearer ${me.token}`)
      .attach('file', Buffer.from('hello'), 'hello.txt')
      .expect(201);
    expect(uploadRes.body?.ok).toBe(true);
    const attachmentId = uploadRes.body.attachment.id as string;

    // send message (attachments-only allowed)
    const sendRes = await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/messages`)
      .set('Authorization', `Bearer ${me.token}`)
      .send({ attachmentIds: [attachmentId] })
      .expect(201);
    expect(sendRes.body?.ok).toBe(true);
    const messageId = sendRes.body.message.id as string;

    // typing mirror
    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/typing`)
      .set('Authorization', `Bearer ${me.token}`)
      .send({ isTyping: true })
      .expect(200);

    // delivered receipt mirror
    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/receipts/delivered`)
      .set('Authorization', `Bearer ${me.token}`)
      .send({ messageId })
      .expect(200);

    // read receipt mirror
    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/receipts/read`)
      .set('Authorization', `Bearer ${me.token}`)
      .send({ messageId })
      .expect(200);

    // mark room read
    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/read`)
      .set('Authorization', `Bearer ${me.token}`)
      .send({ upToMessageId: messageId })
      .expect(200);
  });

  it('auth guard: chat routes reject missing token', async () => {
    await request(app.getHttpServer()).get('/api/v1/chat/rooms').expect(401);
    await request(app.getHttpServer())
      .post('/api/v1/chat/rooms')
      .send({ name: 'x' })
      .expect(401);
  });

  it('registration requirement: token with unknown userId is rejected by chat', async () => {
    // Build a signed token with a non-existent sub using the app secret.
    const jwt = new JwtService();
    const token = await jwt.sign({
      userId: randomUUID(),
      email: `ghost_${randomUUID().slice(0, 8)}@example.com`,
      name: 'Ghost',
    });

    await request(app.getHttpServer())
      .get('/api/v1/chat/rooms')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);

    // Ensure auth endpoints still work without chat access.
    const email = `real_${randomUUID().slice(0, 8)}@example.com`;
    await register(app, email);
  });

  it('uploads: attachment is scoped to room/uploader', async () => {
    const aEmail = `ua_${randomUUID().slice(0, 8)}@example.com`;
    const bEmail = `ub_${randomUUID().slice(0, 8)}@example.com`;
    const a = await register(app, aEmail);
    const b = await register(app, bEmail);

    const roomRes = await request(app.getHttpServer())
      .post('/api/v1/chat/rooms')
      .set('Authorization', `Bearer ${a.token}`)
      .send({ name: 'Scope Room' })
      .expect(201);
    const roomId = roomRes.body.room.id as string;

    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/join`)
      .set('Authorization', `Bearer ${a.token}`)
      .send({})
      .expect(200);

    // b is NOT a member of the room -> upload denied
    await request(app.getHttpServer())
      .post(`/api/v1/chat/rooms/${roomId}/uploads`)
      .set('Authorization', `Bearer ${b.token}`)
      .attach('file', Buffer.from('nope'), 'nope.txt')
      .expect(403);
  });

  afterEach(async () => {
    // Keep DB tidy between tests (dev DB)
    // (Guarded by E2E_CAN_DELETE_DATA=true in beforeAll)
    await prisma.messageReceipt.deleteMany();
    await prisma.attachment.deleteMany();
    await prisma.message.deleteMany();
    await prisma.roomMember.deleteMany();
    await prisma.room.deleteMany();
    await prisma.user.deleteMany();
  });
});
