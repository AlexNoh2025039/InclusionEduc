import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { manejarErrores } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));

app.use('/api', routes);

app.use(manejarErrores);

export default app;