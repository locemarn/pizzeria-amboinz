import express from 'express'
import ingredientRoutes from './api/routes/ingredients.routes'
import pizzasRoutes from './api/routes/pizzas.routes'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'everything worls well.' })
})

app.use('/ingredients', ingredientRoutes)
app.use('/pizzas', pizzasRoutes)

export default app
