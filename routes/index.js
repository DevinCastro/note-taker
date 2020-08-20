const router = require('express').Router()
const { join } = require('path')

router.use('/api', require('./noteRoutes.js'))
router.use('/', require('./htmlRoutes.js'))


module.exports = router