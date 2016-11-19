import chai from 'chai'
const expect = chai.expect
import chalk from 'chalk'

import db from '../db'
import Patient from '../db/models/patient'

import app from '../server/app';
import Promise from 'bluebird';
import supertest from 'supertest';

const agent = supertest.agent(app);

describe('Patient Route', () => {
	// before('wait for the db', (done) => {
	// 	db.didSync
	// 		.then(() => done())
	// 		.catch(done);
	// });
	
	describe('Patients', () => {

		it('GET all patients', function (done) {
			agent
			.get('/api/patient')
			.expect(201)
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
				console.log('Error in Posting', err)

				if (err) return done(err);
				expect(res.body.first_name).to.equal('PatientTestF1');
				expect(res.body.id).to.exist;
				Patient.findById(res.body.id)
					.then(function (b) {
							expect(b).to.not.be.null;
							expect(res.body).to.eql(toPlainObject(b));
							done();
					})
					.catch(done);
			})
			.catch(err => console.log(err))
		});
	})
})
