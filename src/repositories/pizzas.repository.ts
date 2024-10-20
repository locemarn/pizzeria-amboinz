import { PizzasInterface } from '../interface/pizzas.interface'
import prisma from '../libs/prisma/mocks/client'
import { Pizzas } from '../models'

export class PizzasRepository implements PizzasInterface {
  async create(data: Pizzas): Promise<Pizzas> {
    return await prisma.pizzas.create({ data })
  }

  async delete(id: number): Promise<Pizzas> {
    return await prisma.pizzas.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        ingredientId: true,
      },
    })
  }
}
