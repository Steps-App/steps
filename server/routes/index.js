// init our router
const router = require('express').Router();

// modular routers
const therapistRoute = require('./therapistRoute')
const pathTwo = require('./pathTwo')

// routing here
router
  .use('/therapist', therapistRoute)
  .use('/pathTwo', pathTwo)

// No API routes matched? 404.
router.use((req, res) => res.status(404).end())

module.exports = router;
