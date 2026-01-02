import express, { type Express } from 'express'
import path from 'path'
import { root } from '@server/constant'
import fs from 'fs'
import { distVersion } from '../../app.config'

export const setupProdServer = async (app: Express) => {
  const clientDistPath = path.resolve(root, 'dist', distVersion, 'client')
  const serverDistPath = path.resolve(root, 'dist', distVersion, 'server')
  const ssrBundle = path.resolve(serverDistPath, 'ssr.js')

  // Load the SSR bundle
  const { renderApp } = await import(`file://${ssrBundle}`)

  app.use(express.static(clientDistPath, {
    index: false
  }))
  app.use(express.static(serverDistPath, {
    index: false
  }))

  app.use('{*any}', async (req, res) => {
    try {
      let html = fs.readFileSync(
        path.resolve(clientDistPath, 'index.html'),
        'utf-8'
      )

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

      // Render the app with SSR
      const { helmetContext, redirect } = await renderApp({
        url: req.originalUrl,
      })

      if (redirect) {
        res.redirect(redirect.status, redirect.location || '/')
        return
      }

      /// 3. Inject state
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
      console.error('SSR error:', e)
      res.status(500).send('Internal Server Error')
    }
  })
}