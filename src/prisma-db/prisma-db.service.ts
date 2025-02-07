import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaDbService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(PrismaDbService.name);

    async onModuleInit() {
        try {
            // Connect to the database
            await this.$connect();
            this.logger.log('Database connected successfully.');

            // Optionally, run a query to ensure the connection is working and get some info
            const dbVersion = await this.$queryRaw`SELECT version();`;
            this.logger.log('Connected to PostgreSQL, version:', dbVersion);

        } catch (error) {
            this.logger.error('Database connection failed:', error);
            throw new Error('Could not connect to the database: ' + error.message);
        }
    }
}