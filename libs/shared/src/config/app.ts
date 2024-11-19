import { getEnv } from '@app/shared/env';

import type { AppConfig } from './type';

const loadConfig = (): AppConfig => {
  return {
    env: {
      type: getEnv('NODE_ENV', 'development'),
    },
    api: {
      port: Number(getEnv('API_PORT', 3002)),
    },
    mongodb: {
      port: getEnv('MONGODB_PORT'),
      host: getEnv('MONGODB_HOST'),
      database: getEnv('MONGODB_DATABASE'),
      username: getEnv('MONGODB_USERNAME'),
      password: getEnv('MONGODB_PASSWORD'),
    },
    rabbitmq: {
      host: getEnv('RABBITMQ_HOST', 'localhost'),
      port: getEnv('RABBITMQ_PORT', 5672),
      username: getEnv('RABBITMQ_DEFAULT_USER'),
      password: getEnv('RABBITMQ_DEFAULT_PASS'),
    },
    smtp: {
      sender: getEnv('EMAIL_SENDER_USER'),
    },
  };
};

export default loadConfig;
