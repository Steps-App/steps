'use strict'

// dependency requires
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk')
const express = require('express')
const { resolve } = require('path')
const passport = require('passport')
const app = express()  // invoke router as 'app'

// routes
const routes = require('./routes')

// server constant(s)
const PORT = 3030

// init router ('app')
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(morgan('dev'))          // logging in 'dev' mode
  .use(express.static(resolve(__dirname, '..', 'public')))  // static file server
  .use('/', routes)            // database-served api routes
  .use(passport.initialize())  // passport auth middleware
  .use(passport.session())

// default routing
app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))
})

// racers, start your engines!
app.listen(PORT, err => {
  if (err) throw err
  console.log(chalk.green(`Server listening on port: ${PORT}`))
})

// export it, of course
module.exports = app
