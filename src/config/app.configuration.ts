function appConfig() {
  return {
    APP_NAME: process.env.APP_NAME || 'APP',
    APP_ENV: process.env.APP_ENV || 'production',
    APP_DEBUG: process.env.APP_DEBUG === 'true',
    APP_DEFAULT_LANGUAGE: process.env.APP_DEFAULT_LANGUAGE || 'en',

    HTTP_PORT: parseInt(process.env.HTTP_PORT, 10) || 3000,
    HTTP_HOST: process.env.HTTP_HOST || '0.0.0.0',

    DATABASE_PROVIDER: process.env.DATABASE_PROVIDER || 'postgres',
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USE_SSL: process.env.DATABASE_USE_SSL === 'true',

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_EXPIRE_MINUTE:
      parseInt(process.env.JWT_ACCESS_EXPIRE_MINUTE) || 180,
    JWT_ACCESS_REFRESH_MINUTE:
      parseInt(process.env.JWT_ACCESS_REFRESH_MINUTE) || 30 * 24 * 60,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',

    LOG_CHANNELS: process.env.LOG_CHANNELS || 'console,file',
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    LOG_FILE_NAME: process.env.LOG_FILE_NAME || 'nest.log',
    LOG_FILE_DIRNAME: process.env.LOG_FILE_DIRNAME || 'logs'
  };
}

export type AppConfig = ReturnType<typeof appConfig>;
export default appConfig;
