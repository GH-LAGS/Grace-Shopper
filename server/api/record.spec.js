/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Records = db.model('Record')

describe('Record routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/records/', () => {
    beforeEach(() => {
      return Records.create({
        title: 'Moon',
        artist: 'David Bowie',
        year: '1980',
        imgURL: './bowie.jpg',
        price: 22
      })
    })

    it('GET /api/records', async () => {
      const res = await request(app)
        .get('/api/records')
        .expect(200)
      expect(res.body[0].title).to.be.equal('Moon')
    })
  }) // end describe('/api/records')
}) // end describe('Record routes')
