import { PizzasInterface } from '../../interface/pizzas.interface'
import { prismaMock } from '../../libs/prisma/mocks/singleton'
import { PizzasRepository } from '../pizzas.repository'

describe('Pizzas Repository', () => {
  let repository: PizzasInterface
  const responseValue = {
    id: 1,
    ingredientId: 1,
    name: 'pizza name',
    price: 5,
  }

  beforeEach(() => {
    repository = new PizzasRepository()
  })

  afterEach(() => {
    repository = {} as PizzasRepository
  })

  describe('create', () => {
    test('should create a pizza', async () => {
      const requestBody = {
        name: 'pizza name',
        price: 5,
        ingredientId: 1,
      }
      prismaMock.pizzas.create.mockResolvedValue(responseValue)
      const sut = await repository.create(requestBody)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        ingredientId: expect.any(Number),
        price: expect.any(Number),
        name: expect.any(String),
      })
      expect(sut.id).toEqual(1)
      expect(sut.name).toBe(requestBody.name)
      expect(sut.price).toEqual(requestBody.price)
      expect(sut.ingredientId).toEqual(requestBody.ingredientId)
    })

    test('should return an error when create a pizza', async () => {
      const requestBody = {
        name: 'pizza name',
        price: 5,
        ingredientId: 1,
      }
      prismaMock.pizzas.create.mockRejectedValue(
        new Error('unable to create a pizza.')
      )
      await expect(repository.create(requestBody)).rejects.toThrow(
        'unable to create a pizza.'
      )
    })
  })

  describe('delete', () => {
    test('should delete a pizza', async () => {
      const id = 1

      prismaMock.pizzas.delete.mockResolvedValue(responseValue)
      const sut = await repository.delete(id)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        ingredientId: expect.any(Number),
        price: expect.any(Number),
        name: expect.any(String),
      })
      expect(sut.id).toEqual(1)
      expect(sut.name).toBe(responseValue.name)
      expect(sut.price).toEqual(responseValue.price)
      expect(sut.ingredientId).toEqual(responseValue.ingredientId)
    })

    test('should return an error when delete a pizza', async () => {
      prismaMock.pizzas.delete.mockRejectedValue(
        new Error('unable to delete a pizza.')
      )
      await expect(repository.delete(responseValue.id)).rejects.toThrow(
        'unable to delete a pizza.'
      )
    })
  })
})
