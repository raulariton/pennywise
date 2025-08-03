import { Router } from 'express';
import { verifyTokenMiddleware } from '@services/jwt';
import { FinancialGoalController } from '@controllers/goalsController';

const goalRoutes = Router();

goalRoutes.use('/', verifyTokenMiddleware);

goalRoutes.get('/', FinancialGoalController.getGoals);
goalRoutes.post('/', FinancialGoalController.createGoal);
goalRoutes.put('/:id', FinancialGoalController.updateGoal);

export default goalRoutes;
