/* eslint-disable @typescript-eslint/no-explicit-any */
import { IngredientsInterface } from '../../interface/ingredients.interface'
import { prismaMock } from '../../libs/prisma/mocks/singleton'
import { IngredientsRepository } from '../../repositories/ingredients.respository'
import { IngredientsService } from '../ingredients.service'

describe('Ingredients Service', () => {
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

  describe('Create Ingredient', () => {
    test('should create a new ingredient', async () => {
      prismaMock.ingredients.create.mockResolvedValue(responseValue)
      const requestBody = {
        ingredient: 'new ingredient',
      }
      const service = new IngredientsService(repository)
      const sut = await service.createIngredient(requestBody)

      expect(sut.id).not.toBeNull()
      expect(sut).toMatchObject({
        id: expect.any(Number),
        ingredient: expect.any(String),
      })
      expect(sut.ingredient).toBe(requestBody.ingredient)
    })

    test('should throw error with unable to create ingredient.', async () => {
      const requestBody = {
        ingredient: 'new ingredient',
      }
      const service = new IngredientsService(repository)
      jest
        .spyOn(service, 'createIngredient')
        .mockImplementationOnce(() =>
          Promise.reject(new Error('unable to create an ingredient.'))
        )

      await expect(service.createIngredient(requestBody)).rejects.toThrow(
        'unable to create an ingredient.'
      )
    })
  })

  describe('Delete Ingredient', () => {
    test('should delete an ingredient', async () => {
      prismaMock.ingredients.delete.mockResolvedValue(responseValue)
      const id = 1
      const service = new IngredientsService(repository)
      const sut = await service.deleteIngredient(id)
      console.log('sut ===>', sut)

      expect(sut.id).not.toBeNull()
      expect(sut).toMatchObject({
        id: expect.any(Number),
        ingredient: expect.any(String),
      })
      expect(sut.id).toEqual(id)
      expect(sut.ingredient).toBe(responseValue.ingredient)
    })
  })
})
