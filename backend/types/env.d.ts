import { DataSourceOptions } from 'typeorm';
import { JwtPayload } from 'jsonwebtoken';
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

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      email: string;
      fullName: string;
    };
    tokenPayload?: JwtPayload;
  }
}
