const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const app = express();

//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routes
app.use('/app/v1/tours', tourRouter);
app.use('/app/v1/users', userRouter);

module.exports = app;
