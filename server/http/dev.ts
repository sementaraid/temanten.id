import { type Express } from 'express'
import fs from 'fs'
import path from 'path'
import { root } from '../constant'

export const setupDevServer = async (app: Express) => {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({
    root,
    appType: 'custom',
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
  app.use('{*any}', async (req, res, next) => {
    try {
      const url = req.originalUrl

      // 1. Read raw index.html
      let html = fs.readFileSync(
        path.resolve(root, 'index.html'),
        'utf-8'
      )

      // 2. Auth state
      const token = req.cookies?.token
      let user = {}

      if (token) {
        try {
          const payload = token.split('.')[1]
          const decoded = Buffer.from(payload, 'base64url').toString('utf-8')
          user = JSON.parse(decoded)
        } catch (e) {
          user = {}
        }
      }

      const authState = {
        isLoggedIn: Boolean(token),
        user,
      }

      // 3. Inject state
      html = await vite.transformIndexHtml(url, html)
      html = html.replace(
        '</head>',
        `<script id="__auth_script__">window.__AUTH__ = ${JSON.stringify(authState)}</script></head>`
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })
}