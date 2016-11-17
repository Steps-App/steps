# Therapy 

_Physical therapy for the way you live today_

## Running Locally

### Prerequisites
- Node (>6.7) and npm
- PostgreSQL

### Run It

```sh
npm install
npm run build-watch
npm run dev
```

The above script will go through the following steps:

1. Install npm dependencies
1. Perform a build with Webpack and watch for changes
1. Run the server and watch for file changes with nodemon

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