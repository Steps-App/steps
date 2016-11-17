const chalk = require('chalk');
const Sequelize = require('sequelize');

// db server constant(s)
const dbName = 'therapy' +
  (process.env.NODE_ENV === 'testing' ? '_test' : '');
const url = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

// notify the user we're about to do it
console.log(chalk.yellow(`Opening database connection to ${url}`))

// init the db
const db = new Sequelize(url, {
  native: true,             // use pg-native
  define: {
    freezeTableName: true   // don't go changing our table names, Sequelize
  }
})

module.exports = db
