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

  //create new row in Record
  //!!THIS IS WHERE WE WOULD AFFECT QUANTITY - DOES THE RECORD ALREADY EXIST IN CART? IF SO, SIMPLY CHANGE QUANTITY, DO NOT ADD WHOLE NEW RECORDORDER
  const newRecordOrder = await RecordOrder.create({
    quantity: 1,
    soldPrice: foundRecord.price
  })
  //assign recordorder to record
  newRecordOrder.belongsTo(foundRecord)

  //if logged in
  if (req.user) {
    //find user
    const foundUser = await User.findOne({
      where: {
        id: req.user.id
      }
    })
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
        status: 'pending'
      })
      //create relationship to user
      newCart.belongsTo(foundUser)
      //create relationship of recordorder to order
      newRecordOrder.belongsTo(newCart)
    } else {
      //create relationship of foundcart to existing cart
      newRecordOrder.belongsTo(foundCart)
    }
  }

  //if guest
  if (!req.user) {
    if (!req.session.cart) {
      req.session.cart = {Records: []}
    }
    req.session.cart.Records.push(foundRecord)
    res.send(req.session.cart)
  }
})
