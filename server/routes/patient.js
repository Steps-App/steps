// patientRoutes
const express = require('express')
const patientRoutes = express()
const planRoutes = require('./plan')

// db models
const db = require('../../db/')
const patientModel  = db.model('patient')
const planModel = db.model('plan')
const therapistModel  = db.model('therapist')
const treatmentModel  = db.model('treatment')
const workoutModel  = db.model('workout')

// -=-=-= PARAM HANDLER =-=-=-=-
// to pass patientId onward for plan routing (see very bottom for that routing)
patientRoutes.param('patientId', (req, res, next, id) => {
  req.patientId = id
  next()
})

// -=-=-= CREATE =-=-=-

// create patient
patientRoutes.post('/', (req, res, next) => {
  patientModel.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    DOB: req.body.DOB,
    gender: req.body.gender,
    img_URL: req.body.img_URL,
    password: req.body.password
  })
  .then(patient => res.status(201).send(patient))
  .catch(next);
})

// -=-=-=-= READ =-=-=-=-

// get all patients
patientRoutes.get('/', (req, res, next) => {
  patientModel.findAll()
    .then(patients => res.send(patients))
    .catch(next);
})

//get one patient with all data
patientRoutes.get('/:patientId', function(req, res, next){
  patientModel.findOne({
    where: { id: req.patientId },
    include: [
      { model: planModel,
        required: false
      },
      { model: treatmentModel,
        required: false
      },
      { model: workoutModel,
        required: false
      }
    ]
  })
  .then(patient => res.send(patient))
  .catch(next);
});

// -=-=-=-= UPDATE =-=-=-=-

// modify patient info
patientRoutes.put('/:patientId', (req, res, next) => {
  patientModel.findById(req.patientId)
    .then(patient => patient.update(req.body))
    .then(updated => res.status(201).send(updated))
    .catch(next);
})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete patient
patientRoutes.delete('/:patientId', (req, res, next) => {
  patientModel.destroy({where:{id: req.patientId}})
      .then(() => res.sendStatus(204))
      .catch(next);
})

// -=-=-=-=-= PATIENT PLAN ROUTING =-=-=-=-=-=-

patientRoutes.use('/:patientId/plan', planRoutes)

module.exports = patientRoutes
