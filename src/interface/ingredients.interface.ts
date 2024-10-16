import { Ingredients } from '../models'

export interface Ingredientsnterface {
  create(data: Ingredients): Promise<Ingredients>
  delete(id: number): Promise<Ingredients>
}
