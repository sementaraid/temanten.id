import express, { type Express } from 'express'
import path from 'path'
import { root } from '../constant'

export const setupProdServer = async (app: Express) => {
  const distPath = path.resolve(root, 'dist')

  app.use(express.static(distPath))
}