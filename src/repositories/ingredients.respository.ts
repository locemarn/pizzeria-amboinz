import { Prisma, PrismaClient } from '@prisma/client'
import { IngredientsInterface } from '../interface/ingredients.interface'
import { Ingredients } from '../models'

export class IngredientsRepository implements IngredientsInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  async create(data: Ingredients): Promise<Ingredients> {
    try {
      return await this._prisma.ingredients.create({ data })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.error(e.message)
        }
      }
      throw e
    }
  }
  delete(id: number): Promise<Ingredients> {
    try {
      return this._prisma.ingredients.delete({
        where: { id },
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.error(e.message)
        }
      }
      throw e
    }
  }
}
