'use strict'

const chalk = require('chalk')
const Sequelize = require('sequelize')  // so upper case, so important

// db server constant(s)
const URL = process.env.DATABASE_URL || 'postgres://localhost:5432/therapy'

// notify the user we're about to do it
console.log(chalk.yellow(`Opening database connection to ${URL}`))

// do it
const db = new Sequelize(URL, {
  native: true,        // use pg-native
  define: {
    freezeTableName: true,  // don't go changing our table names, Sequelize
  }
})

// pull in models to database
require('./models')
// sync them (Note: NOT force true)
db.sync().then(ok => console.log(chalk.yellow('Database synced'))).catch()

module.exports = db
