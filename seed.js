const db = require('./server/db')
const {User, Record, Order, RecordOrder} = require('./server/db/models')
const records = require('./seedData/recordsData')
const orders = require('./seedData/ordersData')
const recordOrders = require('./seedData/recordOrderData.js')

const seed = async () => {
  await db.sync({force: true})

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const addRecordsTasks = []
  records.forEach(record => {
    addRecordsTasks.push(Record.create(record))
  })
  const seedRecords = await Promise.all(addRecordsTasks)

  const addOrdersTasks = []
  orders.forEach(order => {
    addOrdersTasks.push(Order.create(order))
  })
  const seedOrders = await Promise.all(addOrdersTasks)

  const addRecordOrdersTasks = []
  recordOrders.forEach(recordOrder => {
    addRecordOrdersTasks.push(RecordOrder.create(recordOrder))
  })
  const seedRecordOrders = await Promise.all(addRecordOrdersTasks)

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
