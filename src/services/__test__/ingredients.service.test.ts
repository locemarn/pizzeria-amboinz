import { IngredientsInterface } from '../../interface/ingredients.interface'
import { MockIngredientsRepository } from '../../repositories/mocks/mockIngredients.repository'
import { IngredientsService } from '../ingredients.service'

describe('Ingredients Service', () => {
  let repository: IngredientsInterface

  beforeEach(() => {
    repository = new MockIngredientsRepository()
  })

  afterEach(() => {
    repository = {} as MockIngredientsRepository
  })

  describe('Create Ingredient', () => {
    test('should create a new ingredient', async () => {
      const requestBody = {
        ingredient: 'ingredient',
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
        ingredient: 'ingredient',
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
      const mockId = 1
      const service = new IngredientsService(repository)
      const sut = await service.deleteIngredient(mockId)

      expect(sut.id).not.toBeNull()
      expect(sut).toMatchObject({
        id: expect.any(Number),
        ingredient: expect.any(String),
      })
    })
  })
})
