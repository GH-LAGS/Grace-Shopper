const router = require('express').Router()
const {Order, RecordOrder, Record} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      console.log(req.user)
      const cart = await Order.findOne({
        where: {
          id: req.user.id,
          status: 'pending'
        },
        include: [{model: Record}]
      })
      res.json(cart)
    }
    if (!req.user) {
      if (req.session.cart) {
        res.send(req.session.cart)
      } else {
        req.session.cart = {}
        res.send(req.session.cart)
      }
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})
