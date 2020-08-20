const router = require('express').Router()
const { join } = require('path')


// HTML route to send the user to the notes.html page when the param is /notes
router.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'notes.html'))
})

// this is the catch all for when the url is ANYTHING ELSE
router.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})



module.exports = router