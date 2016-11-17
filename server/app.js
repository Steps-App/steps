// dependency requires
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk')
const express = require('express')
const path = require('path')
const passport = require('passport')
const app = express()  // invoke router as 'app'
const PATHS = {
  indexHTML: path.join(__dirname, '../public/index.html'),
  public: path.join(__dirname, '../public'),
  bootstrap: path.resolve(__dirname, '..', 'node_modules/bootstrap/dist/css')
}

// routes
const routes = require('./routes')

// server constant(s)
const PORT = process.env.PORT || 8080;

// init router ('app')
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(morgan('dev'))                   // logging in 'dev' mode
  .use(express.static(PATHS.public))    // static file server
  .use(express.static(PATHS.bootstrap))
  .use(passport.initialize())           // passport auth middleware
  .use(passport.session())
  .use('/api', routes)                  // database-served api routes

// default routing
app.get('/*', (req, res) => res.sendFile(PATHS.indexHTML));

// Error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'testing') {
    console.error(chalk.red(err));
    console.error(chalk.red(err.stack))
  }
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// racers, start your engines! (only if not testing w/ Supertest)
if (!module.parent) {
  app.listen(PORT, err => {
    if (err) throw err
    console.log(chalk.green(`Server listening on port: ${PORT}`))
  })
}

// export it, of course
module.exports = app
