import express from 'express'
import ingredientRoutes from './api/routes/ingredients.routes'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'everything worls well.' })
})

app.use('/ingredients', ingredientRoutes)

export default app
