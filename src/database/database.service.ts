import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pool = new Pool({
      connectionString: databaseUrl,
    });

    super({
      adapter: new PrismaPg(pool),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
