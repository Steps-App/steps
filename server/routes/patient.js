// patientRoutes
const express = require('express')
const patientRoutes = express()

// db models
const db = require('../../db/')
const patientModel  = db.model('patient')
const planModel = db.model('plan')
const therapistModel  = db.model('therapist')
const treatmentModel  = db.model('patient')
const workoutModel  = db.model('therapist')

// -=-=-= CREATE =-=-=-

// create patient
patientRoutes.post('/', (req, res, next) => {
  patientModel.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    DOB: req.body.dob,
    gender: req.body.gender,
    img_URL: req.body.imgUrl
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
patientRoutes.get('/:id', function(req, res, next){
  patientModel.findOne({
    where: { id: req.params.id },
    include: [
      { model: planModel, as: 'plan', required: false },
      { model: treatmentModel, as: 'treatment', required: false },
      { model: workoutModel, as: 'workout', required: false },
    ]
  })
  .then(patient => res.send(patient))
  .catch(next);
});

//get one patient with plan
//NEED TO UPDATE BASED ON DATA FOR FrontEnd **THIS ROUTE IS AN EXAMPLE**
patientRoutes.get('/:id/plan', function(req, res, next){
  planModel.findAll({
    where: { id: req.params.id },
    include: [
      { model: treatmentModel, required: false }
    ]
  })
  .then(plan => res.send(plan))
  .catch(next);
});


// -=-=-=-= UPDATE =-=-=-=-

// modify patient info
patientRoutes.put('/:id', (req, res, next) => {
  patientModel.findById(req.params.id)
    .then(patient => patient.update(req.body))
    .then(updated => res.status(201).send(updated))
    .catch(next);
})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete patient
patientRoutes.delete('/:id', (req, res, next) => {
  patientModel.destroy({where:{id: req.params.id}})
      .then(() => res.sendStatus(204))
      .catch(next);
})

module.exports = patientRoutes
