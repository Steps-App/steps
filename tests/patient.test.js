'use strict'

import chai from 'chai'
const expect = chai.expect;
import db from '../db'
import Patient from '../db/models/patient'

describe('Patient', function () {

  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log('Sync success')
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
    first_name: 'Joe'
  }

  describe('Patient Model: ', function() {

    describe('creates patients and properly validates: ', function() {

      it('creates a therapist row with valid input', function() {
        Patient.create(validPatient)
          .then(createdRow => {
            expect(createdRow).to.contain({ first_name: 'Joe', last_name: 'Patient', email: 'joe@gmail.com' })
          })
      })

      it('throws a validation error with invalid input', function() {
        let invalid = Patient.build(invalidPatient)

        return invalid.validate()
          .then(response => {
            expect(response).to.be.an.instanceOf(Error)
            expect(response.message).to.contain('content cannot be empty');
          })
      })
    })

    describe('hooks', function(){

      it('should set email to lowercase and return a password_digest', function() {
        Patient.create(validPatient)
          .then(createdRow => {
            expect(createdRow.password_digest).to.not.be(null)
            expect(createdRow.email).to.equal(validPatient.email.toLowerCase())
          })
      })
    })

    describe('Instance methods', function(){

      it('authenticate should resolve correctly with a valid password', function() {
        Patient.create(validPatient)
          .then(createdRow => {
            expect(createdRow.authenticate('badpassword').to.equal(true))
          })
      })
    })
  })
})
