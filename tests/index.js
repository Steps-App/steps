process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
//  'exercise',
  'patient',
  'treatment',
  'therapist',
  'workout',
  'navbar'
];

tests.forEach(test => require(`./${test}.test.js`));
