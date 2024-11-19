export type Environment = {
  NODE_ENV: 'development' | 'production';
  API_PORT: number;
  MONGODB_PORT: number;
  MONGODB_HOST: string;
  MONGODB_DATABASE: string;
  MONGODB_USERNAME: string;
  MONGODB_PASSWORD: string;

  RABBITMQ_HOST: string;
  RABBITMQ_PORT: number;
  RABBITMQ_DEFAULT_USER: string;
  RABBITMQ_DEFAULT_PASS: string;

  EMAIL_HOST: string;
  EMAIL_SENDER_USER: string;
  EMAIL_SENDER_PASS: string;
};

export const getEnv = <K extends keyof Environment>(
  key: K,
  fallback?: Environment[K],
): Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if (!value) {
    if (fallback) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}.`);
  }

  return value;
};
