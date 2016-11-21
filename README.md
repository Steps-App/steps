# Steps 

_Physical therapy for the way you live today_

## Running Locally

### Prerequisites
- Node (>6.7) and npm
- PostgreSQL

### Installing dependencies

```sh
npm install
```

This will install all runtime dependencies, as well as Webpack build and Mocha/Chai testing tools.

### Environment variables

We are using the `dotenv` package and `.env` file to emulate environment variables in development mode. Your `.env` file should have the following:

```
SESSION_SECRET=YOUR_SECRET
```

### Running the app

There are two ways to run the app in development mode:

#### Dev Server

```sh
npm run build-watch
npm run dev
```

The first command will run Webpack in watch mode, rebuilding the client static files in '/public' every time a change is made to the source files. The second command will run the Node.js server in development mode. This setup simulates a production environment without the performance enhacements.

#### Webpack HMR Server

```sh
npm run hmr
```

The command starts a little Node.js server that serves only the webpack bundle. This setup gives us two main advantages:

- Changes to React components cause automatic page refreshes
- Updates to static files like CSS are injected into the running app without requiring a full refresh

## Running in Prod

Running the application in Prod is similar to running it locally:

```sh
npm install
npm run build
npm start
```

However, several considerations need to be made:

1. `DATABASE_URL` environment variable must point to your PostgreSQL DB
1. `NODE_ENV` environment variable must equal `production`
1. `PORT` environment variable must be set to the listening port of the Node app
1. The build should be run at some point before the app is uploaded to the production server, otherwise the build files must be uploaded as well.

## Testing

To run the test suite, execute the command `npm test`

The easiest way to test is with [Postman](https://www.getpostman.com/). You can use our development testing
collection to help you get started!

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b679dd0210a9500f7fef)