const request = require('supertest')
const app = require('../../../app')

describe('Test end-point "/api"', () => {

  it('must return json', async () => {
    
    res = await request(app).get('/api')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      "message": "Ready"
    })
  })
  
})
