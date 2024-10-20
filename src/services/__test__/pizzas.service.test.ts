/* eslint-disable @typescript-eslint/no-explicit-any */
import { PizzasInterface } from '../../interface/pizzas.interface'
import { prismaMock } from '../../libs/prisma/mocks/singleton'
import { PizzasRepository } from '../../repositories/pizzas.repository'
import { PizzasService } from '../pizzas.services'

describe('PIZZAS SERVICE', () => {
  let repository: PizzasInterface
  const responseValue = [
    {
      id: 1,
      name: 'new pizza',
      price: 5,
      ingredientId: 1,
    },
  ]

  beforeEach(() => {
    repository = new PizzasRepository()
  })

  afterEach(() => {
    repository = {} as PizzasRepository
  })
  describe('create', () => {
    test('should create a new pizza', async () => {
      const requestBody = [
        {
          name: 'new pizza',
          price: 5,
          ingredientId: 1,
        },
      ]
      prismaMock.pizzas.createManyAndReturn.mockResolvedValue(responseValue)
      const service = new PizzasService(repository)
      const sut = await service.createPizza(requestBody)
      expect(sut[0].id).toEqual(responseValue[0].id)
      expect(sut[0].price).toEqual(requestBody[0].price)
      expect(sut[0].ingredientId).toEqual(requestBody[0].ingredientId)
      expect(sut[0].name).toBe(requestBody[0].name)
    })
  })

  describe('delete', () => {
    test('should delete a pizza', async () => {
      const requestBody = {
        name: 'new pizza',
      }
      prismaMock.pizzas.deleteMany.mockResolvedValue({
        count: responseValue.length,
      })
      const service = new PizzasService(repository)
      const sut: any = await service.deletePizza(requestBody.name)

      expect(sut).toMatchObject({
        count: expect.any(Number),
      })
    })
  })
})
