'use strict'
// init our router
const express = require('express')
const router = express()

// modular routers
const pathOne = require('./pathOne')
const pathTwo = require('./pathTwo')

// routing here
router
  .use('/pathOne', pathOne)
  .use('/pathTwo', pathTwo)

// Send along any errors
router.use((err, req, res, next) => {
  res.status(500).send(err)
})

// No routes matched? 404.
router.use((req, res) => res.status(404).end())
