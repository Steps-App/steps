process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
  'example',
  'treatment'
  'therapist',
  'patient'
]

tests.forEach(test => require(`./${test}.test.js`))
