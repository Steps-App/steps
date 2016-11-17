// init our router
const router = require('express').Router();

// modular routers
const pathOne = require('./pathOne')
const pathTwo = require('./pathTwo')

// routing here
router
  .use('/pathOne', pathOne)
  .use('/pathTwo', pathTwo)

// No API routes matched? 404.
router.use((req, res) => res.status(404).end())

module.exports = router;
