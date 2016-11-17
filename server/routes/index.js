'use strict'
// require our database and init our router
const db = require('../../db')
const express = require('express')
const router = express.router()

// routing here
router
  .use('/pathOne', require('./pathOne'))
  .use('/pathTwo', require('./pathTwo'))

// Send along any errors
router.use((err, req, res, next) => {
  res.status(500).send(err)
})

// No routes matched? 404.
router.use((req, res) => res.status(404).end())
