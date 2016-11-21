// init our router
const router = require('express').Router();

// modular routers
const therapist = require('./therapist')
const patient = require('./patient')
const plan = require('./plan')
const routetemplate = require('./routetemplate')

// routing here
router
  .use('/therapist', therapist)
  .use('/patient', patient)
  .use('/plan', plan)
  .use('/routetemplate', routetemplate)

// No API routes matched? 404.
router.use((req, res) => res.status(404).end())

module.exports = router;
