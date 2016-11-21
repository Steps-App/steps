const Sequelize = require('sequelize');
const db = require('../db');

const Plan = db.define('plan', {
  duration: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  end_date : {
    type : Sequelize.DATE,
    allowNull: true
  },
  therapy_focus: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  notes: Sequelize.TEXT
},{
    underscored: true,
    hooks: {
      beforeCreate: function(plan){
        plan.end_date = plan.endDateCalc(plan);
      }
    },
    instanceMethods: {
      endDateCalc: function(instance) {
        let millisecondsPerWeek = 604800000;
        let today = new Date();
        return new Date( (today.getMilliseconds() + (instance.duration * millisecondsPerWeek)) );
      },
      countdown: function(plan) {
        let today = new Date();
         return plan.end_date - today;
      }
    }
  }
);


module.exports = Plan;
