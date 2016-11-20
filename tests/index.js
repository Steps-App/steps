process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
  'exercise',
  'treatment',
  'therapist',
  'patient',
  'plan',
  'workout',
  'navbar'
];

tests.forEach(test => require(`./${test}.test.js`));
