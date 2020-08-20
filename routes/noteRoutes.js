const router = require('express').Router()
const fs = require('fs')
const { join } = require('path')
const uuid = require('uuid')


// GET all items
router.get('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    console.log(data)
    res.json(JSON.parse(data))
  })

})

// POST one item
router.post('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    let note = {
      id: uuid.v1(),
      title: req.body.title,
      text: req.body.text,
    }
    notes.push(note)
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
    })
    res.json(note)
  })
})



// DELETE one item
router.delete('/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    notes = notes.filter(note => note.id !== req.params.id)


    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
    })
    // send ok status code
    res.sendStatus(200)
  })
})

module.exports = router