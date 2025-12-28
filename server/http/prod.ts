import express, { type Express } from 'express'
import path from 'path'
import fs from 'fs'
import { root } from '../constant'
import { distVersion } from '../../app.config'

export const setupProdServer = async (app: Express) => {
  const distPath = path.resolve(root, 'dist', distVersion)
  const indexHtml = path.join(distPath, 'index.html')

  app.use(express.static(distPath))
  app.use('{*any}', (req, res) => {
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

    let html = fs.readFileSync(indexHtml, 'utf-8')
    html = html.replace(
      '</head>',
      `<script id="__auth_script__">window.__AUTH__ = ${JSON.stringify(authState)}</script></head>`
    )

    res.status(200).type('html').send(html)
  })
}
