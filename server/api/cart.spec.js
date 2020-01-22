/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Order, RecordOrder, Record} = require('../db/models')
const {User} = require('../db/models')

describe('User/Order association', () => {
  let fakeOrder, fakeUser
  beforeEach(async () => {
    fakeUser = await User.create({
      id: 5,
      email: 'fake@gmail.com'
    })

    fakeOrder = await Order.create({
      date: 'Jan 12',
      totalPrice: 3900,
      address: '4122 Lomar',
      status: 'pending',
      userId: 5
    })
  })

  describe('Order', () => {
    it('fills data', async () => {
      let result = await Order.findAll()
      expect(result[0].totalPrice).to.equal(3900)
    })
  })
})

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
    beforeEach(() => {
      Order.create({
        id: 1,
        date: 'Jan 12',
        totalPrice: 3900,
        address: '4122 Lomar',
        status: 'pending'
      })
    })

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200)
    })
    it('data is served in preferred structure', async () => {
      const res = await request(app).get('/api/cart')
      expect(res.body.Records).to.be.an('array')
    })
  })
})
