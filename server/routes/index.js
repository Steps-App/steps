// init our router
const router = require('express').Router();

// modular routers
const therapist = require('./therapist')
const patient = require('./patient')
const routetemplate = require('./routetemplate') 

// routing here
router
  .use('/therapist', therapist)
  .use('/patient', patient)
  .use('/routetemplate', routetemplate)

// Send along any errors
router.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || err)
})

// No API routes matched? 404.
router.use((req, res) => res.status(404).end())

module.exports = router;
