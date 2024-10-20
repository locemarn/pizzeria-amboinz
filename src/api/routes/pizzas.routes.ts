/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express'
import { PizzasService } from '../../services/pizzas.services'
import { PizzasRepository } from '../../repositories/pizzas.repository'

const router = express.Router()

export const pizzasService = new PizzasService(new PizzasRepository())

router.post('/', async (req: Request, res: Response): Promise<any> => {
  const { name, price, ingredients } = req.body
  const ingredientsPizza = ingredients.map((ingredient: number) => ({
    name,
    price,
    ingredientId: ingredient,
  }))

  try {
    const result = await pizzasService.createPizza(ingredientsPizza)
    return res.status(201).json({ result })
  } catch (error) {
    // console.error('create ingredient router error => ', error)
    const err = error as Error
    return res.status(500).json(err.message)
  }
})

router.delete('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await pizzasService.deletePizza(req.body.name)
    return res.status(200).json({ result })
  } catch (error) {
    // console.error('delete ingredient router error => ', error)
    const err = error as Error
    return res.status(500).json(err.message)
  }
})

export default router
