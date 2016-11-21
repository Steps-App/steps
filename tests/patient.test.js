import chai from 'chai'
const expect = chai.expect
import chalk from 'chalk'
import bcrypt from 'bcrypt'

import db from '../db'
import Patient from '../db/models/patient'

import app from '../server/app'
import Promise from 'bluebird'
import supertest from 'supertest'

const agent = supertest.agent(app)

describe('Patient', function () {

  let testUser;
  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        return Patient.create({
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@test.com',
          DOB: '11/18/15',
          gender: 'F'
        })
      })
      .then(user => {
        testUser = user;
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
    gender: 'M'
  }

  let invalidPatient = {
    first_name: '',
    last_name: '',
    email: 'joe@gmail.com',
    DOB: '10/14/1976',
    gender: 'M'
  }

  describe('Patient Model: ', function() {

    describe('creates patients and properly validates: ', function() {

      it('creates a patient with valid input', function() {
        return Patient.create(validPatient)
          .then(createdPatient => {
            expect(createdPatient).to.contain({ first_name: 'Joe', last_name: 'Patient', email: 'joe@gmail.com' })
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

      it('should set email to lowercase and return a password_digest from a randomly-generated password', function() {
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
            return Promise.all([foundPatient, foundPatient.update({
              password: 'badpassword'
            })])
          })
          .spread((foundPatient, updatedPatient) => {
            let passAuth = bcrypt.compareSync('badpassword', updatedPatient.dataValues.password_digest, (err, result) => {
              return result
            })
            expect(passAuth).to.equal(true)
          })
          .catch(err => console.log(err))
      })
    })
  })

  describe('Patient Routes', () => {

    it('GET all patients', function () {
      return agent
      .get('/api/patient')
      .expect(200)
    })

    it('POST one Patient', function (done) {
      agent
      .post('/api/auth/signup')
      .set('Content-type', 'application/json')
      .send({
        role: 'patient',
        firstName: 'PatientTestF1',
        lastName: 'PatientTestL1',
        email: 'patient1@test.com',
        DOB: '11/18/15',
        gender: 'F'
      })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.first_name).to.equal('PatientTestF1')
        expect(res.body.id).to.exist
        return Patient.findById(res.body.id)
          .then(function (b) {
            expect(b).to.not.be.null
            done()
          })
          .catch(done)
      })
    })

    it('POST login patient', function (done) {
      agent
        .post('/api/auth/login')
        .set('Content-type', 'application/json')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.first_name).to.equal(testUser.first_name);
          expect(res.body.last_name).to.equal(testUser.last_name);
          done();
        });
    });

    it('POST login fail - non-existent user', function () {
      return agent
        .post('/api/auth/login')
        .set('Content-type', 'application/json')
        .send({
          email: 'bad.user@example.com',
          password: testUser.password,
        })
        .expect(401);
    })

    it('POST login fail - invalid password', function () {
      return agent
        .post('/api/auth/login')
        .set('Content-type', 'application/json')
        .send({
          email: testUser.email,
          password: 'this_aint_right',
        })
        .expect(401);
    })

    it('DELETE logout', function () {
      return agent
        .del('/api/auth/logout')
        .expect(204);
    })

    it('GET me - retrieve logged in patient', function (done) {
      agent
        .post('/api/auth/login')
        .set('Content-type', 'application/json')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .then(() => {
          return agent.get('/api/auth/me')
        })
        .then(res => {
          expect(res.body.first_name).to.equal(testUser.first_name);
          expect(res.body.last_name).to.equal(testUser.last_name);
          done()
        })
        .catch(done);
    })
  })
})
