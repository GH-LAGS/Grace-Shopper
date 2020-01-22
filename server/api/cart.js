const router = require('express').Router()
const {Order, RecordOrder, Record, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (!req.user) {
    if (req.session.cart) {
      let cartRecords = req.session.cartRecords
      let records = []
      for (const cartRecord of cartRecords) {
        const record = await Record.findByPk(cartRecord.recordId)
        record.RecordOrder = cartRecord
        records.push(record)
      }
      res.send({Records: records})
    } else {
      req.session.cart = {cartRecords: []}
      res.send({Records: []})
    }
  } else {
    try {
      const cart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'pending'
        },
        include: [{model: Record}]
        //include: quantity from record order
      })
      if (cart) {
        res.json(cart)
      } else {
        res.send({Records: []})
      }
    } catch (error) {
      next(error)
    }
  }
})

router.post('/:id', async (req, res, next) => {
  const id = req.params.id
  //find record matching id
  const foundRecord = await Record.findOne({
    where: {
      id: id
    }
  })
  try {
    let recordOrder
    //if logged in
    if (req.user) {
      //find cart using user id
      const foundCart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'pending'
        },
        include: [{model: Record}]
      })

      //if cart doesn't exist
      if (!foundCart) {
        //create new order
        const newCart = await Order.create({
          status: 'pending',
          userId: req.user.id
        })
        //create new row in RecordOrder and assign foreign
        recordOrder = await RecordOrder.create({
          quantity: 1,
          soldPrice: foundRecord.price,
          recordId: foundRecord.id,
          orderId: newCart.id
        })
        foundRecord.RecordOrder = recordOrder
        res.send({
          Record: foundRecord
        })
      } else {
        //check cart for if recordOrder matching record id already exists
        const duplicate = await RecordOrder.findOne({
          where: {
            orderId: foundCart.id,
            recordId: foundRecord.id
          }
        })

        if (duplicate) {
          await duplicate.update({
            quantity: duplicate.quantity + 1 //check this later
          })
          foundRecord.RecordOrder = duplicate
          res.json({Record: foundRecord})
        } else {
          //create new row in RecordOrder and assign foreign
          recordOrder = await RecordOrder.create({
            quantity: 1,
            soldPrice: foundRecord.price,
            recordId: foundRecord.id,
            orderId: foundCart.id
          })
          foundRecord.RecordOrder = recordOrder
          res.send({
            Record: foundRecord
          })
        }
      }
    }

    //if guest
    if (!req.user) {
      if (!req.session.cart) {
        req.session.cart = {cartRecords: []}
      }
      //is this record a duplicate
      let existingCartRecord = req.session.cart.cartRecords.find(
        cartRecord => cartRecord.recordId === foundRecord.id
      )
      if (existingCartRecord) {
        existingCartRecord.quantity++
      } else {
        existingCartRecord = {
          recordId: foundRecord.id,
          quantity: 1
        }
        req.session.cart.cartRecords.push(existingCartRecord)
      }

      foundRecord.RecordOrder = existingCartRecord
      res.send({Record: foundRecord})
    }
  } catch (error) {
    console.log(error)
  }
})
