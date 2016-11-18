process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
  'example',
  'exercise'
]

tests.forEach(test => require(`./${test}.test.js`))
