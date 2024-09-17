import { Router } from 'express';

import { validate } from '../../middlewares/validate.middleware';
import intentController from './intent.controller';
import { createIntentSchema } from './intent.schema';

const router = Router();

router.post('/', validate(createIntentSchema), intentController.createIntent);

export default router;
