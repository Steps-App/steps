import db from '../db'
import Workout from '../db/models/workout'
// Unit testing libraries
import chai from 'chai'
const expect = chai.expect;
import chalk from 'chalk'

describe('Workout Model', () => {
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
