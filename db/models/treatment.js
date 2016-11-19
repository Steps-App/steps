const Sequelize = require('sequelize')
const db = require('../db')

const Treatment = db.define('treatment', {
  time_per_exercise: Sequelize.INTEGER,
  reps: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  sets: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  resistance: {
    type: Sequelize.ENUM,
    values: ['weighted', 'none']
  },
  notes: Sequelize.TEXT,
  status: {
    type: Sequelize.ENUM,
    values: ['active', 'inactive'],
    defaultValue: 'active'
  },
  inactive_date: Sequelize.DATEONLY
}, {
  underscored: true,
  instanceMethods: {
    deactivate: function(treatment) {
      let inactiveDate = new Date()
      treatment.status = 'inactive'
      treatment.inactive_date = inactiveDate
      return treatment
    }
  }
})


module.exports = Treatment;
