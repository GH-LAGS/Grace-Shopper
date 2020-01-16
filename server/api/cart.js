const router = require('express').Router()
const {Order, RecordOrder, Record} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const userOrders = await Order.findOne({
      where: {
        id: id
      },
      include: [{model: Record}]
    })
    res.json(userOrders)
  } catch (err) {
    console.log(err)
    next(err)
  }
})
