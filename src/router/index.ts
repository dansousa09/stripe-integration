import type { Application } from 'express';

import intentRouter from '../modules/intent/intent.routes';

export function configureRoutes(app: Application): void {
  app.use('/api/intent', intentRouter);
}
