'use strict'

import chai from 'chai'
const expect = chai.expect;
import db from '../db'
import Therapist from '../db/models/therapist'

describe('Therapist', function () {

  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log('Sync success')
        done();
      })
      .catch(done)
  });

  after('clear db', () => db.didSync)

  let validTherapist = {
    first_name: 'Joe',
    last_name: 'Therapist',
    email: 'joe@therap.ly',
    password: 'badpassword'
  }

  let invalidTherapist = {
    first_name: 'Joe'
  }

  describe('Therapist Model', function() {

    describe('creates therapists and properly validates', function() {

      it('creates a therapist row with valid input', function() {
        Therapist.create(validTherapist)
          .then(createdRow => {
            expect(createdRow).to.contain({ first_name: 'Joe', last_name: 'Therapist', email: 'joe@therap.ly' })
          })
          .catch(err => console.log(err.message))
      })

      it('throws a validation error with invalid input', function() {
        let invalid = Therapist.build(invalidTherapist)

        return invalid.validate()
          .then(response => {
            expect(response).to.be.an.instanceOf(Error)
            expect(response.message).to.contain('content cannot be empty');
        })
      })
    })

  describe('hooks', function(){

    it('should set email to lowercase and return a password_digest', function() {
      Therapist.create(validTherapist)
        .then(createdRow => {
          expect(createdRow.password_digest).to.not.be(null)
          expect(createdRow.email).to.equal(validTherapist.email.toLowerCase())
        })
    })
  })

  describe('Instance methods', function(){

    it('authenticate should resolve correctly with a valid password', function() {
      Therapist.create(validTherapist)
        .then(createdRow => {
          expect(createdRow.authenticate('badpassword').to.equal(true))
        })
      })
    })
  })
})
