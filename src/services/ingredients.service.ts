import { IngredientsInterface } from '../interface/ingredients.interface'
import { Ingredients } from '../models'
import { IngredientsRepository } from '../repositories/ingredients.respository'

export class IngredientsService {
  private _repository: IngredientsInterface

  constructor(repository: IngredientsRepository) {
    this._repository = repository
  }

  async createIngredient(input: Ingredients) {
    const result = await this._repository.create(input)
    if (!result.id) {
      throw new Error('unable to create a ingredient.')
    }
    return result
  }

  async deleteIngredient(id: number) {
    const result = await this._repository.delete(id)
    return result
  }
}
