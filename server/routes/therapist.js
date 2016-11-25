// therapistRoutes
const express = require('express')
const therapistRoutes = express()

// db models
const db = require('../../db/')
const therapistModel  = db.model('therapist')
const patientModel  = db.model('patient')
const exerciseModel  = db.model('exercise')

// dummy data
const patientData = require('../../db/Seed/patientSeed.json')

//testestetstets
therapistRoutes.get('/data', (req, res) => {

  res.send({code: Math.floor(Math.random()*(patientData.length))})
  
})

// -=-=-=-= READ =-=-=-=-

// get patients of a therapist 
therapistRoutes.get('/:id', (req, res, next) => {
  therapistModel.findOne({
    where: { id: req.params.id },
    include: [
      { model: patientModel, as: 'patient', required: false }
    ]
  })
    .then(patient => res.send(patient))
    .catch(next);
});

// -=-=-=-= UPDATE =-=-=-=-

// modify something
therapistRoutes.put('/:id', (req, res, next) => {  
  therapistModel.findById(req.params.id)
    .then(therapist => therapist.update(req.body))
    .then(updated => res.status(201).send(updated))
    .catch(next);
})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete something
therapistRoutes.delete('/:id', (req, res, next) => {  // 
  therapistModel.destroy({where:{id: req.params.id}})
    .then(() => res.sendStatus(204))
    .catch(next);
})


/* EXERCISES */

// create a new exercise for the therapist
therapistRoutes.post('/:id/exercises', (req, res, next) => {
  exerciseModel.create({
    therapist_id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.imgUrl,
    vid_url: req.body.vidUrl
  })
    .then(exercise => res.send(exercise))
    .catch(next);
})

// get all exercises for the therapist
therapistRoutes.get('/:id/exercises', (req, res, next) => {
  exerciseModel.findAll({ where:{ therapist_id: req.params.id } })
    .then(exercises => res.send(exercises))
    .catch(next);
})

/* PATIENTS */

// get all patients for a therapist
therapistRoutes.get('/:id/patients', (req, res, next) => {
  patientModel.findAll({ where:{ therapist_id: req.params.id } })
    .then(patients => res.send(patients))
    .catch(next);
})

// create a new patient for the therapist
therapistRoutes.post('/:id/patients', (req, res, next) => {
  // Use random seed data for non-completed fields (for now)
  const { DOB, gender, img_URL } = patientData[Math.floor(Math.random()*(patientData.length))];
  patientModel.create({
    therapist_id: req.params.id,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    DOB, gender, img_URL // random seed data!
  })
    .then(patient => res.send(patient))
    .catch(next);
})

module.exports = therapistRoutes
