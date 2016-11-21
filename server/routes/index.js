// init our router
const router = require('express').Router();

// modular routers
const therapist = require('./therapist')
const patient = require('./patient')

// routing here
router
  .use('/therapist', therapist)
  .use('/patient', patient)

// No API routes matched? 404.
router.use((req, res) => res.status(404).end())

module.exports = router;
