import request from 'supertest'
import express from 'express'
import pizzasRoutes, { pizzasService } from '../pizzas.routes'

const app = express()
app.use(express.json())
app.use(pizzasRoutes)

describe('Pizzas Routes', () => {
  describe('POST create pizza', () => {
    test('should create a new pizza', async () => {
      const requestBody = {
        name: 'new pizza',
        price: 5,
        ingredients: [1, 2],
      }

      jest.spyOn(pizzasService, 'createPizza').mockImplementationOnce(() =>
        Promise.resolve([
          {
            id: 1,
            name: requestBody.name,
            price: requestBody.price,
            ingredientId: 1,
          },
          {
            id: 2,
            name: requestBody.name,
            price: requestBody.price,
            ingredientId: 2,
          },
        ])
      )

      const sut = await request(app)
        .post('/')
        .send(requestBody)
        .set('Accept', 'application/json')

      expect(sut.status).toEqual(201)
      expect(sut.body.result[0]).toMatchObject({
        id: expect.any(Number),
        price: expect.any(Number),
        ingredientId: expect.any(Number),
        name: expect.any(String),
      })
      expect(sut.body.result).toHaveLength(requestBody.ingredients.length)
    })
  })

  describe('DELETE delete pizza', () => {
    test('should delete a pizza', async () => {
      const requestBody = {
        name: 'new pizza',
      }

      jest
        .spyOn(pizzasService, 'deletePizza')
        .mockImplementationOnce(() => Promise.resolve({ count: 2 }))

      const sut = await request(app)
        .delete('/')
        .send(requestBody)
        .set('Accept', 'application/json')

      expect(sut.status).toEqual(200)
      expect(sut.body.result).toMatchObject({
        count: expect.any(Number),
      })
    })
  })
})
