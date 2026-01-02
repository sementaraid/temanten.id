import { type Express } from 'express'
import fs from 'fs'
import path from 'path'
import { root } from '@server/constant'

export const setupDevServer = async (app: Express) => {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({
    root,
    appType: 'custom',
    server: { middlewareMode: true },
    configFile: path.resolve(root, '.vite', 'dev.config.ts')
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

      const { renderApp } = await vite.ssrLoadModule(path.resolve(process.cwd(), 'src', 'entry-server.ts'))
      const { redirect, helmetContext } = await renderApp({ url })

      if (redirect) {
        res.redirect(redirect.status, redirect.location || '/')
        return
      }

      // 3. Inject state
      const { helmet } = helmetContext
      const helmetTitle = helmet?.title?.toString() ?? ''
      const helmetMeta = helmet?.meta?.toString() ?? ''
      const helmetLink = helmet?.link?.toString() ?? ''

      // 9. Inject helmet tags into <head>
      const defaultTitle = '<title>Undangan Pernikahan</title>'
      const shouldRenderHelmetTitle = helmetTitle !== '<title data-rh="true"></title>'

      if (html.includes(defaultTitle) && shouldRenderHelmetTitle) {
        html = html.replace(defaultTitle, helmetTitle)
      }

      html = html.replace(
        '</head>',
        `
        ${helmetMeta}
        ${helmetLink}
        <script id="__auth_script__">window.__AUTH__ = ${JSON.stringify(authState)}</script></head>
        `
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })
}