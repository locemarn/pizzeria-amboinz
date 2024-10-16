import request from 'supertest'
import express from 'express'
import ingredientRoutes, { ingredientsService } from '../ingredients.routes'

const app = express()
app.use(express.json())
app.use(ingredientRoutes)

describe('Ingredients Routes', () => {
  describe('POST /ingredients', () => {
    test('should create an ingredient with success.', async () => {
      const requestBody = {
        ingredient: 'new ingredient',
      }

      jest
        .spyOn(ingredientsService, 'createIngredient')
        .mockImplementationOnce(() =>
          Promise.resolve({ id: 1, ...requestBody })
        )

      const sut = await request(app)
        .post('/')
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toEqual(201)
      expect(sut.body.result.ingredient).toEqual(requestBody.ingredient)
      expect(sut.body.result).toMatchObject({
        id: expect.any(Number),
        ingredient: expect.any(String),
      })
    })

    test('should throw an error when create an ingredient.', async () => {
      const requestBody = {
        ingredient: 'new ingredient',
      }

      jest
        .spyOn(ingredientsService, 'createIngredient')
        .mockImplementationOnce(() =>
          Promise.reject(new Error('unable to create an ingredient.'))
        )

      const sut = await request(app)
        .post('/')
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toEqual(500)
      expect(sut.body).toBe('unable to create an ingredient.')
    })
  })

  describe('DELETE /ingredients/:id', () => {
    test('should delete an ingredient with success.', async () => {
      const requestBody = {
        ingredient: 'new ingredient',
      }

      jest
        .spyOn(ingredientsService, 'createIngredient')
        .mockImplementationOnce(() =>
          Promise.resolve({ id: 1, ...requestBody })
        )

      const ingredientCreated = await request(app)
        .post('/')
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log(' created', ingredientCreated.body.result.id)

      jest
        .spyOn(ingredientsService, 'deleteIngredient')
        .mockImplementationOnce(() =>
          Promise.resolve(ingredientCreated.body.result)
        )

      const sut = await request(app)
        .delete(`/${ingredientCreated.body.result.id}`)
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toEqual(200)
      expect(sut.body.result.id).toEqual(ingredientCreated.body.result.id)
      expect(sut.body.result.ingredient).toEqual(
        ingredientCreated.body.result.ingredient
      )
      expect(sut.body.result).toMatchObject({
        id: expect.any(Number),
        ingredient: expect.any(String),
      })
    })

    test('should throw an error when create an ingredient.', async () => {
      const requestBody = {
        id: 1,
      }

      jest
        .spyOn(ingredientsService, 'deleteIngredient')
        .mockImplementationOnce(() =>
          Promise.reject(new Error('unable to delete an ingredient.'))
        )

      const sut = await request(app)
        .delete(`/${requestBody.id}`)
        .set('Accept', 'application/json')

      expect(sut.status).toEqual(500)
      expect(sut.body).toBe('unable to delete an ingredient.')
    })
  })
})
