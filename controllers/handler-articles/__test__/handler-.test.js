const request = require('supertest')
const app = require('../../../app')

describe('Get Endpoints', () => {

  it('End-point "/api" must return json', async () => {
    
    res = await request(app).get('/api')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      "message": "Ready"
    })
  })
  
})
