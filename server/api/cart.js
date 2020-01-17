const router = require('express').Router()
const {Order, RecordOrder, Record} = require('../db/models')
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

//for the view past orders get, use findall and no status validator
