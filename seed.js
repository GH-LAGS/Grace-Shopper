const db = require('./server/db')
const {User, Record, Order, RecordOrder} = require('./server/db/models')
const records = require('./seedData/recordsData')
const orders = require('./seedData/ordersData')
const users = require('./seedData/usersData')
const recordOrder = require('./seedData/recordOrderData.js')

const seed = async () => {
  await db.sync({force: true})
  const seedRecords = await Record.bulkCreate(records, {returning: true})
  const seedUsers = await User.bulkCreate(users, {returning: true})
  const seedOrders = await Order.bulkCreate(orders, {returning: true})
  const seedRecordOrders = await RecordOrder.bulkCreate(recordOrder, {
    returning: true
  })
  console.log('Seeding successful')
}

seed().catch(err => {
  db.close()
  console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `)
})
