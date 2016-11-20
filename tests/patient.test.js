import chai from 'chai'
const expect = chai.expect
import chalk from 'chalk'
import bcrypt from 'bcrypt'

import db from '../db'
import Patient from '../db/models/patient'

import app from '../server/app';
import Promise from 'bluebird';
import supertest from 'supertest';

const agent = supertest.agent(app);

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
            .catch(err => console.log(chalk.green('You got a validation error')))
      })
    })

    describe('hooks', function(){

      it('should set email to lowercase and return a password_digest', function() {
        return Patient.findOne({
            where: {
              email: validPatient.email
            }
          })
          .then(foundPatient => {
            expect(foundPatient.password_digest).to.not.equal(null)
            expect(foundPatient.email).to.equal(validPatient.email.toLowerCase())
          })
          .catch(err => console.log(err))
      })
    })

    describe('Instance methods', function(){

      it('authenticate should resolve correctly with a valid password', function() {
        return Patient.findOne({
            where: {
              email: validPatient.email
            }
          })
          .then(foundPatient => {
            let passAuth = bcrypt.compareSync('badpassword', foundPatient.dataValues.password_digest, (err, result) => {
                return result
            })
            expect(passAuth).to.equal(true)
          })
          .catch(err => console.log(err))
      })
    })
  })

  describe('Patient Route', () => {
    
    describe('Patients', () => {

      it('GET all patients', function () {
        return agent
        .get('/api/patient')
        .expect(200)
      });

      it('POST one Patient', function (done) {
        agent
        .post('/api/patient')
        .send({
          'first_name': 'PatientTestF1',
          'last_name': 'PatientTestL1',
          'email': 'patient1@test.com',
          'DOB': '11/18/15',
          'gender': 'F'
        })
        .expect(201)
        .end(function (err, res) {
          console.log('sdfsdfsdfsd')
          console.log('Error in Posting', err)

          if (err) return done(err);
          expect(res.body.first_name).to.equal('PatientTestF1');
          expect(res.body.id).to.exist;
          Patient.findById(res.body.id)
            .then(function (b) {
              expect(b).to.not.be.null;
              expect(res.body).to.eql(toPlainObject(b));
              done()
            })
            .catch(done);
        })
        .catch(err => console.log(err))
      });
    })
  })
})
