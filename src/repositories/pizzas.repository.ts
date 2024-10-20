import { PizzasInterface } from '../interface/pizzas.interface'
import prisma from '../libs/prisma/mocks/client'
import { Pizzas } from '../models'

export class PizzasRepository implements PizzasInterface {
  async create(data: Pizzas[]): Promise<Pizzas[]> {
    return await prisma.pizzas.createManyAndReturn({
      data,
      skipDuplicates: true,
    })
  }

  async delete(name: string): Promise<object> {
    return await prisma.pizzas.deleteMany({
      where: { name },
    })
  }
}
