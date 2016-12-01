
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

const Promise = require('bluebird');
const chalk = require('chalk');
const moment = require('moment');

// db + models
const db = require('../../db/');
const Therapist  = db.model('therapist');
const Patient  = db.model('patient');
const Exercise = db.model('exercise');
const Plan = db.model('plan')
const Treatment = db.model('treatment')
const Workout = db.model('workout')

// All tbales and corresponding seed JSON files
const tables = {
  therapist: require('./therapistSeed'),
  patient: require('./patientSeed'),
  exercise: require('./exerciseSeed'),
  plan: require('./planSeed'),
  treatment: require('./treatmentSeed'),
  workout: require('./workoutSeed')
}

// Returns a random number from 0-num
const randomNum = num => Math.floor(Math.random() * num);

// Returns array of random instances and removes them from original array
const randomInstances = (count, list) => {
  const instances = [];
  for(let i = 0; i < count; i++) {
    if (!list.length) break;
    const useInd = randomNum(list.length);
    instances.push(list[useInd]);
    list.splice(useInd, 1);
  }
  return instances;
}

// Returns a workout time <= the input time
const workoutTime = time => time - (30 * randomNum((time / 30)-1));

let createdTherapists;
db.didSync
  .then(() => db.sync({ force: true }))
  // Create initial seed data (no addociations yet)
  .then(() => {
    return Promise.all(Object.keys(tables).map(table =>
      db.Promise.map(tables[table], result => db.model(table).create(result))));
  })
  .spread((therapists, patients, exercises, plans) => {
    const updatedTherapists = [];
    // Assign plans to patients
    patients.forEach((patient, i) => {
      patient.setPlans(randomInstances(2, plans));
    })
    // Assign patients and random exercises to the therapists
    therapists.forEach((therapist, i) => {
      therapist.setPatients(randomInstances(20, patients));
      updatedTherapists.push(therapist.setExercises(randomInstances(20, exercises)));
    })
    return Promise.all(updatedTherapists)
  })
  .then(() => {
    return Promise.all([
      Workout.findAll(),
      Treatment.findAll(),
      Plan.findAll({
        include: [{
          model: Patient,
          include:[{ model: Therapist, include:[Exercise] }]
        }]
      })
    ])
  })
  .spread((workouts, treatments, plans) => {
    const updatedPlans = [];
    for (let i=0; i < plans.length; i++) {
      const randomTreatments = randomInstances(5, treatments);
      const days = Array(5).fill(0).map((val, i) => i);
      for (let j=0; j < randomTreatments.length; j++) {
        // Update workout in reflection of corresponding treatment
        const workout = randomInstances(1, workouts)[0];
        workout.update({
          plan_id: plans[i].id,
          patient_id: plans[i].patient_id,
          created_at: moment().subtract(...randomInstances(1, days), 'days'),
          time_per_exercise: workoutTime(randomTreatments[j].time_per_exercise)
        })
        randomTreatments[j].setWorkouts(workout);
        // Give each treatment a logical ancestor exercise and patient
        randomTreatments[j].setExercise(...randomInstances(1, plans[i].patient.therapist.exercises));
        randomTreatments[j].update({ patient_id: plans[i].patient_id });

      }
      // Assign treatments to plans
      updatedPlans.push(plans[i].setTreatments(randomTreatments));
    }
    return Promise.all(updatedPlans);
  })
  .then(() => console.log(chalk.green("Finished Seeding Database")))
  .catch(err => console.error(chalk.red('Issue with Seeding', err, err.stack)))
  .finally(function () {
    db.close();
    console.log(chalk.yellow('Connection closed'));
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
