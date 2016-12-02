if (!process.env.TRAVIS_CI)
  require('dotenv').config();
process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
  'exercise',
  'treatment',
  'therapist',
  'patient',
  'plan',
  'workout',
  'navbar',
  'materialstyle'
];

tests.forEach(test => require(`./${test}.test.js`));
