import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import * as dotenv from 'dotenv';
import * as express from 'express';

import setRoutes from './routes';

const app = express();

dotenv.config({ path: '.env.' + process.env.NODE_ENV });

app.set('port', (3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET_TOKEN_SESSION,
  resave: true,
  cookie: {
    secure: false,
    maxAge: 2160000000,
    httpOnly: false
  },
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Access-Token, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST,OPTIONS, PUT, DELETE");
  next();
});


setRoutes(app);

app.listen(app.get('port'), () => {
  console.log('Backend API listening on port ' + app.get('port') + ', DB : ' + process.env.PGDB + ' on ' + process.env.PGHOST);
});

export { app };