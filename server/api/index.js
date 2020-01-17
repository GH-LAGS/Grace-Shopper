const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/records', require('./records'))
router.use('/orders', require('./orders'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
