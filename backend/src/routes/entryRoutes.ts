import { Router } from 'express';
import { EntryController } from '@controllers/entryController';
import { verifyTokenMiddleware } from '@services/jwt';

const entryRoutes = Router();

entryRoutes.use('/', verifyTokenMiddleware);

entryRoutes.post('/', EntryController.createEntry);
entryRoutes.post('/bulk', EntryController.createBulkEntry);
entryRoutes.get('/', EntryController.getEntries);
entryRoutes.get('/monthly-cash-flow', EntryController.getMonthlyCashFlow);
entryRoutes.get('/dashboard-metrics', EntryController.getDashboardMetrics);
entryRoutes.put('/:id', EntryController.updateEntry);

export default entryRoutes;
