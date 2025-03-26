import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

// Load ConfigModule globally before using process.env
// eslint-disable-next-line @typescript-eslint/no-floating-promises
ConfigModule.forRoot({
  envFilePath: `${process.cwd()}/config/env/.env.${process.env.NODE_ENV || 'development'}`,
  isGlobal: true,
});

console.log(`${process.cwd()}/src/database/entities/*.entity{.ts,.js}'`);

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize:false,
  migrationsRun: false,
  entities: [`${process.cwd()}/src/database/entities/*.entity{.ts,.js}`],
  migrations: [`${process.cwd()}/src/database/migrations/*{.ts,.js}`],
});