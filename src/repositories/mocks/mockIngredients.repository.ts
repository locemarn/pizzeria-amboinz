import { IngredientsInterface } from '../../interface/ingredients.interface'
import { Ingredients } from '../../models'

export class MockIngredientsRepository implements IngredientsInterface {
  create(data: Ingredients): Promise<Ingredients> {
    const mockIngredient = {
      id: 1,
      ...data,
    } as Ingredients

    return Promise.resolve(mockIngredient)
  }
  delete(id: number): Promise<Ingredients> {
    const mockIngredient = {
      id,
      ingredient: 'ingredient name',
    } as Ingredients

    return Promise.resolve(mockIngredient)
  }
}
