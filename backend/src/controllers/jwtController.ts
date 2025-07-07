import { Request, Response } from 'express';
import { verifyToken, createToken } from '@services/jwt';

export class JWTController {
  // TODO: fix async types
  static async refreshAccessToken(req: Request, res: Response): Promise<void> {
    // get the refresh token from cookies
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.sendStatus(401).json({ error: 'No refresh token provided.' });
      return;
    }

    // verify the refresh token
    const decoded = await verifyToken(refreshToken, 'refresh', res);
    if (!decoded) return;

    // create a new access token
    const newAccessToken = createToken(decoded.email, decoded.id, 'access');

    // return the new access token
    res.status(200).json({ accessToken: newAccessToken });
    return;
  }
}
