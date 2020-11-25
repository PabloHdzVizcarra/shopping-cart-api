// const app = require('../../app.js')
// const request = require('supertest')
// const { saveArticle } = require('../../controllers/handler-auth/handler-auth.js')
// jest.mock('../../controllers/handler-auth/handler-auth.js')

describe('Test in router saveArticle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  // test('if no data is sent in the body, it must return a status code of 404', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article')
  //   expect(res.status).toBe(404)
  //   jest.restoreAllMocks()
  // })

  // test('when wrong data is sent in the request, the middleware saveArticle should not be called', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article')
  //   expect(res.status).toBe(404)
  //   expect(saveArticle).not.toHaveBeenCalled()
  // })

  // test('if the name in the body of the request is invalid, it must return an array with an error with the error property', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     admin: 'pablo',
  //     image: 'www.google.com',
  //     category: 'general',
  //     price: '15',
  //   })

  //   expect(res.body).toEqual({ errors: expect.any(Array) })
  //   expect(res.body.errors.length).toBeGreaterThan(1)
  //   expect(saveArticle).not.toHaveBeenCalled()
  // })

  // test('if the admin in the body of the request is invalid, it must return an array with an error with the error property', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     image: 'www.google.com',
  //     category: 'general',
  //     price: '15',
  //     name: 'Milk',
  //   })

  //   expect(res.body).toEqual({ errors: expect.any(Array) })
  //   expect(res.body.errors.length).toBeGreaterThanOrEqual(1)
  //   expect(saveArticle).not.toHaveBeenCalled()
  // })

  // test('if the image in the body of the request is invalid, it must return an array with an error with the error property', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     category: 'general',
  //     price: '15',
  //     name: 'Milk',
  //     admin: 'jhon',
  //   })

  //   expect(res.body).toEqual({ errors: expect.any(Array) })
  //   expect(res.body.errors.length).toBeGreaterThanOrEqual(1)
  //   expect(saveArticle).not.toHaveBeenCalled()
  // })

  // test('if the price in the body of the request is invalid, it must return an array with an error with the error property', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     category: 'general',
  //     image: 'www.google.com',
  //     name: 'Milk',
  //     admin: 'jhon',
  //   })

  //   expect(res.body).toEqual({ errors: expect.any(Array) })
  //   expect(res.body.errors.length).toBeGreaterThan(1)
  //   expect(saveArticle).not.toHaveBeenCalled()
  // })

  // test('if the category in the body of the request is invalid, it must return an array with an error with the error property', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     image: 'www.google.com',
  //     name: 'Milk',
  //     admin: 'jhon',
  //     price: 60,
  //   })

  //   expect(res.body).toEqual({ errors: expect.any(Array) })
  //   expect(res.body.errors.length).toBeGreaterThan(1)
  //   expect(saveArticle).not.toHaveBeenCalled()
  // })

  // test('it should respond with status code 404 if a user id is not sent in the request to the end-point', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     image: 'www.google.com',
  //     name: 'Milk',
  //     admin: 'jhon',
  //     price: 60,
  //     description: 'delicious milk',
  //     category: 'general',
  //   })
  //   expect(res.status).toBe(404)
  // })

  // test('must return a status code 401, if a userID is sent that does not correspond to any user admin saved in the database', async () => {
  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     image: 'www.google.com',
  //     name: 'Milk',
  //     admin: 'jhon',
  //     price: 60,
  //     description: 'delicious milk',
  //     category: 'general',
  //     userID: '00-11-22',
  //   })
  //   expect(res.status).toBe(401)
  //   expect(saveArticle).not.toHaveBeenCalled()
  // })

  // test('you must call the saveArticle function if all the correct data ise sent in the end-point "/api/v1/admin/create-article"', async () => {
  //   const app = require('../../app')

  //   const res = await request(app).post('/api/v1/admin/create-article').send({
  //     image: 'www.google.com',
  //     name: 'Milk',
  //     admin: 'jhon',
  //     price: 60,
  //     description: 'delicious milk',
  //     category: 'general',
  //     userID: '00-11-22',
  //   })

  //   console.log(res.text)
  //   expect(saveArticle).toHaveBeenCalled()
  // })

  test('understand mocks', () => {})
})
