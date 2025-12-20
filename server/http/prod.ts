import express, { type Express } from 'express'
import path from 'path'

export const setupProdServer = async (app: Express, root: string) => {
  const distPath = path.resolve(root, 'dist')

  app.use(express.static(distPath))
  app.use('/{*any}', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}