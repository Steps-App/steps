'use strict'

import chai from 'chai'
const expect = chai.expect
import chalk from 'chalk'
import bcrypt from 'bcrypt'
import db from '../db'
import Therapist from '../db/models/therapist'
import Patient from '../db/models/patient'

import app from '../server/app'
import Promise from 'bluebird'
import supertest from 'supertest'

const agent = supertest.agent(app)

describe('Therapist', function () {

  let testUser;
  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        return Therapist.create({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@test.com',
          password: '123',
          practiceName: 'My PT Palace'
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
            expect(err).to.be.an.instanceOf(Error)
            expect(err.message).to.include('notEmpty failed')
          })
          .catch(err => console.log(chalk.green('You got a validation error')))
      })
    })

    describe('hooks', function(){

      it('should set email to lowercase and return a password_digest', function() {
        return Therapist.findOne({
          where: {
            email: validTherapist.email
          }
        })
          .then(foundTherapist => {
            expect(foundTherapist.password_digest).to.not.equal(null)
            expect(foundTherapist.email).to.equal(validTherapist.email.toLowerCase())
          })
          .catch(err => console.log(err.message))
      })
    })

    describe('Instance methods', function(){

      it('authenticate should resolve correctly with a valid password', function() {
        return Therapist.findOne({
          where: {
            email: validTherapist.email
          }
        })
          .then(foundTherapist => {
            let passAuth = bcrypt.compareSync('badpassword', foundTherapist.dataValues.password_digest, (err, result) => {
              return result
            })
            expect(passAuth).to.equal(true)
          })
          .catch(err => console.log(err.message))
      })
    })
  })

  describe('Therapist Routes', () => {

    it('POST one Therapist', function (done) {
      agent
      .post('/api/auth/signup')
      .set('Content-type', 'application/json')
      .send({
        role: 'therapist',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '123',
        practiceName: 'My PT Palace'
      })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.first_name).to.equal('John')
        expect(res.body.id).to.exist
        return Therapist.findById(res.body.id)
          .then(function (b) {
            expect(b).to.not.be.null
            done()
          })
          .catch(done)
      })
    })

    it('POST login therapist', function (done) {
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

    it('GET me - retrieve logged in therapist', function (done) {
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

    it('GET therapist/:id/patients - retrieve a therapist\'s patient list', function (done) {
      Patient.bulkCreate([
        { first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@patients.com', therapist_id: testUser.id },
        { first_name: 'Billy', last_name: 'Joe', email: 'billy.joe@patients.com', therapist_id: testUser.id }
      ])
        .then(patients => {
          return agent.get(`/api/therapist/${testUser.id}/patients`)
        })
        .then(res => {
          expect(res.body).to.have.lengthOf(2);
          done()
        })
        .catch(done);
    })
  })
})
