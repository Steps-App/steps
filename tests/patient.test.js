
import chai from 'chai'
const expect = chai.expect
import chalk from 'chalk'
import bcrypt from 'bcrypt'

import db from '../db'
import Patient from '../db/models/patient'

describe('Patient', function () {

  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log(chalk.yellow('Sync success'))
        done();
      })
      .catch(done)
  });

  after('clear db', () => db.didSync)

  let validPatient = {
    first_name: 'Joe',
    last_name: 'Patient',
    email: 'joe@gmail.com',
    DOB: '10/14/1976',
    gender: 'M',
    password: 'badpassword'
  }

  let invalidPatient = {
    first_name: '',
    last_name: '',
    email: 'joe@gmail.com',
    DOB: '10/14/1976',
    gender: 'M',
    password: 'badpassword'
  }

  describe('Patient Model: ', function() {

    describe('creates patients and properly validates: ', function() {

      it('creates a therapist row with valid input', function() {
        return Patient.create(validPatient)
          .then(createdRow => {
            expect(createdRow).to.contain({ first_name: 'Joe', last_name: 'Patient', email: 'joe@gmail.com' })
          })
          .catch(err => console.log(err))
      })

      it('throws a validation error with invalid input', function() {
        let invalid = Patient.build(invalidPatient)

        return invalid.validate()
            .then(response => {
              expect(response).to.be.an.instanceOf(Error)
              expect(response.message).to.include('notEmpty failed')
            })
            .catch(err => console.log(err))
      })
    })

    describe('hooks', function(){

      it('should set email to lowercase and return a password_digest', function() {
        return Patient.create(validPatient)
          .then(createdRow => {
            expect(createdRow.password_digest).to.not.equal(null)
            expect(createdRow.email).to.equal(validPatient.email.toLowerCase())
          })
          .catch(err => console.log(err))
      })
    })

    describe('Instance methods', function(){

      it('authenticate should resolve correctly with a valid password', function() {
        return Patient.create(validPatient)
          .then(createdRow => {
            let passAuth = bcrypt.compareSync('badpassword', createdRow.dataValues.password_digest, (err, result) => {
                return result
            })
            expect(passAuth).to.equal(true)
          })
          .catch(err => console.log(err))
      })
    })
  })
})
