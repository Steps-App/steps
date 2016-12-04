// router
const express = require('express')
const router = express()
const workoutRoutes = require('./workout')

// Plan Model
const sequelize = require('sequelize')
const Plan = require('../../db/models/plan')
const Patient = require('../../db/models/patient')
const Treatment = require('../../db/models/treatment')
const Workout = require('../../db/models/workout')
const Exercise = require('../../db/models/exercise')

/*
  Plan Model
  Fields:
    duration: integer, defaults to 1
    end_date : date (computed)
    therapy_focus: string
    notes: text

  Model Methods (Instance):
    endDateCalc(plan) => calculates date for 'end_date' via afterCreate hook
    countdown(plan) => outputs how many ms are remaining

  Associations:
    patient_id
    plan.getWorkouts/setWorkouts
    plan.getTreatments/setTreatments
*/

// PATH: <server-domain>/api/patient/:patientId/plan/+

// -=-=-= PARAM HANDLING =-=-=-

// check to ensure planId in route param is valid
router.param('planId', (req, res, next, id) => {
  Plan.findById(id)
    .then(plan => {
      if (!plan) return res.status(404).send('Plan not found')
      req.plan = plan  // if so, attach plan to request
      next()
    })
    .catch(next)
})

// -=-=-= CREATE =-=-=-

// add new plan to database and any associated treatments
router.post('/', (req, res, next) => {
  Plan.create({
      duration: req.body.plan.duration,  // weeks
      therapy_focus: req.body.plan.therapyFocus,
      notes: req.body.plan.notes,
      patient_id: req.patientId,       // passed via router param handler on patient routes
      treatments: req.body.treatments
    }, {
      include: [ Treatment ]  // IMPORTANT: treatment props must exactly equal table cols
    })
    .then(createdPlan => {
      let plan = {
        plan: createdPlan,                  // pass back created plan
        treatments: createdPlan.treatments  // and treatments
      }
      res.status(201).json(plan)
    })
    .catch(next)
  })

// -=-=-=-= READ =-=-=-=-

// get all plans for a patient (higher level plan view)
router.get('/', (req, res, next) => {
  Plan.findAll({
      where: {
        patient_id: req.patientId  // passed via param handler on patient routes
      }
    })
    .then(plans => {
      res.json(plans)
    })
    .catch(next)
})

// Get the patient's current (most recent) plan
router.get('/current', (req, res, next) => {
  Plan.findOne({
      where: { patient_id: req.patientId },
      order: [['created_at', 'DESC']]
    })
    .then(res => {
      if (res) {
      return Plan.findById(res.id, {
        include: [ {
          model: Treatment,
          where: { status: 'active' },
          include: [ Exercise, Workout ]
        } ]
      })}
    })
    .then(plan => {
      res.json(plan)
    })
    .catch(next)
})

// get a specific plan for a patient with associated treatments/workouts
router.get('/:planId', (req, res, next) => {
  Plan.findOne({
    where: { id: req.params.planId },
    include: [{
      model: Treatment,
      where: { status: 'active' },
      include: [ Exercise, Workout ]
    }]
  })
    .then(plan => {
      res.json(plan)
    })
    .catch(next);
})

// get a specific treatment from within a specific plan
router.get('/:planId/treatment/:treatmentId', (req, res, next) => {
  Treatment.findOne({
      where: {
        id: req.params.treatmentId
      },
      include: [ Exercise ]
    })
    .then(treatment => {
      let planAndTreatment = {
        plan: req.plan,
        treatment: treatment
      }
      res.json(planAndTreatment)
    })
    .catch(next)
})

// -=-=-=-= UPDATE =-=-=-=-

// update a plan
// NOTE: this assumes the front-end provides an array of deactivated treatment ids
// as 'deactive' => { req.body.deactive = [67, 70, 71] }
router.put('/:planId', (req, res, next) => {
  req.plan.getTreatments()
    .then(treatments => {
      let deactivating = []  // array for our 'deactive' modify promises
      treatments.forEach(treatment => {
        if (req.body.deactive.includes(treatment.id)) {
          deactivating.push(treatment.deactivate(treatment))  // instance method
        }
      })
      let creating = []  // array for our new treatment create promises
      req.body.treatments.forEach(treatment => {
        if (treatment.id === undefined) {      // if new treatment
          creating.push(Treatment.create({
            time_per_exercise: treatment.time,
            reps: treatment.reps,
            sets: treatment.sets,
            resistance: treatment.resistance,
            notes: treatment.notes || null,    // if undefined, set to null
            exercise_id: treatment.exerciseId
          }))
        }
      })
      return Promise.all([...deactivating, ...creating])  // two arrays
    })
    .then((results) => {
      res.status(201).json(results)  // one array
    })
    .catch(next)
})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete a plan
router.delete('/:planId', (req, res, next) => {
  req.plan.destroy()
    .then(ok => { res.sendStatus(204) })
    .catch()
})

router.use('/:planId/workout', workoutRoutes)

module.exports = router
