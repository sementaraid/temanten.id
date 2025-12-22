import express, { Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors';
import morgan from 'morgan';

import config from './config';
import { setupDevServer } from './http/dev'
import { setupProdServer } from './http/prod'
import authRoutes from './routes/auth.route'

const app = express()
const isProd = process.env.NODE_ENV === 'production'

const PORT = isProd ? 3001 : 3000

// Middleware
app.set('strict routing', false);
app.use(morgan('tiny'));
app.use(cors())
app.use(express.json());

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'API is running' });
});

// API Routes
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(config.swaggerSpec));
app.use('/api/auth', authRoutes);

if (!isProd) {
  setupDevServer(app)
} else {
  setupProdServer(app)
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})

