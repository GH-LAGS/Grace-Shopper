const Sequelize = require('sequelize')
const db = require('../db')

const RecordOrder = db.define('RecordOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = RecordOrder
