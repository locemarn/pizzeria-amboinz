import { IngredientsInterface } from '../interface/ingredients.interface'
import { Ingredients } from '../models'

export class IngredientsService {
  private _repository: IngredientsInterface

  constructor(repository: IngredientsInterface) {
    this._repository = repository
  }

  async createIngredient(input: Ingredients) {
    const result = await this._repository.create(input)
    if (!result.id) {
      throw new Error('unable to create an ingredient.')
    }
    return result
  }

  async deleteIngredient(id: number) {
    const result = await this._repository.delete(id)
    if (!result) throw new Error('unable to delete an ingredient.')
    return result
  }
}
