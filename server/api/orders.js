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
      // Find Order
      order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'pending'
        },
        include: {model: Record}
      })

      // Calculate totalPrice
      let totalPrice = 0
      const recordOrders = await RecordOrder.findAll({
        where: {
          orderId: order.id
        }
      })
      for (let i = 0; i < recordOrders.length; i++) {
        const item = recordOrders[i]
        const lineTotal = item.soldPrice * item.quantity
        totalPrice += lineTotal
      }
      // To-Do Should also decrease stock (Also check on front-end on all-products page)
      order = await Order.update(
        {
          date: new Date().toString(),
          address: req.body.address,
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
      console.log('CART', req.session.cart)
      const guestCart = req.session.cart.cartRecords
      let totalPrice = 0
      order = await Order.create({
        date: new Date().toString(),
        address: req.body.address,
        status: 'complete'
      })
      // Create RecordOrders
      for (const cartRecord of guestCart) {
        //update totalPrice and quantity
        const record = await Record.findByPk(cartRecord.recordId)
        totalPrice += record.price * cartRecord.quantity
        console.log(record.price * cartRecord.quantity)
        const newRecordOrder = await RecordOrder.create({
          orderId: order.id,
          recordId: record.id,
          quantity: cartRecord.quantity,
          soldPrice: record.price
        })
      }
      order.totalPrice = totalPrice
      await order.save()
      req.session.cart = {cartRecords: []}
    }
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})
