'use strict'

import chai from 'chai'
const expect = chai.expect
import chalk from 'chalk'
import bcrypt from 'bcrypt'
import db from '../db'
import Therapist from '../db/models/therapist'

describe('Therapist', function () {

  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log(chalk.yellow('Sync success'))
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
    first_name: '',
    last_name: '',
    email: 'joe@gmail.com',
    DOB: '10/14/1976',
    gender: 'M',
    password: 'badpassword'
  }

  describe('Therapist Model', function() {

    describe('creates therapists and properly validates', function() {

      it('creates a therapist row with valid input', function() {
        return Therapist.create(validTherapist)
          .then(createdRow => {
            expect(createdRow).to.contain({ first_name: 'Joe', last_name: 'Therapist', email: 'joe@therap.ly' })
          })
          .catch(err => console.log(err.message))
      })

      it('throws a validation error with invalid input', function() {
        let invalid = Therapist.build(invalidTherapist)

        return invalid.validate()
          .then(err => {
            expect(response).to.be.an.instanceOf(Error)
            expect(response.message).to.include('notEmpty failed')
          })
          .catch(err => console.log(err.message))
      })
    })

  describe('hooks', function(){

    it('should set email to lowercase and return a password_digest', function() {
      return Therapist.create(validTherapist)
        .then(createdRow => {
          expect(createdRow.password_digest).to.not.equal(null)
          expect(createdRow.email).to.equal(validTherapist.email.toLowerCase())
        })
        .catch(err => console.log(err.message))
    })
  })

  describe('Instance methods', function(){

    it('authenticate should resolve correctly with a valid password', function() {
      return Therapist.create(validTherapist)
        .then(createdRow => {
          let passAuth = bcrypt.compareSync('badpassword', createdRow.dataValues.password_digest, (err, result) => {
              return result
          })
          expect(passAuth).to.equal(true)
        })
        .catch(err => console.log(err.message))
      })
    })
  })
})
