import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, database, up } from 'migrate-mongo';

@Injectable()
export class DbMigrationService implements OnModuleInit {
    private readonly dbMigrationConfig: Partial<config.Config>;

    constructor(private readonly configService: ConfigService) {
        this.dbMigrationConfig = {
            mongodb: {
                databaseName: this.configService.getOrThrow('DB_NAME'),
                url: this.configService.getOrThrow('MONGODB_URI'),
            },
            migrationsDir: `${__dirname}/../../migrations`,
            changelogCollectionName: 'changelog',
            migrationFileExtension: '.js',
        };
    }

    async onModuleInit() {
        const resolvedConfig = await config;
        const resolvedDatabase = await database;
        const resolvedUp = await up;
        resolvedConfig.set(this.dbMigrationConfig);
        const { db, client } = await resolvedDatabase.connect();
        await resolvedUp(db, client);
    }
}