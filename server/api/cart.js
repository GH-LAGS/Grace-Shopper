const router = require('express').Router()
const {Order, RecordOrder, Record} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      const userOrders = await Order.findOne({
        where: {
          id: req.user.id,
          status: pending
        },
        include: [{model: Record}]
      })
      res.json(userOrders)
    } else {
      console.log('Not logged in')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})
