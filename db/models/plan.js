const Sequelize = require('sequelize')
const db = require('../db')

const ModelName = db.define('plan', {

}, {
  underscored: true
})


module.exports = ModelName;
