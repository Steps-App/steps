// router
const express = require('express')
const router = express()

// Models
const Workout = require('../../db/models/workout')
const Patient = require('../../db/models/patient')
const Treatment = require('../../db/models/treatment')

/*
  Workout Model
  Fields:
    time_per_exercise: integer, required
    pain: integer, 1-5, required
    comments: text, optional

  Model Methods:
    None

  Associations:
    treatment_id
    plan_id
    patient_id
*/

// PATH: <server-domain>/api/patient/:patientId/plan/:planId/workout/+

// -=-=-= CREATE =-=-=-

// add new workout to a patient's plan
router.post('/', (req, res, next) => {
  Workout.create({
      time_per_exercise: req.body.time,
      pain: req.body.pain,
      comments: req.body.comments,
      treatment_id: req.body.treatmentId,
      plan_id: req.plan.id,
      patient_id: req.patientId
    })
    .then(createdWorkout => {
      res.status(201).json(createdWorkout)
    })
    .catch(next)
})

// -=-=-=-= READ =-=-=-=-

// get all workouts for a patient's plan
router.get('/', (req, res, next) => {
  req.plan.getWorkouts()
    .then(workouts => {
      res.status(200).json(workouts)
    })
    .catch(next)
})

// get a specific workout for a patient
router.get('/:workoutId', (req, res, next) => {
  Workout.findById(req.params.id)
    .then(workout => {
      res.status(200).json(workout)
    })
    .catch(next)
})

module.exports = router
