const Sequelize = require('sequelize');
const db = require('../db');

const Plan = db.define('plan', {
  duration: {
    type: Sequelize.INTEGER,
    defaultValue : 1
  },
  end_date : {
    type : Sequelize.DATE,
    allowNull: true
  },
  underscored : true
  },
  {
    instanceMethods : {
      endDateCalc: function(plan){
        let millisecondsPerWeek = 604800000;
        let today = new Date();
        let end = new Date( (today.getMilliseconds()+(instance.duration*millisecondsPerWeek)));
        plan.end_date = end;
      }
    },
    hooks : { // aftercreate instance to use "this"
      afterCreate: function(plan){
          plan.endDateCalc();
      }
    }
});

module.exports = Plan;
