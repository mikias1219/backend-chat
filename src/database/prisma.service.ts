import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      // Prisma 7 requires runtime DB config when schema omits datasource url
      throw new Error('DATABASE_URL is required');
    }

    const pool = new Pool({ connectionString: url });
    super({ adapter: new PrismaPg(pool) });
  }

  async onModuleInit() {
    const maxAttempts = 10;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.$connect();
        await this.$queryRawUnsafe('SELECT 1');
        this.logger.log('Connected to database');
        return;
      } catch (err) {
        const isLast = attempt === maxAttempts;
        this.logger.warn(
          `Database connection failed (attempt ${attempt}/${maxAttempts})${isLast ? '' : ', retrying...'}`,
        );
        if (isLast) throw err;
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
