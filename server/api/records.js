const router = require('express').Router()
const {Records} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const records = await Records.findAll()
    res.json(records)
  } catch (err) {
    next(err)
  }
})
