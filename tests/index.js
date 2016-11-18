process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
  'example',
  'therapist',
  'patient'
]

tests.forEach(test => require(`./${test}.test.js`))
