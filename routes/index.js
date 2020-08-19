const router = require('express').Router()
const { join } = require('path')

router.use('/api', require('./noteRoutes.js'))
router.use('/', require('./viewRoutes.js'))



// router.get('/notes', (req, res) => {
//   res.sendFile(join(__dirname, '..', 'public', 'notes.html'))
// })


// router.get('*', (req, res) => {
//   res.sendFile(join(__dirname, '..', 'public', 'index.html'))
// })


module.exports = router