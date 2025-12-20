import { type Express } from 'express'
import { root } from '../constant'

export const setupDevServer = async (app: Express) => {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({
    root,
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
}