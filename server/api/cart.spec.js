/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Order} = require('../db/models')
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
