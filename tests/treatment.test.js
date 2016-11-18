import db from '../db'
import Treatment from '../db/models/treatment'
// Unit testing libraries
import chai from 'chai'
const expect = chai.expect;
import chalk from 'chalk'

describe('Treatment Model', () => {
  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log(chalk.yellow('Sync success'))
        done();
      })
      .catch(done)
  })

  after('clear db', () => db.didSync)

  const validTreatment = {
    time_per_exercise: 300,
    reps: 20,
    sets: 2,
    resistance: 'none',
    notes: ''
  }

  const invalidTreatment = {
    time_per_exercise: 60,
    reps: null,
    sets: null,
    resistance: '',
    notes: ''
  }

  describe('Treament validations: ', () => {

    it('successfully creates a valid treatment', () => {
      return Treatment.create(validTreatment)
        .then(createdTreatment => {
          expect(createdTreatment).to.contain(validTreatment)
        })
        .catch(err => console.error(err))
    })

    it('reports a validation error for invalid treatment entries', () => {
      return Treatment.create(invalidTreatment)
        .then(error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.contain('invalid input')
        })
        .catch(err => console.log(chalk.green('you got a validation error')))
    })

  })

  describe('Instance Method: ', () => {

    it('deactivates an instance upon calling that method and adds an inactive date', () => {
      return Treatment.create(validTreatment)
        .then(treatment => treatment.deactivate(treatment))
        .then(inactiveTreatment => {
          expect(inactiveTreatment.status).to.equal('inactive')
          expect(inactiveTreatment.inactive_date).to.be.instanceOf(Date)
        })
        .catch(err => console.error(err))
    })

  })

})
