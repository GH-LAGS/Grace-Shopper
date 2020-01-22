const router = require('express').Router()
const {Order, RecordOrder, Record} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      console.log('found user')
      const userOrders = await Order.findAll({
        where: {
          userId: req.user.id,
          status: 'completed'
        },
        include: [{model: Record}]
      })
      res.json(userOrders)
    } else {
      console.log('Not logged in')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order
    // User -> change order to complete
    if (req.user) {
      // calculate total price, add date, address
      // find order first
      order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'pending'
        },
        include: {model: Record}
      })
      console.log('ORDER', order.id)

      const recordOrders = await RecordOrder.findAll({
        where: {
          orderId: order.id
        }
      })
      console.log('RECORDS', recordOrders)

      let totalPrice = 0

      for (let i = 0; i < recordOrders.length; i++) {
        const item = recordOrders[i]
        const lineTotal = item.soldPrice * item.quantity
        totalPrice += lineTotal
      }

      console.log(totalPrice)

      order = await Order.update(
        {
          date: new Date().toString(),
          address: req.address, //add address
          status: 'completed',
          totalPrice: totalPrice
        },
        {
          where: {
            userId: req.user.id,
            status: 'pending'
          }
        }
      )
    } else {
      // Guest -> create complete order
      const guestCart = req.session.cart.Records
      let totalPrice = 0
      order = await Order.create({
        date: new Date(),
        address: 'req.address',
        status: 'complete'
      })
      // Create RecordOrders or update existing
      const createdRecordOrders = []
      guestCart.Records.forEach(async record => {
        //update totalPrice and quantity
        totalPrice += record.price
        record.decrement('quantity')
        const createdRecordOrder = createdRecordOrders.find(
          recordOrder => recordOrder.title === record.title
        )
        if (createdRecordOrder) {
          await createdRecordOrder.increment('quantity')
        } else {
          const newRecordOrder = await RecordOrder.create({
            orderId: order.id,
            recordId: record.id,
            quantity: 1,
            soldPrice: record.price
          })
          createdRecordOrders.push({[record.title]: newRecordOrder})
        }
      })
      order.totalPrice = totalPrice
      order.save()
      req.session.cart = {Records: []}
    }
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})
