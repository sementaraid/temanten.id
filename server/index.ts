import express from 'express'
import { setupDevServer } from './http/dev'
import { setupProdServer } from './http/prod'

const app = express()
const isProd = process.env.NODE_ENV === 'production'

const PORT = 3000
const root = process.cwd()

if (!isProd) {
  setupDevServer(app, root)
} else {
  setupProdServer(app, root)
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})

