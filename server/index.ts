import express from 'express'
import { setupDevServer } from './http/dev'
import { setupProdServer } from './http/prod'

const app = express()
const isProd = process.env.NODE_ENV === 'production'

const PORT = isProd ? 3001 : 3000

if (!isProd) {
  setupDevServer(app)
} else {
  setupProdServer(app)
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})

