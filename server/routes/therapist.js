// therapistRoutes
const express = require('express')
const therapistRoutes = express()

// db models
const db = require('../../db/')
const therapistModel  = db.model('therapist')
const patientModel  = db.model('patient')
const exerciseModel  = db.model('exercise')

// email helpers
const EmailTemplate = require('email-templates').EmailTemplate;
const utils = require('../utils');
const path = require('path');

// dummy data
const patientData = require('../../db/Seed/patientSeed.json')

//testestetstets
therapistRoutes.get('/data', (req, res) => {

  res.send({code: Math.floor(Math.random()*(patientData.length))})
  
})

//Route is '/api/therapist'


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

// delete one exercise for the therapist
therapistRoutes.delete('/:id/exercises/:exerciseId', (req, res, next) => {
  exerciseModel.destroy({ where:{ id: req.params.exerciseId } })
    .then(() => res.sendStatus(204))
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
    emr_id: req.body.emrId,
    DOB, gender, img_URL // random seed data!
  })
    .then(patient => {

      if (!process.env.SENDGRID_API_KEY) res.status(201).send(patient);

      // Send welcome email to the new patient
      const welcome = new EmailTemplate(path.resolve(__dirname, '..', 'email_templates', 'patient_welcome'))
      welcome.render({
        first_name: patient.first_name,
        password: patient.password
      })
      .then( renderedEmail => {
        utils.sendEmail(
          process.env.EMAIL, 								// sender
          patient.email,										// recipient
          `Welcome to Steps!`,		          // subject
          renderedEmail.html,					      // html message
          "text/html",                      // type
          (statusCode, err) => {
            if (err) return next(err);
            res.status(201).send(patient);
          }
        );
      })
    })
    .catch(next);
})

module.exports = therapistRoutes
