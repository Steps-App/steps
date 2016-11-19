// Require our models.
const Therapist = require('./therapist');
const Patient = require('./patient');
const Plan = require('./plan');
const Treatment = require('./treatment')
const Exercise = require('./exercise');
const Workout = require('./workout');

// -=-=-=-=-=-= ASSOCIATIONS =-=-=-=-=-=-
// http://docs.sequelizejs.com/en/latest/docs/associations/
Therapist.hasMany(Patient) // patient << therapist_id // therapist.getPatients/setPatients
Exercise.belongsTo(Therapist, { foreignKey: 'therapist_id' }) // exercise << therapist_id

Patient.hasMany(Workout) // workout << patient_id // patient.getWorkouts/setWorkouts
Plan.hasMany(Workout) // workout << plan_id // plan.getWorkouts/setWorkouts

Patient.hasMany(Treatment) // treatment << patient_id // patient.getTreatments/setTreatments
Patient.hasMany(Plan) // plan << patient_id // patient.getPlans/setPlans

Treatment.hasOne(Workout, { foreignKey: 'treatment_id' }) // workout << treatment_id
Exercise.hasOne(Treatment, { foreignKey: 'exercise_id' }) // treatment << exercise_id

module.exports = { Therapist, Patient, Plan, Treatment, Exercise, Workout };
