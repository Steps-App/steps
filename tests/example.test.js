import db from '../db'

// Unit testing libraries
import chai from 'chai'
const expect = chai.expect;

describe('Example', () => {
  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log('Sync success, create prelim objects here')
        done();
      })
      .catch(done)
  });

  after('clear db', () => db.didSync)

  describe('Redux', () => {
    console.log('Redux tests');
    it('dummy test', () => {
      expect(true).to.be.equal(true);
    });
  });

  describe('/example routes', () => {
    console.log('express tests');
  })
})

