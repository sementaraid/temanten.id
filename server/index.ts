import express, { Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';

import config from './config';
import { setupDevServer } from './http/dev'
import { setupProdServer } from './http/prod'
import authRoutes from './routes/auth.route'
import pageRoutes from './routes/page.route'
import commentRoutes from './routes/comments.route'

const app = express()

const PORT = config.isProduction ? 3001 : 3000

// Middleware
app.disable('x-powered-by')
app.set('strict routing', false);
app.use(morgan('tiny'));
app.use(cors())
app.use(express.json());
app.use(cookieParser())

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'API is running' });
});

// API Routes
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(config.swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);

// Public and private route handler
app.use('/', pageRoutes);

if (!config.isProduction) {
  setupDevServer(app)
} else {
  setupProdServer(app)
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})

