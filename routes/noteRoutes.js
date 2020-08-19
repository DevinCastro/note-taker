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

  // res.json(items)
})

// POST one item
router.post('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    let note = {
      id: uuid.v1(),
      text: req.body.text,
    }
    notes.push(note)
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
    })
    // console.log(notes)
    res.json(note)
  })
})

// PUT one item
// router.put('/notes/:text', (req, res) => {
//   fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
//     if (err) { console.log(err) }

//     let items = JSON.parse(data)

//     for (i = 0; i < items.length; i++) {
//       if (items[i].text === req.params.text) {
//         items[i].isDone = req.body.isDone
//       }
//     }
//     fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(items), err => {
//       if (err) { console.log(err) }
//       res.sendStatus(200)
//     })

//   })

// })

// DELETE one item
router.delete('/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    notes = notes.filter(note => note.id !== req.params.id)


    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
    })
    // console.log(notes)
    // send ok status code
    res.sendStatus(200)
  })
})

module.exports = router