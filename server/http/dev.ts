import { type Express } from 'express'
import path from 'path'
import fs from 'fs'

export const setupDevServer = async (app: Express, root: string) => {
  const { createServer: createViteServer } = await import('vite')

  const vite = await createViteServer({
    root,
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
  app.use('/{*any}', async (req, res) => {
    const url = req.originalUrl

    let html = fs.readFileSync(
      path.resolve(root, 'index.html'),
      'utf-8'
    )

    html = await vite.transformIndexHtml(url, html)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })
}