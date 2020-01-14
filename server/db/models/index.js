const User = require('./user')
const Record = require('./record')
const Order = require('./order')
const RecordOrder = require('./recordOrder.js')

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Record, {
  through: RecordOrder,
  foreignKey: 'orderId',
  otherKey: 'recordId'
})
Record.belongsToMany(Order, {
  through: RecordOrder,
  foreignKey: 'recordId',
  otherKey: 'orderId'
})

module.exports = {
  User,
  Record,
  Order,
  RecordOrder
}
