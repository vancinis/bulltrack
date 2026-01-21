import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.getOrThrow('app.database.host'),
            port: configService.getOrThrow('app.database.port'),
            username: configService.getOrThrow('app.database.username'),
            password: configService.getOrThrow('app.database.password'),
            database: configService.getOrThrow('app.database.database'),
            ssl: configService.get('app.database.ssl') === 'true' ? { rejectUnauthorized: false } : false,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
            synchronize: false,
        }),
        inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}