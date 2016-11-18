// router
const express = require('express')
const router = express()

// db models, if any
const Therapist = require('../../db/models/therapist')

// -=-=-= CREATE =-=-=-

// add something
router.post('/', (req, res, next) => {
  Therapist.create(req.body)
    .then(therapist = > {
      res.status(201).json(therapist)
    })
    .catch(err => console.log(err.message))
})

// -=-=-=-= READ =-=-=-=-

// get something
router.get('/pathHERE', (req, res, next) => {  // <-- CHANGE

})

// -=-=-=-= UPDATE =-=-=-=-

// modify something
router.put('/pathHERE', (req, res, next) => {  // <--- CHANGE

})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete something
router.delete('/pathHERE', (req, res, next) => {  // <--- CHANGE

})

module.exports = router
