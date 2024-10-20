import { PizzasInterface } from '../../interface/pizzas.interface'
import { prismaMock } from '../../libs/prisma/mocks/singleton'
import { PizzasRepository } from '../pizzas.repository'

describe('Pizzas Repository', () => {
  let repository: PizzasInterface
  const responseValue = [
    {
      id: 1,
      ingredientId: 1,
      name: 'pizza name',
      price: 5,
    },
  ]

  beforeEach(() => {
    repository = new PizzasRepository()
  })

  afterEach(() => {
    repository = {} as PizzasRepository
  })

  describe('create', () => {
    test('should create a pizza', async () => {
      const requestBody = [
        {
          name: 'pizza name',
          price: 5,
          ingredientId: 1,
        },
      ]
      prismaMock.pizzas.createManyAndReturn.mockResolvedValue(responseValue)
      const sut = await repository.create(requestBody)

      expect(sut[0]).toMatchObject({
        id: expect.any(Number),
        ingredientId: expect.any(Number),
        price: expect.any(Number),
        name: expect.any(String),
      })
      expect(sut[0].id).toEqual(1)
      expect(sut[0].name).toBe(requestBody[0].name)
      expect(sut[0].price).toEqual(requestBody[0].price)
      expect(sut[0].ingredientId).toEqual(requestBody[0].ingredientId)
    })

    test('should return an error when create a pizza', async () => {
      const requestBody = [
        {
          name: 'pizza name',
          price: 5,
          ingredientId: 1,
        },
      ]
      prismaMock.pizzas.createManyAndReturn.mockRejectedValue(
        new Error('unable to create a pizza.')
      )
      await expect(repository.create(requestBody)).rejects.toThrow(
        'unable to create a pizza.'
      )
    })
  })

  describe('delete', () => {
    test('should delete a pizza', async () => {
      const name = 'new pizza'

      prismaMock.pizzas.deleteMany.mockResolvedValue({
        count: responseValue.length,
      })
      const sut = await repository.delete(name)

      expect(sut).toMatchObject({
        count: expect.any(Number),
      })
    })

    test('should return an error when delete a pizza', async () => {
      const name = 'new pizza'

      prismaMock.pizzas.deleteMany.mockRejectedValue(
        new Error('unable to delete a pizza.')
      )
      await expect(repository.delete(name)).rejects.toThrow(
        'unable to delete a pizza.'
      )
    })
  })
})
