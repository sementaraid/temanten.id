import express, { type Request, type Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';

import config from '@server/config';
import { setupDevServer } from '@server/http/dev'
import { setupProdServer } from '@server/http/prod'
import authRoutes from '@server/routes/auth.route'
import invitationRoutes from '@server/routes/invitation.route'
import pageRoutes from '@server/routes/page.route'
import guestResponseRoutes from '@server/routes/guest-response.route'
import guestListRoutes from '@server/routes/guest-list.route'

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
app.use('/api/invitation', invitationRoutes);
app.use('/api/guest-responses', guestResponseRoutes);
app.use('/api/guest-list', guestListRoutes);

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

