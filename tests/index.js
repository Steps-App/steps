process.env.NODE_ENV = 'testing';

// Run all tests
const tests = [
 'example',
 //'exercise',
 'patient',
 'treatment',
 'therapist',
 'workout'
];

tests.forEach(test => require(`./${test}.test.js`));
