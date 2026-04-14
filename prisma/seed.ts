import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient, ReceiptStatus, RoomRole } from '../src/generated/prisma';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is required');
const pool = new Pool({ connectionString: url });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { email: 'alice@example.com', name: 'Alice' },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { email: 'bob@example.com', name: 'Bob' },
  });

  const room = await prisma.room.create({
    data: {
      name: 'General',
      members: {
        create: [
          { userId: alice.id, role: RoomRole.OWNER },
          { userId: bob.id, role: RoomRole.MEMBER },
        ],
      },
    },
    include: { members: true },
  });

  const msg = await prisma.message.create({
    data: {
      roomId: room.id,
      userId: alice.id,
      body: 'Welcome to Selam Collaboration chat.',
      receipts: {
        create: [
          { userId: alice.id, status: ReceiptStatus.DELIVERED },
          { userId: alice.id, status: ReceiptStatus.READ },
        ],
      },
    },
  });

  console.log({ alice: alice.id, bob: bob.id, room: room.id, message: msg.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

