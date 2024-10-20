import { PizzasInterface } from '../interface/pizzas.interface'
import { Pizzas } from '../models'

export class PizzasService {
  private _repository: PizzasInterface

  constructor(repository: PizzasInterface) {
    this._repository = repository
  }

  async createPizza(input: Pizzas[]) {
    const result = await this._repository.create(input)
    if (!result) throw new Error('unable to create a pizza.')
    return result
  }

  async deletePizza(name: string) {
    const result = await this._repository.delete(name)
    if (!result) throw new Error('unable to delete a pizza.')
    return result
  }
}
