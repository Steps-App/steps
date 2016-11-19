import Plan from '../db/models/plan';
import db from '../db';

//Unit testing libraries
import chai from 'chai';
import {expect} from 'chai';
import Bluebird from 'bluebird';
chai.should();
chai.use(require('chai-as-promised'));
import chalk from 'chalk';

describe('Plan', () => {
  before('wait for the db', function(done) {
    db.didSync
      .then(() => {
        console.log(chalk.yellow('sync Sucess'));
        done();
      })
      .catch(done);
  });


  after('clear db', () => db.didSync);

/* ===========Testing Inputs================ */

const valid = { duration : 3 };
const nullInput = { duration : null};

/* ===========Plan Model Tests================ */

describe('Plan ', function(){

  // beforeEach(function(){
  //   return Bluebird.all([
  //     Plan.create(valid),
  //     Plan.create(nullInput)
  //   ])
  //   .spread((plan1,plan2) => {
  //     console.log(plan1,plan2);
  //   })
  //   .catch(err => console.log(err));
  // });


  describe('Defaults', function(){
    it("Defaults to 1 week when duration is null", function(){
      let plan = Plan.build();
      expect(plan.duration).to.be.equal(1);
      });
    });

  });

  describe('InstanceMethods', function(){

    // describe("endDateCalc", function(){
    //   it("should return a Date object", function(){
    //     let plan1 = Plan.build(valid);
    //
    //     plan1
    //     .then(plan =>{
    //
    //     })
    //     let date = plan1.endDateCalc();
    //     expect(date).to.be.equal('Date');
    //   });
    // });
  });
});
