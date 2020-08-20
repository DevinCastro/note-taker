const router = require('express').Router()
const { join } = require('path')


// bring in all routes from htmlRoutes and apiRoutes
router.use('/api', require('./noteRoutes.js'))
router.use('/', require('./htmlRoutes.js'))


module.exports = router