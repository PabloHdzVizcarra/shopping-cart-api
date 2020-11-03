const request = require('supertest')
const app = require('../../app')
const handler = require('../../controllers/handler-articles')

describe('Test in router app', () => {

  it('if the URI "/api" is requested you must call handler addProductCart', async() => {
    const getAllArticles = jest.spyOn(handler, 'getAllArticles')
    
    const res = await request(app)
      .get("/api")
    
    expect(getAllArticles).toHaveBeenCalled()
  })
  
})
