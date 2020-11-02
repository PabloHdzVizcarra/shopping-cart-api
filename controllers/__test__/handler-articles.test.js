const request = require('supertest')
const app = require('../../app')

describe('Get Endpoints', () => {

  it('Test endPoint "/"', async () => {
    const res = await request(app)
      .get('/api/')
    const json = JSON.stringify({message: "Ready"})
    
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual(json)
  })
  
  it('Test endPoint POST "/api/add-product-cart"', async () => {
    const res = await request(app)
      .post('/api/add-product-cart')
      .send({
        name: "Hamburguer",
        price: 80
      })
    
    expect(res.statusCode).toBe(201)
    expect(JSON.parse(res.text).result).toBe(true)
  })
  
  it('EndPoint GET "/api/all-products-cart"', async () => {
    const res = await request(app)
      .get("/api/all-products-cart")
    
    expect(res.statusCode).toBe(200)
    expect(typeof res.body).toBe('object')
    
  })
  
})
