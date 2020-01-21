const router = require('express').Router()
const {Order, RecordOrder, Record} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
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
      order = await Order.update(
        {status: 'completed'},
        {
          where: {
            userId: req.user.id,
            status: 'pending'
          }
        }
      )
    } else {
      // Guest -> create complete order
      // move lower to calc total price (need to for both guest & user)
      order = await Order.create({
        date: req.date,
        totalPrice: 0,
        address: req.address,
        status: 'complete'
      })
      // need to check if RecordOrder exists and quantity++
      // reduce quantity of Records
      cart.Records.forEach(record => {
        RecordOrder.create({
          orderId: order.id,
          recordId: record.id,
          quantity: 1,
          soldPrice: record.price
        })
      })
      req.session.cart = {Records: []}
    }
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})
