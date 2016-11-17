const chalk = require('chalk');
const Sequelize = require('sequelize');

// db server constant(s)
const URL = process.env.DATABASE_URL || 'postgres://localhost:5432/therapy'

// notify the user we're about to do it
console.log(chalk.yellow(`Opening database connection to ${URL}`))

// do it
const db = new Sequelize(URL, {
  native: true,             // use pg-native
  define: {
    freezeTableName: true,  // don't go changing our table names, Sequelize
  }
})

module.exports = db
