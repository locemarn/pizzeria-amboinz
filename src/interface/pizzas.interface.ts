import { Pizzas } from '../models'

export interface PizzasInterface {
  create(data: Pizzas[]): Promise<Pizzas[]>
  delete(name: string): Promise<object>
}
