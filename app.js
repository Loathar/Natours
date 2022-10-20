const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const { builtinModules } = require('module');

// 1) Middelwares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
// serving static files
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello from the middelware! 👋🏻'), next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Testing api

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello form the sever side!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint...');
// });

// Setting up API and reading data from JSON file

// 3) Route handlers

// GET ALL REQUEST
// app.get('/api/v1/tours', getAllTours);

// // GET SPECIFIC TOUR REQUEST
// app.get('/api/v1/tours/:id', getTour);

// // POST REQUEST

// app.post('/api/v1/tours', createTour);

// // PATCH REQUEST
// app.patch('/api/v1/tours/:id', updateTour);

// // DELETE REQUEST
// app.delete('/api/v1/tours/:id', deleteTour);

module.exports = app;
