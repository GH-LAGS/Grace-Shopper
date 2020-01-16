const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('Order', {
  date: {
    type: Sequelize.STRING,
    allowNull: true
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Order
