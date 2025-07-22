import { Router } from 'express';
import { EntryController } from '@controllers/entryController';
import { verifyTokenMiddleware } from '@services/jwt';

const entryRoutes = Router();

entryRoutes.use('/', verifyTokenMiddleware);

entryRoutes.post('/', EntryController.createEntry);
entryRoutes.get('/', EntryController.getEntries);
entryRoutes.put('/:id', EntryController.updateEntry);

export default entryRoutes;
