'use strict'

const chalk = require('chalk')
const db = require('./db')

// pull in models to database
require('./models')

// sync them (Note: NOT force true)
db.sync().then(ok => console.log(chalk.yellow('Database synced'))).catch()

module.exports = db
