const request = require('supertest')
const app = require('../../app')

describe('Test in route "/api/v1/all-articles"', () => {
  test('it should return a status 401 if there is no autheticated token in the request', async () => {
    const response = await request(app).get('/api/v1/all-articles')

    expect(response.status).toBe(401)
  })
})
