jest.mock('../../../models/article-schema.js')
import * as datos from '../../../models/article-schema'
const request = require('supertest')
const app = require('../../../app')

describe('Test in end-point "/api/v1/admin/create-article"', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('it should return a status code 500 if an error occurs in the database when saving the data', async () => {
    jest.spyOn(datos, 'createNewArticleUsingSchema').mockResolvedValue({ error: true })

    const response = await request(app)
        .post('/api/v1/admin/create-article')
        .send({
          admin: "Vidal",
          image: "http://lorempixel.com/640/480/animals",
          category: "general",
          name: "milk",
          price: "45",
          description: 'A delicious milk'
        })
    expect(response.status).toBe(500)
  })

  test('should return a status code 201 and object with the propierties message: string and data: object data, when the data is saved correctly in the database', async () => {
    jest.spyOn(datos, 'createNewArticleUsingSchema').mockResolvedValue(
      {
        error: false,
        message: 'save in datatabase',
        data: {
          admin: 'Damian',
          image: 'http://lorempixel.com/640/480/people',
          category: 'general',
          name: 'milk',
          price: '60',
          description: 'a delicious milk'
        }
      }
    )

    const response = await request(app)
    .post('/api/v1/admin/create-article')
    .send({
      admin: "Vidal",
      image: "http://lorempixel.com/640/480/animals",
      category: "general",
      name: "milk",
      price: "45",
      description: 'a delicious milk'
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      data: {
        admin: expect.any(String),
        category: expect.any(String),
        description: expect.any(String),
        image: expect.any(String),
        name: expect.any(String),
        price: expect.any(String),
      },
      message: expect.any(String)
    })
  })

})
