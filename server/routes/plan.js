// router
const express = require('express')
const router = express()

// Plan Model
const Plan = require('../../db/models/plan')
const Patient = require('../../db/models/patient')
const Treatment = require('../../db/models/treatment')

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

// PATH: <server-domain>/api/plan/+

// -=-=-= PARAM HANDLING =-=-=-

// check to ensure patientId in route param is valid
router.param('patientId', (req, res, next, id) => {
  Patient.findById(id)
    .then(patient => {
      if (!patient) return res.status(404).send('Patient not found')
      req.patient = patient  // if so, attach patient to request
      next()
    })
    .catch(next)
})

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
router.post('/:patientId', (req, res, next) => {
  Plan.create({
      duration: req.body.plan.duration,
      therapy_focus: req.body.plan.therapy_focus,
      notes: req.body.plan.notes,
      patient_id: req.patient.id  // param ^^^ attaches patient to req
    })
    .then(createdPlan => {
      let promises = []  // we're going to create one or more treatments via Promise.all
      if (req.body.treatments) {  // there should be at least one treatment, but just in case
          req.body.treatments.forEach(treatment => {
            let promise = Treatment.create({
              time_per_exercise: treatment.time,  // may need modification to timePerExercise, etc.
              reps: treatment.reps,
              sets: treatment.sets,
              resistance: treatment.resistance,
              notes: treatment.notes || null,
              plan_id: createdPlan.id  // here's why we created the plan first
            })
          promises.push(promise)
        })
      return Promise.all([createdPlan, ...promises])
      }
    })
    .spread((createdPlan, ...treatments) => {
      let plan = {
        plan: createdPlan,
        treatments: treatments
      }
      res.status(201).json(plan)
    })
    .catch(err => console.error(err))

})

// -=-=-=-= READ =-=-=-=-

// get all plans for a patient (higher level plan view)
router.get('/:patientId', (req, res, next) => {
  Plan.findAll({
      where: {
        patient_id: req.patient.id  // param ^^^ attaches patient to req
      }
    })
    .then(plans => {
      res.json(plans)
    })
    .catch(err => console.error(err))
})

// get a specific plan for a patient with associated treatments
router.get('/:patientId/:planId', (req, res, next) => {
  Treatment.findAll({
      where: {
        plan_id: req.plan.id  // param ^^^ attaches plan to req
      }
    })
    .then(treatments => {
      let plan = {
        plan: req.plan,         // create new object to send both plan info
        treatments: treatments  // and plan treatments in response
      }
      res.json(plan)
    })
    .catch(err => console.error(err))
})

// -=-=-=-= UPDATE =-=-=-=-

// update a plan
// NOTE: this assumes the front-end provides an array of deactivated treatment ids
// as 'deactivate' => { req.body.deactivate = [67, 70, 71] }
router.put('/:patientId/:planId', (req, res, next) => {
  Treatment.findAll({
      where: {
        plan_id: req.plan.id
      }
    })
    .then(treatments => {
      let deactivating = []
      treatments.forEach(treatment => {
        if (req.body.deactive.includes(treatment.id)) {
          deactivating.push(treatment.deactivate(treatment))
        }
      })
      let creating = []
      req.body.treatments.forEach(treatment => {
        if (treatment.id === undefined) {
          creating.push(Treatment.create({
            time_per_exercise: treatment.time,  // may need modification to timePerExercise, etc.
            reps: treatment.reps,
            sets: treatment.sets,
            resistance: treatment.resistance,
            notes: treatment.notes || null,
            exercise_id: treatment.exerciseId
          }))
        }
      })
      return Promise.all([...deactivating, ...creating])
    })
    .spread((...results) => {
      res.status(201).json(results)
    })
    .catch(err => console.error(err))
})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete a plan
router.delete('/:patientId/:planId', (req, res, next) => {
  req.plan.destroy()
    .then(ok => { res.status(204) })
    .catch()
})

module.exports = router
