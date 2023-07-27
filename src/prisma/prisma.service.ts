import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    async onModuleDestroy() {
        console.log('Disconnecting from database...')
        await this.$disconnect();
    }

    async onModuleInit() {
        console.log('Connecting to database...')
        await this.$connect();
    }
}
