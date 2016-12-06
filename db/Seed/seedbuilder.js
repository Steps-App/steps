
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

// All tables and corresponding seed JSON files
const therapistSeed = require('./therapistSeed')
const patientSeed = require('./patientSeed')
const exerciseSeed = require('./exerciseSeed')
const planSeed = require('./planSeed')
const treatmentSeed = require('./treatmentSeed')
const workoutSeed = require('./workoutSeed')
// seed functions(promises) for each table
const seedTherapists = () => db.Promise.map(therapistSeed, seed => Therapist.create(seed))
const seedPatients = () => db.Promise.map(patientSeed, seed => Patient.create(seed))
const seedPlans = () => db.Promise.map(planSeed, seed => Plan.create(seed))
const seedExercises = () => db.Promise.map(exerciseSeed, seed => Exercise.create(seed))
const seedTreatments = () => db.Promise.map(treatmentSeed, seed => Treatment.create(seed))
const seedWorkouts = () => db.Promise.map(workoutSeed, seed => Workout.create(seed))

// sequential seeding based on dependencies and associations to avoid
// foreign key validation errors
db.didSync
  .then(() => db.sync({force: true}))
  .then(seedTherapists)
  .then(() => console.log(chalk.green('* therapists ok')))
  .then(seedPatients)
  .then(() => console.log(chalk.green('* patients ok')))
  .then(seedPlans)
  .then(() => console.log(chalk.green('* plans ok')))
  .then(seedExercises)
  .then(() => console.log(chalk.green('* exercises ok')))
  .then(seedTreatments)
  .then(() => console.log(chalk.green('* treatments ok')))
  .then(seedWorkouts)
  .then(() => console.log(chalk.green('* workouts ok')))
  .then(() => console.log(chalk.green("Finished Seeding Database")))
  .catch(err => console.error(chalk.red('Issue with Seeding', err, err.stack)))
  .finally(function () {
    db.close();
    console.log(chalk.yellow('Connection closed'));
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
