export type envT = {
  NODE_ENV: string;
  PORT: number;
  APPLICATION_NAME: string;
  // JWT config
  JWT_SECRET_KEY: string;
  JWT_EXPIRATION_TIME: string;
  JWT_REFRESH_SECRET_KEY: string;
  JWT_REFRESH_EXPIRATION_TIME: string;
  // Postgres config
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_LOGS: boolean;
  POSTGRES_INITDB_ARGS: string;
  ADMINER_PORT: number;
  // Throttler Rate limiter config
  RATE_LIMITER_LIMIT: number;
  RATE_LIMITER_TTL: number;
  // Redis config
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  REDIS_DB_NAME: string;
  REDIS_CACHE_TTL: number;
  // Email config
  EMAIL_SERVICE: string;
  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_USER: string;
  EMAIL_PASSWORD: string;
};
