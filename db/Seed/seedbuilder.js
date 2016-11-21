const db = require('../../db/')
const therapistModel  = db.model('therapist')
const patientModel  = db.model('patient')
const Promise = require('bluebird')
const TherapistList = require('./therapistSeed')
const PatientList = require('./patientSeed')


const data = {
  patient: PatientList,
  therapist: TherapistList
};


db.sync({force: true})
.then(function () {
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})
.then(function () {
  console.log("Finished Seeding Database");
})
.catch(function (err) {
  console.error('Issue with Seeding', err, err.stack);
})
.finally(function () {
  db.close() 
  console.log('Connection Closed'); 
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});

