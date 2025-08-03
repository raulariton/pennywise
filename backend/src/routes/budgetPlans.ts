import { Router } from 'express';
import { verifyTokenMiddleware } from '@services/jwt';
import { BudgetController } from '@controllers/budgetController';

const budgetRoutes = Router();

budgetRoutes.use('/', verifyTokenMiddleware);

budgetRoutes.get('/:month', BudgetController.getBudgets);
budgetRoutes.post('/', BudgetController.createBudget);
budgetRoutes.put('/:id', BudgetController.updateBudget);

export default budgetRoutes;
