import { Router } from 'express';
import { AuthController } from '@controllers/authController';
import { JWTController } from '@controllers/jwtController';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post('/register',  AuthController.register);
authRoutes.get('/logout', AuthController.logout);
authRoutes.get('/refresh', JWTController.refreshAccessToken);


export default authRoutes;
