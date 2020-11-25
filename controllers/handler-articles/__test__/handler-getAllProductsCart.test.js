jest.mock(
  '../../../middleware/authenticate-token/authenticatedToken.js',
  () => ({
    authenticatedToken: (req, res, next) => {
      next()
      return null
    },
  })
)
const request = require('supertest')
const schema = require('../../../models/article-schema')

describe('Test in handler /api/v1/all-article', () => {
  test('it must return a response with a status code 500 if there is an error in the connection to the database and it must call the function getAllDataFromArticleSchema', async () => {
    const getAllDataFromArticleSchema = jest
      .spyOn(schema, 'getAllDataFromArticleSchema')
      .mockReturnValue({ error: true, message: 'database error' })
    const app = require('../../../app')

    const response = await request(app)
      .get('/api/v1/all-articles')
      .set('Cookie', ['token=12545454'])

    expect(response.status).toBe(500)
    expect(getAllDataFromArticleSchema).toHaveBeenCalled()
  })

  test('it must return a response with a status code 200 an object with an error property in false and a data property with the data from the database and it must call the function getAllDataFromArticleSchema', async () => {
    const getAllDataFromArticleSchema = jest
      .spyOn(schema, 'getAllDataFromArticleSchema')
      .mockReturnValue({
        error: false,
        message: 'data obtained successfully from the database',
        data: [],
      })
    const app = require('../../../app')

    const response = await request(app)
      .get('/api/v1/all-articles')
      .set('Cookie', ['token=12545454'])

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: expect.any(String),
      data: expect.any(Array),
    })
    expect(getAllDataFromArticleSchema).toHaveBeenCalled()
  })
})
