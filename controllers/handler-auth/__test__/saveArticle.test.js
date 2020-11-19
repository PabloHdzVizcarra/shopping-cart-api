jest.mock('../create-article/saveArticleInDatabase')
const helpers = require('../create-article/saveArticleInDatabase')
const request = require('supertest')
const app = require('../../../app')

describe('Test in end-point "/api/v1/admin/create-article"', () => {

  test('when the correct data is send to the end-point, it must be saved in the database and the response must have a 201 code', async () => {
    jest.spyOn(helpers, 'saveArticleInDatabase')
      .mockReturnValue({
          error: false,
          message: "Articulo guardado con exito",
          data: {
            _id: "39c01bdf-57a5-478f-baf9-648890410c80",
            name: "milk",
            category: "general",
            price: "60",
            admin: "Rosalee",
            image: "http://lorempixel.com/640/480",
          }
      })
  
    const response = await request(app)
        .post('/api/v1/admin/create-article')
        .send({
          admin: "Vidal",
          image: "http://lorempixel.com/640/480/animals",
          category: "general",
          name: "milk",
          price: "45"
        })
    expect(helpers.saveArticleInDatabase).toHaveBeenCalled()
    expect(response.status).toBe(201)
  })

  test('with the correct data, the end-point must return an object sith the error, data and message properties, and the data property must contain the data of the article saved in the database', async () => {
    const response = await request(app)
    .post('/api/v1/admin/create-article')
    .send({
      admin: "Vidal",
      image: "http://lorempixel.com/640/480/animals",
      category: "general",
      name: "milk",
      price: "45"
    })

    expect(helpers.saveArticleInDatabase).toHaveBeenCalled()
    expect(response.body).toHaveProperty('error')
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toEqual({
      _id: "39c01bdf-57a5-478f-baf9-648890410c80",
      name: "milk",
      category: "general",
      price: "60",
      admin: "Rosalee",
      image: "http://lorempixel.com/640/480",
    })
  })

  test('when an error occurs in the database, the response muts have a 400 code', async () => {
    jest.spyOn(helpers, 'saveArticleInDatabase')
    .mockReturnValue({
      error: true,
      message: "ha ocurrido un error en la database",
    })
    const response = await request(app)
    .post('/api/v1/admin/create-article')
    .send({
      admin: "Vidal",
      image: "http://lorempixel.com/640/480/animals",
      category: "general",
      name: "milk",
      price: "45"
    })
  
    expect(helpers.saveArticleInDatabase).toHaveBeenCalled()
    expect(response.status).toBe(400)
  })
  
  test('when an error occurs in the database, and object with the error property equivalent to true and a message with the error information must be returned', async () => {
    jest.spyOn(helpers, 'saveArticleInDatabase')
    .mockReturnValue({
      error: true,
      message: "ha ocurrido un error en la database",
    })
    const response = await request(app)
    .post('/api/v1/admin/create-article')
    .send({
      admin: "Vidal",
      image: "http://lorempixel.com/640/480/animals",
      category: "general",
      name: "milk",
      price: "45"
    })

    expect(helpers.saveArticleInDatabase).toHaveBeenCalled()
    expect(response.body).toHaveProperty('error')
    expect(response.body).toHaveProperty('message')
    expect(response.body).toEqual({
      error: true,
      message: "ha ocurrido un error en la database",
    })

  })
  
  
})
