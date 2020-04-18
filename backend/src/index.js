import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dbConnection from './api/utils/dbConnection';
import v1Routes from './api/v1/route';
import v2Routes from './api/v2/routes';

// import environmental variables from our .env file
require('dotenv').config();

//import error handling modules
import {
  notFound,
  developmentErrors,
  productionErrors
} from './src/utils/errorHandlers';

// Connect to our Database and handle an bad connections
try {
  dbConnection();
} catch (error) {
  console.log('An error occured coonecting to the Db');
  throw error;
}


// init Express app
const app = express();

// having fun
app.use((req, res, next) => {
  res.header('X-powered-by', 'Blood, sweat, and tears.');
  next();
});

//route logger
app.use(logger('dev'));

//use helmet security wrapper
app.use(helmet());

// include middleware to enable json body parsing and nested objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handling CORS
app.use(cors());

//set response headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});


//use different routes for different versions
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}

// production error handler
app.use(productionErrors);

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
  console.log(`App running  🏃  on PORT ${server.address().port}`);
});
