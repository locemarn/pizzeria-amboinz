import { IngredientsInterface } from '../interface/ingredients.interface'
import { Ingredients } from '../models'

export class IngredientsRepository implements IngredientsInterface {
  create(data: Ingredients): Promise<Ingredients> {
    console.log('data', data)

    throw new Error('Method not implemented.')
  }
  delete(id: number): Promise<Ingredients> {
    console.log('id', id)

    throw new Error('Method not implemented.')
  }
}
