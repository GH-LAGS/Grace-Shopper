const router = require('express').Router()
const {Order, RecordOrder, Record, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (!req.user) {
    if (req.session.cart) {
      res.send(req.session.cart)
    } else {
      req.session.cart = {Records: []}
      res.send(req.session.cart)
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
      } else {
        console.log('in duplicate else statement')
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
          res.send({record: foundRecord, recordOrder, isDuplicate: true})
        } else {
          //create new row in RecordOrder and assign foreign
          recordOrder = await RecordOrder.create({
            quantity: 1,
            soldPrice: foundRecord.price,
            recordId: foundRecord.id,
            orderId: foundCart.id
          })
          res.send({record: foundRecord, recordOrder, isDuplicate: false})
        }
      }
    }

    //if guest
    if (!req.user) {
      let isDuplicate = false
      if (!req.session.cart) {
        req.session.cart = {Records: []}
      }
      //is this record a duplicate
      const guestDuplicate = req.session.cart.Records.filter(
        record => record.id === foundRecord.id
      )
      if (guestDuplicate.length !== 0) {
        isDuplicate = true
      }
      req.session.cart.Records.push(foundRecord)
      res.send({record: foundRecord, isDuplicate})
    }
  } catch (error) {
    console.log(error)
  }
})
