const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('Order', {
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Order
