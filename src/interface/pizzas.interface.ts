import { Pizzas } from '../models'

export interface PizzasInterface {
  create(data: Pizzas): Promise<Pizzas>
  delete(id: number): Promise<Pizzas>
}
