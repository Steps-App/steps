process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
  'example',
  'exercise',
  'therapist',
  'patient'
];

tests.forEach(test => require(`./${test}.test.js`));
