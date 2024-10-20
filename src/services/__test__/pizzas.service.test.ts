import { PizzasInterface } from '../../interface/pizzas.interface'
import { prismaMock } from '../../libs/prisma/mocks/singleton'
import { PizzasRepository } from '../../repositories/pizzas.repository'
import { PizzasService } from '../pizzas.services'

describe('PIZZAS SERVICE', () => {
  let repository: PizzasInterface
  const responseValue = {
    id: 1,
    name: 'new pizza',
    price: 5,
    ingredientId: 1,
  }

  beforeEach(() => {
    repository = new PizzasRepository()
  })

  afterEach(() => {
    repository = {} as PizzasRepository
  })
  describe('create', () => {
    test('should create a new pizza', async () => {
      const requestBody = {
        name: 'new pizza',
        price: 5,
        ingredientId: 1,
      }
      prismaMock.pizzas.create.mockResolvedValue(responseValue)
      const service = new PizzasService(repository)
      const sut = await service.createPizza(requestBody)
      expect(sut.id).toEqual(responseValue.id)
      expect(sut.price).toEqual(requestBody.price)
      expect(sut.ingredientId).toEqual(requestBody.ingredientId)
      expect(sut.name).toBe(requestBody.name)
    })
  })

  describe('delete', () => {
    test('should delete a pizza', async () => {
      const requestBody = {
        id: 1,
      }
      prismaMock.pizzas.delete.mockResolvedValue(responseValue)
      const service = new PizzasService(repository)
      const sut = await service.deletePizza(requestBody.id)
      expect(sut.id).toEqual(responseValue.id)
      expect(sut).toMatchObject({
        id: expect.any(Number),
        price: expect.any(Number),
        ingredientId: expect.any(Number),
        name: expect.any(String),
      })
    })
  })
})
