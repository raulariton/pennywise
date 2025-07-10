import { Request, Response } from 'express';
import { User } from '@entities/User';
import * as userServices from '@services/userServices';
import { createToken } from '@services/jwt';
import { createClient } from 'redis';
import jwt from 'jsonwebtoken';

/*
This controller handles user authentication, including login and registration.
*/

export class AuthController {
  /**
   * Logs in a user by verifying their credentials and returning an access token.
   */
  static async login(req: Request, res: Response): Promise<void> {
    // check if email and password are correct
    const { email, password: plainTextPassword } = req.body;
    const user = await userServices.authenticateUser(email, plainTextPassword);

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // create tokens
    const accessToken = createToken(user.email, user.id, user.name, 'access');
    const refreshToken = createToken(user.email, user.id, user.name, 'refresh');

    // set refresh token in cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production

      /**
       * 'strict': for the server to receive cookies only from the same site
       * 'lax': for the server to receive cookies from the same site and top-level navigations
       * 'none': for the server to receive cookies from any site
       * i set it to 'none' since the frontend and backend are on different domains
       * but any other cookies that the backend doesn't need from the frontend
       * should be set to 'strict' or 'lax' to prevent CSRF attacks
       */
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // return access token in response
    res.status(201).json({
      message: 'User logged in successfully.',
      accessToken: accessToken,
    });
    return;
  }

  /**
   * Registers a new user in the database.
   */
  static async register(req: Request, res: Response): Promise<void> {
    const { fullName, email, password: plainTextPassword } = req.body;

    // check if user with same email already exists
    if (await userServices.getUserByEmail(email)) {
      res.status(409).json({ error: 'User with this email already exists.' });
      return;
    }

    // create user object
    const user = await userServices.createUser(
      Object.assign(new User(), {
        email: email,
        password: plainTextPassword,
        name: fullName,
      }),
    );

    // check for null (error in creating user)
    if (!user) {
      res.status(500).json({ error: 'Error creating user.' });
      return;
    }

    // create tokens
    const accessToken = createToken(user.email, user.id, user.name, 'access');
    const refreshToken = createToken(user.email, user.id, user.name, 'refresh');

    // set refresh token in cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // return access token in response
    res.status(201).json({
      message: 'User registered successfully.',
      accessToken: accessToken,
    });

    return;
  }

  static async logout(req: Request, res: Response) {
    // clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      sameSite: 'strict',
    });

    /*
    // invalidate refresh token
    // connect to Redis
    const redisClient = createClient();
    await redisClient.connect();

    // get the refresh token from cookies
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      // obtain the expiration time of the refresh token
      const decodedToken = jwt.decode(refreshToken) as jwt.JwtPayload;
      const expirationTime = decodedToken?.exp || 0;

      // store the refresh token in Redis
      await redisClient.hSet(`invalidatedTokens:${refreshToken}`, {
        invalidatedAt: new Date().toISOString(),
        expiresAt: new Date(expirationTime * 1000).toISOString(),
      });

      // set the expiration time for the key in Redis
        await redisClient.expire(`invalidatedTokens:${refreshToken}`, expirationTime - Math.floor(Date.now() / 1000));
    }
     */

    // send response
    res.status(200).json({ message: 'User logged out successfully.' });
    return;
  }
}
