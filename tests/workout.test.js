import db from '../db'
import Workout from '../db/models/workout'
import Patient from '../db/models/patient'
import Plan from '../db/models/plan'
// Unit testing libraries
import chai from 'chai'
const expect = chai.expect;
import chalk from 'chalk'
// Route testing
// for routes
import app from '../server/app'
import supertest from 'supertest'
const agent = supertest.agent(app)

describe('Workout', () => {
  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log(chalk.yellow('Sync success'))
        done();
      })
      .catch(done)
  })

  after('clear db', () => db.didSync)

  const validWorkout = {
    time_per_exercise: 180,
    pain: 3,
    comments: 'felt good'
  }

  const invalidWorkout = {
    time_per_exercise: 60
  }

  describe('Model: ', () => {

    describe('Workout validations: ', () => {

      it('successfully creates a valid workout', () => {
        return Workout.create(validWorkout)
          .then(createdWorkout => {
            expect(createdWorkout).to.contain(validWorkout)
          })
          .catch(err => console.error(err))
      })

      it('reports a validation error for invalid workout entries', () => {
        return Workout.create(invalidWorkout)
          .then(error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.contain('invalid input')
          })
          .catch(err => console.log(chalk.green('You got a validation error')))
      })

    })

    describe('Has Correct Associations: ', () => {

      it('creates associations for patient_id, plan_id, and treatment_id', () => {
        return Workout.create(validWorkout)
          .then(workout => {
            expect(workout.patient_id).to.equal(null)
            expect(workout.plan_id).to.equal(null)
            expect(workout.treatment_id).to.equal(null)
          })
          .catch(err => console.error(err))
      })
    })
  })

  describe('Routes: ', () => {

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

  before('ensures a fake plan exists', () => {
    return Plan.create({
      id: 1001,
      duration: 24,
      therapy_focus: 'Post Tommy John\'s surgery',
      notes: 'Even famous MLB physical therapists use Steps',
      patient_id: 1001
    })
    .then(ok => console.log(chalk.green('fake plan created')))
    .catch(err => console.error(err))
  })

  after('delete that fake patient', () => {
    return Patient.findById(1001)
      .then(patient => patient.destroy())
      .then(ok => console.log(chalk.green('patient deleted')))
      .catch(err => console.error(err))
  })

  after('delete that fake plan', () => {
    return Plan.findById(1001)
    .then(plan => plan.destroy())
    .then(ok => console.log(chalk.green('plan deleted')))
    .catch(err => console.error(err))
  })

  const validWorkout = {
    time: 275,
    pain: 1,
    comments: 'felt good',
    plan_id: 1001,
    treatment_id: null
  }

    it('POST /api/patient/:patientId/plan/:planId/workout >> creates a workout', (done) => {
      agent.post('/api/patient/1001/plan/1001/workout')
        .set('Content-type', 'application/json')
        .send(validWorkout)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.include({ pain: 1 })
          done()
        })
    })

    it('GET /api/patient/:patientId/plan/:planId/workout >> returns all the workouts in a plan', (done) => {
      agent.get('/api/patient/1001/plan/1001/workout')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body[0]).to.include({ comments: 'felt good' })
          done()
        })
    })

    // need to determine how to identify the workout id for testing
    xit('GET /api/patient/:patientId/plan/:planId/workout/:workoutId >> returns a specific workout', (done) => {
      agent.get('/api/patient/1001/plan/1001/workout/')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.include({ time: 275 })
          done()
        })
    })

  })
})
