import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from'cookie-parser';
import session from'express-session';
import logger from'morgan';
import passport from'./Strategies/local-strategy.js';
import mongoose from'mongoose';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost/Eshop").then(() => console.log("Connected to database")).catch((err) => console.log(`Error: ${err}`));

//middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //TODO check if this is correct
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express-session middleware
app.use(session({
  secret: 'Dev session',
  resave: false,
  saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.redirect('/index');  // Redirect to /index route
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
