const router = require('express').Router()
const {Record} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const records = await Record.findAll()
    res.json(records)
  } catch (err) {
    next(err)
  }
})
