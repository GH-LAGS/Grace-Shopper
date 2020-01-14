const Sequelize = require('sequelize')
const db = require('../db')

const Record = db.define('Record', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imgURL: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING
  }
})

module.exports = Record
