// therapistRoutes
const express = require('express')
const therapistRoutes = express()

// db models
const db = require('../../db/')
const therapistModel  = db.model('therapist')
const patientModel  = db.model('patient')
const exerciseModel  = db.model('exercise')

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

module.exports = therapistRoutes
