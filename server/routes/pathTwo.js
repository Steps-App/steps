// router
const express = require('express')
const router = express()

// db models, if any
const { Therapist, Patient } = require('../../db/models') // <-- CHANGE

// -=-=-= CREATE =-=-=-

// add something
router.post('/', (req, res, next) => {

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
