import db from '../db';
import Plan from '../db/models/plan'
import Treatment from '../db/models/treatment'
import Patient from '../db/models/patient'

// Unit testing libraries
import chai from 'chai'
import {expect} from 'chai'
import Promise from 'bluebird'
import chalk from 'chalk'
// for routes
import app from '../server/app'
import supertest from 'supertest'

const agent = supertest.agent(app)

describe('Plan', () => {
  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log(chalk.yellow('Sync success'))
        done()
      })
      .catch(done)
  })

  after('clear db', () => db.didSync)


/* ===========Testing Inputs================ */

const validPlan = {
  duration: 24,
  therapy_focus: 'Post Tommy John\'s surgery',
  notes: 'Even famous MLB physical therapists use Steps'
}

const invalidPlan = {
  duration: null,
  therapy_focus: null
}

/* ===========Plan Model Tests================ */

describe('Model', () => {

  describe('Creates and validates correctly: ', () => {

    it('Creates a plan with valid input', () => {
      return Plan.create(validPlan)
        .then(createdPlan => {
          expect(createdPlan).to.contain(validPlan)
        })
        .catch(err => console.error(err))
    })

    it('Throws a validation error with invalid input', () => {
      let invalid = Plan.build(invalidPlan)

      return invalid.validate()
        .then(err => {
          expect(err).to.be.an.instanceOf(Error)
          expect(err.message).to.include('notEmpty failed')
        })
        .catch(err => console.log(chalk.green('You got a validation error')))
    })

  })

  describe('InstanceMethods and Hooks: ', () => {

    it('Calculates an end date after creation', () => {
      return Plan.create(validPlan)
        .then(createdPlan => {
          expect(createdPlan.end_date).to.not.equal(null)
        })
        .catch(err => console.error(err))
    })

    it('Has a countdown method that accurately reflects the end date', () => {
      return Plan.create(validPlan)
        .then(createdPlan => {
          let today = new Date()
          expect(createdPlan.countdown(createdPlan)).to.be.closeTo(createdPlan.end_date - today, 10000)
        })
        .catch(err => console.error(err))
    })

  })
})

/* ===========Plan Route Tests================ */

const validPlan2 = {
  id: 1001,
  duration: 24,
  therapy_focus: 'Post Tommy John\'s surgery',
  notes: 'Even famous MLB physical therapists use Steps'
}

describe('Routes', () => {

  before('create a fake patient', () => {
    return Patient.create({
      id: 1001,
      first_name: 'Fake',
      last_name: 'Guy',
      email: 'fakeguy@gmail.com',
      DOB: '01/01/1980',
      gender: 'M'
    })
    .then(ok => console.log(chalk.green('fake patient created')))
    .catch(err => console.error(err))
  })

  after('delete that fake patient', () => {
    return Patient.findById(1001)
      .then(patient => patient.destroy())
      .then(ok => console.log(chalk.green('patient deleted')))
      .catch(err => console.error(err))
  })

  const validTreatment = {
      id: 1001,
      time: 300,
      reps: 10,
      sets: 3,
      resistance: 'weighted',
  }

  describe('Creates: ', () => {

    it('POST /:patientId >> Creates a Plan and Associated Treatments', (done) => {
      agent
        .post('/api/plan/1001')
        .set('Content-type', 'application/json')
        .send({
          plan: validPlan2,
          treatments: [validTreatment]
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body.plan).to.include(validPlan)
          expect(res.body.treatments[0]).to.include({ time_per_exercise: 300 })
          done()
        })
    })
  })

  before('ensures a fake plan exists', () => {
    return Plan.create({
      id: 1001,
      duration: 24,
      therapy_focus: 'Post Tommy John\'s surgery',
      notes: 'Even famous MLB physical therapists use Steps',
      patient_id: 1001
    })
  })

  before('ensures a fake treatment associated to the fake plan exists', () => {
    return Treatment.create({
      id: 1001,
      time: 300,
      reps: 10,
      sets: 3,
      resistance: 'weighted',
      plan_id: 1001
    })
  })

  describe('Reads: ', () => {

    it('GET /:patientId >> Gets all plans for a patient', (done) => {
      agent
        .get('/api/plan/1001')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body[0]).to.include(validPlan)
          done()
        })
    })

    it('GET /:patientId/:planId >> Gets a single plan with treatments for a patient', (done) => {
      agent
        .get('/api/plan/1001/1001')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body.plan).to.include(validPlan2)
          expect(res.body.treatments[0]).to.include({ reps: 10, sets: 3 })
          done()
        })
    })
  })

  describe('Updates: ', () => {

    it('PUT /:patientId/:planId >> Updates a plan for a patient', (done) => {
      agent
        .put('/api/plan/1001/1001')
        .set('Content-type', 'application/json')
        .send({
          treatments: [{
            time: 600,
            reps: 15,
            sets: 3,
            resistance: 'weighted',
            exercise_id: 2,
            plan_id: 1001,
            patient_id: 1001
          }],
          deactive: [1001]
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body[0]).to.include({ status: 'inactive' })
          expect(res.body[1]).to.include({ time_per_exercise: 600 })
          done()
        })
    })
  })

  describe('Deletes: ', () => {

    xit('DELETE /:patientId/:planId >> Deletes a plan for a patient', (done) => {
      agent
        .del('/api/plan/1001/1001')
        .expect(204, done)
    })
  })
})
})
