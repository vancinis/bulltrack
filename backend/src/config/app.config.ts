import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    env: process.env.NODE_ENV ?? 'development',
    port: +(process.env.PORT ?? 3000),
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: +(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_NAME ?? 'bulltrack',
        ssl: process.env.DB_SSL ?? false,
    }
}));