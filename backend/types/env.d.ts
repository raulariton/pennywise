import { DataSourceOptions } from 'typeorm';
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPE: DataSourceOptions,
      DATABASE_URL: string;
      DATABASE_PASSWORD: string;
    }
  }
}
