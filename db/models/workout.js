const Sequelize = require('sequelize')
const db = require('../db')

const Workout = db.define('workout', {
  time_per_exercise: {
    type: Sequelize.INTEGER, // seconds, with computation on front end
    validate: {
      notEmpty: true
    }
  },
  pain: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      max: 5,
      min: 1
    }
  },
  comments: Sequelize.TEXT
}, {
  underscored: true
})

module.exports = Workout;
