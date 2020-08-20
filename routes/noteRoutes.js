const router = require('express').Router()
const fs = require('fs')
const { join } = require('path')
const uuid = require('uuid')


// all of these routes are for our API
// GET all items from the db.json file
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
    // parse the json data so its not a string anymore
    let notes = JSON.parse(data)
    // create a 'note' object with the following keys:
    let note = {
      // give the id a unique id with the uuid dependency
      id: uuid.v1(),
      // put the req.body properties into the title and text
      title: req.body.title,
      text: req.body.text,
    }
    // push the note object into the notes array
    notes.push(note)
    // now write the updated array to the db.json file as a string again
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
    })
    res.json(note)
  })
})



// DELETE one item BY ITS UNIQUE ID
router.delete('/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    // filter out the note that has an ID EQUAL to the param ID (delete the note object and KEEP the rest)
    notes = notes.filter(note => note.id !== req.params.id)


    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
    })
    // send ok status code
    res.sendStatus(200)
  })
})

module.exports = router