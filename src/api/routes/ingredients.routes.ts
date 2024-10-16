/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express'
import { IngredientsService } from '../../services/ingredients.service'
import { IngredientsRepository } from '../../repositories/ingredients.respository'

const router = express.Router()

export const ingredientsService = new IngredientsService(
  new IngredientsRepository()
)

router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await ingredientsService.createIngredient(req.body)
    return res.status(201).json({ result })
  } catch (error) {
    // console.error('create ingredient router error => ', error)
    const err = error as Error
    return res.status(500).json(err.message)
  }
})

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.id) ?? 0
    const result = await ingredientsService.deleteIngredient(userId)
    return res.status(200).json({ result })
  } catch (error) {
    // console.error('delete ingredient router error => ', error)
    const err = error as Error
    return res.status(500).json(err.message)
  }
})

export default router
