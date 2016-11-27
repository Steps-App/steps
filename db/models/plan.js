const Sequelize = require('sequelize');
const moment = require('moment');
const db = require('../db');

const Plan = db.define('plan', {
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
}, {
  underscored: true,
  hooks: {
    beforeCreate: function(plan){
      plan.setEndDate();
    }
  },
  instanceMethods: {
    setEndDate: function() {
      this.end_date =  moment().add(this.duration, 'weeks')
    },
    countdown: function() {
      let today = new Date();
      return this.end_date - today;
    }
  }
});

module.exports = Plan;
