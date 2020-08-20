const express = require('express')
const { join } = require('path')

const app = express()

// declare middleware
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Bring in all the routes from the routes folder
app.use(require('./routes'))


// set the app to listen on a port. Use process enviornment for Heroku OR port 3000.
app.listen(process.env.PORT || 3000)