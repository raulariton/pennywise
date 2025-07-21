import { JwtPayload } from 'jsonwebtoken';

// extend request type to include user and access token payload
declare namespace Express {
  interface Request {
    user?: {
      id: string;
      email: string;
      fullName: string;
    };
    tokenPayload?: JwtPayload;
  }
}
