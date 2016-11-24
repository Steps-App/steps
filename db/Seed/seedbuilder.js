
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

const Promise = require('bluebird');
const chalk = require('chalk');

// db + models
const db = require('../../db/');
const Therapist  = db.model('therapist');
const Patient  = db.model('patient');
const Exercise = db.model('exercise');
const Plan = db.model('plan')
const Treatment = db.model('treatment')
const Workout = db.model('workout')

// seeds
const TherapistList = require('./therapistSeed');
const PatientList = require('./patientSeed');
const ExerciseList = require('./exerciseSeed');
const PlanList = require('./planSeed')
const TreatmentList = require('./treatmentSeed')
const WorkoutList = require('./workoutSeed')

// Returns array of random instances and removes them from original array
const randomInstances = (count, list) => {
  const instances = [];
  for(let i = 0; i < count; i++) {
    if (!list.length) break;
    const useInd = Math.floor(Math.random() * list.length);
    instances.push(list[useInd]);
    list.splice(useInd, 1);
  }
  return instances;
}

let createdTherapists;
db.didSync
  .then(() => db.sync({ force: true }))
  // Create therapists and patients
  .then(() => {
    return Promise.all([
      Promise.map(TherapistList, therapist => Therapist.create(therapist)),
      Promise.map(PatientList, patient => Patient.create(patient)),
      Promise.map(ExerciseList, exercise => Exercise.create(exercise)),
      Promise.map(PlanList, plan => Plan.create(plan)),
      Promise.map(TreatmentList, treatment => Treatment.create(treatment))
    ])
  })
  // Assign patients and random exercises to the therapists
  // Assign plans to patients
  .spread((therapists, patients, exercises, plans) => {
    const updatedTherapists = [];
    patients.forEach((patient, i) => {
      patient.setPlans(randomInstances(2, plans));
    })
    therapists.forEach((therapist, i) => {
      therapist.setPatients(randomInstances(20, patients));
      updatedTherapists.push(therapist.setExercises(randomInstances(20, exercises)));
    })
    return Promise.all(updatedTherapists)
  })
  .then(() => {
    return Promise.all([
      Treatment.findAll(),
      Plan.findAll({
        include: [{
          model: Patient,
          include:[{ model: Therapist, include:[Exercise] }]
        }]
      })
    ])
  })
  .spread((treatments, plans) => {
    const updatedPlans = [];
    for (let i=0; i < plans.length; i++) {
      const planExercises = plans[i].patient.therapist.exercises;
      const randomTreatments = randomInstances(5, treatments);
      for (let j=0; j < randomTreatments.length; j++) {
        randomTreatments[j].setExercise(...randomInstances(1, planExercises));
        randomTreatments[j].update({patient_id: plans[i].patient_id });

      }
      updatedPlans.push(plans[i].setTreatments(randomTreatments));
    }
    return Promise.all(updatedPlans);
  })
  // .then(() => Workout.bulkCreate(WorkoutList))
  .then(() => console.log(chalk.green("Finished Seeding Database")))
  .catch(err => console.error(chalk.red('Issue with Seeding', err, err.stack)))
  .finally(function () {
    db.close();
    console.log(chalk.yellow('Connection closed'));
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
