'use strict'

// Require our models.
const Therapist = require('./therapist');
const Patient = require('./patient');
const Plan = require('./plan');
const Treatment = require('./treatment')
const Exercise = require('./Exercise');
const Workout = require('./Workout');

// -=-=-=-=-=-= ASSOCIATIONS =-=-=-=-=-=-
// http://docs.sequelizejs.com/en/latest/docs/associations/


module.exports = { Therapist, Patient, Plan, Treatment, Exercise, Workout }
