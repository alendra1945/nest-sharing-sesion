export type AppConfig = {
  env: {
    type: 'production' | 'development';
  };
  api: {
    port: number;
  };
  mongodb: {
    port: number;
    host: string;
    database: string;
    username: string;
    password: string;
  };
  rabbitmq: {
    port: number;
    host: string;
    username: string;
    password: string;
  };
  smtp: {
    sender: string;
  };
};
