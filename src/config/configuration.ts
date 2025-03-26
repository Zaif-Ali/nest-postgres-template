import { envT } from 'src/types/env.type';

export const envConfiguration = (): envT => ({
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: Number(process.env.PORT as string),
  APPLICATION_NAME: process.env.APPLICATION_NAME as string,
  // Postgres config
  POSTGRES_HOST: process.env.POSTGRES_HOST as string,
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT as string),
  POSTGRES_USER: process.env.POSTGRES_USER as string,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
  POSTGRES_DB: process.env.POSTGRES_DB as string,
  POSTGRES_LOGS: process.env.POSTGRES_LOGS == 'true' ? true : false,
  POSTGRES_INITDB_ARGS: process.env.POSTGRES_INITDB_ARGS as string,
  ADMINER_PORT: Number(process.env.ADMINER_PORT as string),
  // Throttler Rate limiter config
  RATE_LIMITER_LIMIT: Number(process.env.RATE_LIMITER_LIMIT as string),
  RATE_LIMITER_TTL: Number(process.env.RATE_LIMITER_TTL as string),
  // Redis config
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_PORT: Number(process.env.REDIS_PORT as string),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
  REDIS_DB_NAME: process.env.REDIS_DB_NAME as string,
  REDIS_CACHE_TTL: Number(process.env.REDIS_CACHE_TTL as string),
  // Email config
  EMAIL_SERVICE: process.env.EMAIL_SERVICE as string,
  EMAIL_HOST: process.env.EMAIL_HOST as string,
  EMAIL_PORT: Number(process.env.EMAIL_PORT as string),
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
});
