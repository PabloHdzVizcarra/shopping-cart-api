const request = require('supertest')
const app = require('../../app')
const middleware = require('../../controllers/handler-auth/handler-auth')


describe('Test in router saveArticle', () => {
  
  test('if no data is sent in the body, it must return a status code of 404', async () => {
    const res = await request(app)
      .post("/api/v1/admin/create-article")
    expect(res.status).toBe(404)
  })

  test('when wrong data is sent in the request, the middleware saveArticle should not be called', async () => {
    const saveArticle = jest.spyOn(middleware, 'saveArticle').mockReturnValue('success')
    const res = await request(app)
      .post("/api/v1/admin/create-article")
    expect(res.status).toBe(404)
    expect(saveArticle).not.toHaveBeenCalled()
  })
  
  test('if the name in the body of the request is invalid, it must return an array with an error with the error property', async () => {
    const res = await request(app)
      .post("/api/v1/admin/create-article")
      .send({
        admin: 'pablo',
        image: "www.google.com",
        category: "general",
        price: "15"
      })
    
    console.log(res.body.errors)
    expect(res.body).toEqual({errors: expect.any(Array)})
    expect(res.body.errors.length).toBeGreaterThan(1)
    
  })

  test('if the admin in the body of the request is invalid, it must return an array with an error with the error property', async () => {
    const res = await request(app)
      .post("/api/v1/admin/create-article")
      .send({
        image: "www.google.com",
        category: "general",
        price: "15",
        name: 'Milk'
      })

    expect(res.body).toEqual({errors: expect.any(Array)})
    expect(res.body.errors.length).toBeGreaterThanOrEqual(1)
    
  })

  test('if the image in the body of the request is invalid, it must return an array with an error with the error property', async () => {
    const res = await request(app)
      .post("/api/v1/admin/create-article")
      .send({
        category: "general",
        price: "15",
        name: 'Milk',
        admin: 'jhon'
      })

    expect(res.body).toEqual({errors: expect.any(Array)})
    expect(res.body.errors.length).toBeGreaterThanOrEqual(1)
    
  })

  test('if the price in the body of the request is invalid, it must return an array with an error with the error property', async () => {
    const res = await request(app)
      .post("/api/v1/admin/create-article")
      .send({
        category: "general",
        image: 'www.google.com',
        name: 'Milk',
        admin: 'jhon'
      })

    expect(res.body).toEqual({errors: expect.any(Array)})
    expect(res.body.errors.length).toBeGreaterThan(1)
    
  })

  test('if the category in the body of the request is invalid, it must return an array with an error with the error property', async () => {
    const res = await request(app)
      .post("/api/v1/admin/create-article")
      .send({
        image: 'www.google.com',
        name: 'Milk',
        admin: 'jhon',
        price: 60
      })

    expect(res.body).toEqual({errors: expect.any(Array)})
    expect(res.body.errors.length).toBeGreaterThan(1)
  })

  test('when all data passed in the request is valid you should call the saveArticle middleware', async () => {
    const saveArticle = jest.spyOn(middleware, 'saveArticle').mockReturnValue('success')

    const res = await request(app)
      .post("/api/v1/admin/create-article")
      .send({
        image: 'www.google.com',
        name: 'Milk',
        admin: 'jhon',
        price: 60,
        category: 'general'
      })
    
    expect(res.status).toBe(201)
    saveArticle()  
    expect(saveArticle).toHaveBeenCalled()
  })
})
