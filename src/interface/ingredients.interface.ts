import { Ingredients } from '../models'

export interface IngredientsInterface {
  create(data: Ingredients): Promise<Ingredients>
  delete(id: number): Promise<Ingredients>
}
