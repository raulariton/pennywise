import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

// ensure env variables are defined
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
  throw new Error(
    'Environment variables ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be defined',
  );
// get env variables and configure expiration times
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiration = '15m'; // 15 minutes
const refreshTokenExpiration = '7d'; // 7 days

export const createToken = (
  email: string,
  userId: string,
  name: string,
  tokenType: 'access' | 'refresh',
): string => {
  // set expiration time based on token type
  const expiration = tokenType === 'access' ? accessTokenExpiration : refreshTokenExpiration;
  const secret: string = tokenType === 'access' ? accessTokenSecret : refreshTokenSecret;

  // create payload (what the token will contain)
  const payload = {
    id: userId,
    email: email,
    fullName: name,
  };

  // sign the token
  return jwt.sign(payload, secret, { expiresIn: expiration });
};

/**
 * Verifies that a JWT token is valid (not expired, not tampered with, etc.)
 * If the token is valid, it returns the decoded payload.
 */
// TODO: fix async types
export const verifyToken = async (
  token: string,
  tokenType: 'access' | 'refresh',
  res: Response,
): Promise<JwtPayload | undefined> => {
  // select the secret based on token type
  const secret: string = tokenType === 'access' ? accessTokenSecret : refreshTokenSecret;

  /*
  if (tokenType === 'refresh') {
    // check if the token is valid using the bal
    const redisClient = createClient();
    redisClient.connect().catch((err) => {
      console.error('Error connecting to Redis:', err);
    });

    try {
      const invalidatedToken = await redisClient.hGetAll(`invalidatedTokens:${token}`);

      if (invalidatedToken) {
        res.status(403).json({ error: `Refresh token invalid.` });
        return;
      }
    } catch (err) {
      console.error('Error connecting to Redis:', err);
      res
        .status(500)
        .json({ error: 'Internal server error while checking if refresh token is blacklisted.' });
      return;
    }
  }
   */

  try {
    // verify the token, and return the decoded payload
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    res.status(403).json({ error: `Invalid ${tokenType} token: ${error}` });
    return;
  }
};

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // get the token from the Authorization header
  let token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ error: 'No authorization header provided.' });
    return;
  }

  // check if the token starts with 'Bearer ' and extract the token part
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    res.status(401).json({ error: 'Invalid authorization header format. Expected "Bearer <token>".' });
    return;
  }
  // extract the token from the header
  token = tokenParts[1];
  if (!token) {
    res.status(401).json({ error: 'No token provided.' });
    return;
  }


  // verify the token
  const decodedToken = await verifyToken(token, 'access', res);

  if (!decodedToken) {
    return; // error response already sent in verifyToken
  }

  // attach the decoded token to the request object for further use
  (req as any).tokenPayload = decodedToken;
  
  // Also set user property for convenience
  (req as any).user = {
    id: decodedToken.id,
    email: decodedToken.email,
    fullName: decodedToken.fullName
  };

  next(); // call the next middleware or route handler
}
