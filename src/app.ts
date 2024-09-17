import cors from 'cors';
import express from 'express';

import { configureRoutes } from './router';

const app = express();

app.use(cors());
app.use(express.json());

configureRoutes(app);

export default app;
