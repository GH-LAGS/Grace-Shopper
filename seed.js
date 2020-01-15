const db = require('./server/db')
const {User, Record, Order, RecordOrder} = require('./server/db/models')
const records = require('./records')

const seed = async () => {
  await db.sync({force: true})
  const seedRecords = await Record.bulkCreate(records, {returning: true})
  console.log('Seeding successful')
  console.log('Added data:', seedRecords)
}

seed().catch(err => {
  db.close()
  console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `)
})
