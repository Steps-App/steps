process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
  'example'
]

tests.forEach(test => require(`./${test}.test.js`))
