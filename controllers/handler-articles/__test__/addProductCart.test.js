const request = require('supertest')
const app = require('../../../app')

describe('Test end-point "/api/add-product-cart"', () => {

  it('should return json , if the correct data is sent to the end-point', async () => {

    const res = await request(app)
      .post('/api/add-product-cart')
      .send({
        name: "Pizza",
        price: 200
      })
      .set('Accept', 'application/json')
    
    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
  })
  
  it('it must return a json with the data of the product created from the database', async () => {
    const res = await request(app)
      .post('/api/add-product-cart')
      .send({
        name: "Pizza",
        price: 200
      })
      .set('Accept', 'application/json')
    
    const data = JSON.parse(res.text)

    expect(data).toEqual({
      result: true,
      errors: false,
      savedArticle: {
        _id: expect.any(String),
        name: expect.any(String),
        price: expect.any(Number),
        __v: 0
      }
    })
    
  })

  it('must return an json with an error property of true if the data sent to the end-point is incorrect', async () => {
    const res = await request(app)
      .post('/api/add-product-cart')
      .send({
        name: "Pizza",
      })
      .set('Accept', 'application/json')
    
    const data = JSON.parse(res.text)
    expect(res.status).toBe(400)
    expect(data.error).toBeTruthy()
  })
  
})
