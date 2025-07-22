import { Router } from 'express';
import { verifyTokenMiddleware } from '@services/jwt';
import { CategoryController } from '@controllers/categoryController';

const categoryRoutes = Router();

categoryRoutes.use('/', verifyTokenMiddleware);

categoryRoutes.get('/', CategoryController.getAllCategories);

export default categoryRoutes;
