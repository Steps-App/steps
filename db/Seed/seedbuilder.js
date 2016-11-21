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


db.sync()
.then(() => Promise.map(TherapistList, (therapist) => db.model('therapist').create(therapist)))
.then(() => Promise.map(PatientList, (patient) => db.model('patient')
  .create(Object.assign(patient, {therapist_id: Math.floor((Math.random() * TherapistList.length) + 1)}))))
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

 

