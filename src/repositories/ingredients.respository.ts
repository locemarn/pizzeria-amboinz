import { Prisma, PrismaClient } from '@prisma/client'
import { IngredientsInterface } from '../interface/ingredients.interface'
import { Ingredients } from '../models'
import prisma from '../libs/prisma/mocks/client'

export class IngredientsRepository implements IngredientsInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async create(data: Ingredients): Promise<Ingredients> {
    try {
      if (!data || !data.ingredient || data.ingredient === '')
        throw new Error('Ingredient value must be provide.')
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

  async delete(id: number): Promise<Ingredients> {
    try {
      if (!id) throw new Error('id must be provide.')
      return await this._prisma.ingredients.delete({
        where: { id },
        select: {
          id: true,
          ingredient: true,
        },
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.error('error message', e.message)
        }
      }
      throw e
    }
  }
}
