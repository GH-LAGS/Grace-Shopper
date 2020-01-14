const {expect} = require('chai')
const db = require('../db')
const {Order, Record, User} = require('../models/')

describe('Order model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `date`, `totalPrice`, and `address`', async () => {
      const order = await Order.create({
        date: 'Tue Jan 14 2020 16:20:39 GMT -0500',
        totalPrice: 50,
        address: '50 Broadway Street, NY 11111'
      })
      expect(order.date).to.equal('Tue Jan 14 2020 16:20:39 GMT -0500')
      expect(order.totalPrice).to.equal(50)
      expect(order.address).to.equal('50 Broadway Street, NY 11111')
    })
  })
})

describe('Record model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `date`, `totalPrice`, and `address`', async () => {
      const record = await Record.create({
        title: 'Nevermind',
        artist: 'Nirvana',
        year: 1991,
        price: 20,
        genre: 'Alternative'
      })
      expect(record.title).to.equal('Nevermind')
      expect(record.artist).to.equal('Nirvana')
      expect(record.price).to.equal(20)
      expect(record.genre).to.equal('Alternative')
      expect(record.year).to.equal(1991)
    })
  })
})

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    })
  })
})
