/* eslint-disable @typescript-eslint/no-explicit-any */
import { IngredientsInterface } from '../../interface/ingredients.interface'
import { prismaMock } from '../../libs/prisma/mocks/singleton'
import { IngredientsRepository } from '../ingredients.respository'

describe('Ingredients Repository', () => {
  let repository: IngredientsInterface
  const responseValue = {
    id: 1,
    ingredient: 'new ingredient',
  }

  beforeEach(() => {
    repository = new IngredientsRepository()
  })

  afterEach(() => {
    repository = {} as IngredientsRepository
  })

  describe('create', () => {
    test('should create an ingredient', async () => {
      const requestBody = {
        ingredient: 'new ingredient',
      }
      prismaMock.ingredients.create.mockResolvedValue(responseValue)
      const sut = await repository.create(requestBody)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        ingredient: expect.any(String),
      })
      expect(sut.id).toEqual(1)
      expect(sut.ingredient).toBe(requestBody.ingredient)
    })

    test('should throw an error when create an ingredient provided a null value', async () => {
      const requestBody = {
        ingredient: null as unknown as any,
      }
      await expect(repository.create(requestBody)).rejects.toThrow(
        'Ingredient value must be provide.'
      )
    })

    test('should throw an error when create an ingredient with an empty string', async () => {
      const requestBody = {
        ingredient: '',
      }
      await expect(repository.create(requestBody)).rejects.toThrow(
        'Ingredient value must be provide.'
      )
    })

    test('should throw an error when create an ingredient with an empty string', async () => {
      const requestBody = {
        ingredient: 'assdasd',
      }
      prismaMock.ingredients.create.mockRejectedValue(
        new Error('unable to create a pizza.')
      )
      await expect(repository.create(requestBody)).rejects.toThrow(
        'unable to create a pizza.'
      )
    })
  })

  describe('delete', () => {
    test('should delete an ingredient', async () => {
      const id = 1
      prismaMock.ingredients.delete.mockResolvedValue(responseValue)
      const sut = await repository.delete(id)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        ingredient: expect.any(String),
      })
      expect(sut.id).toEqual(id)
      expect(sut.ingredient).toBe(responseValue.ingredient)
    })

    test('should throw an error when delete a pizza if id is not provided', async () => {
      await expect(repository.delete(null as any)).rejects.toThrow(
        'id must be provide.'
      )
    })

    test('should throw an error when delete a pizza.', async () => {
      prismaMock.ingredients.delete.mockRejectedValue(
        new Error('unable to delete a pizza.')
      )
      await expect(repository.delete(1)).rejects.toThrow(
        'unable to delete a pizza.'
      )
    })
  })
})
